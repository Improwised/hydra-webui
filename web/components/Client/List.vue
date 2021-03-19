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
          <b-link @click="showDetails(row.index, row.item)">{{
            row.value
          }}</b-link>
        </template>

        <template #cell(Consent_session)="row">
          <div align="center">
            <b-link @click="consentSession(row.item)">View</b-link>
          </div>
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
    <ClientDetail :client-data="clientData" />
  </div>
</template>
<script>
import ClientDetail from "@/components/Client/Details.vue";
import Add from "@/components/Client/AddUpdate.vue";
import deleteClient from "@/mixins/deleteClient.js";
import moment from "moment";

export default {
  components: {
    Add,
    ClientDetail,
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
          formatter: (value) => {
            return value.length ? value.join() : "-";
          },
        },
        {
          key: "created_at",
          sortable: true,
          formatter: (value) => {
            return moment(value).local().format("DD/MM/YYYY, h:mm:ss A");
          },
        },
        {
          key: "Consent_session",
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
    consentSession(data) {
      // const id = data.client_id;
      // const data1 = {
      //   grant_access_token_audience: ["abc"],
      //   grant_scope: ["refresh_token"],
      //   handled_at: "2021-03-17T17:13:19Z",
      //   remember: true,
      //   remember_for: 0,
      //   session: {
      //     access_token: { abc: "anc" },
      //     id_token: { asdflasdf: "abc" },
      //   },
      // };
      // this.$store.dispatch("acceptConsentSession", { id, data1 });
      // this.$store.dispatch("consentSession", data);
      this.$store.dispatch("getConsentRequest", data);
    },
    showDetails(index, data) {
      this.clientData = data;
      this.$root.$emit("bv::show::modal", "client-details", index);
    },
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
