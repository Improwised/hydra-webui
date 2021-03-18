<template>
  <div>
    <!-- list table -->
    <b-container class="mt-3" fluid>
      <b-table
        :items="clientList"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :bordered="bordered"
        :responsive="responsive"
        :filter="filter"
      >
        <template #cell(client_id)="row">
          <nuxt-link
            :to="{
              name: 'id',
              params: { id: row.value },
            }"
            >{{ row.value }}</nuxt-link
          >
        </template>
        <template #cell(Action)="row">
          <b-button
            :id="row.index"
            size="sm"
            class="w-25"
            variant="info"
            @click="edit(row.index, row.item)"
            >Edit</b-button
          >
          <b-button
            size="sm"
            class="ml-2"
            variant="danger"
            @click="onDeleteClient(row.item)"
            >Delete</b-button
          >
        </template>
      </b-table>
      <!--  -->
    </b-container>
    <!--  -->
    <div class="text-center">
      <b-pagination
        v-if="totalRows > 0"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        pills
        align="center"
        @change="onPageChange"
      ></b-pagination>
      <span v-else>---</span>
    </div>
    <!--  -->
    <Add id="edit-modal" type="Edit" :form-data="clientData" />
  </div>
</template>
<script>
import Add from "~/components/Client/ClientAddUpdate.vue";
import deleteClient from "~/mixins/deleteClient.js";

export default {
  components: {
    Add,
  },
  mixins: [deleteClient],
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      deleteModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      fields: [
        {
          key: "client_id",
          sortable: true,
        },
        {
          key: "client_name",
          sortable: true,
        },
        {
          key: "grant_types",
        },
        {
          key: "created_at",
          sortable: true,
        },
        {
          key: "Action",
        },
      ],
      bordered: true,
      responsive: true,
      filter: null,
      clientData: {},
    };
  },
  computed: {
    clientList() {
      return this.$store.getters.clientsList;
    },
    totalRows() {
      return this.clientList.length;
    },
  },
  mounted() {
    this.$router.push({ query: "" });
  },
  methods: {
    edit(index, data) {
      this.clientData = data;
      this.$root.$emit("bv::show::modal", "edit-modal", index);
    },
    onDeleteClient(item) {
      const clientId = item.client_id;
      const h = this.$createElement;
      this.$bvModal
        .msgBoxConfirm(
          h("div", [
            h("p", [
              " Are you sure you want to delete client with name ",
              h("strong", item.client_name),
              " ? ",
            ]),
          ]),
          {
            title: "Are you sure?",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Delete",
            cancelTitle: "Cancel",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            this.deleteClient(clientId);
          }
        });
    },
    onPageChange(value) {
      this.$router.push({ query: { page: value } });
    },
  },
};
</script>
