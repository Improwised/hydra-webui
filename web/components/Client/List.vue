<template>
  <div class="mt-4">
    <!-- Add loading state -->
    <b-overlay :show="isLoading" rounded="sm">
      <!-- list table -->
      <b-table
        :items="clientList"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        head-variant="light"
        table-variant="light"
        no-border-collapse="true"
        bordered="true"
        responsive="true"
      >
        <template #cell(client_id)="row">
          <b-link @click="showDetails(row.index, row.item)">{{
            row.value
          }}</b-link>
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

      <div class="p-3">
        <div class="row">
          <div class="col-4 d-flex align-items-center justify-content-start">
            <div data-test="total-count">
              <strong>Total Count:</strong>
              {{ totalRows }}
            </div>
          </div>
          <div class="col-4 d-flex align-items-center justify-content-center">
            <b-pagination
              v-if="totalRows > 0"
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              pills
              align="center"
              @change="onPageChange"
            ></b-pagination>
          </div>
          <div class="col-4 d-flex align-items-center justify-content-end">
            <b-form-select
              v-model="perPage"
              :options="[5, 10, 15]"
              style="width: 70px"
              class="form-control"
            ></b-form-select>
          </div>
        </div>
      </div>

      <!--  -->

      <AddUpdate id="edit-modal" type="Edit" :form-data="clientData" />

      <!--  -->

      <ClientDetail :client-data="clientData" />

      <!--  -->
    </b-overlay>
  </div>
</template>
<script>
import ClientDetail from "@/components/Client/Details.vue";
import AddUpdate from "@/components/Client/AddUpdate.vue";
import deleteClient from "@/mixins/deleteClient.js";
import moment from "moment";

export default {
  components: {
    AddUpdate,
    ClientDetail,
  },
  mixins: [deleteClient],
  data() {
    return {
      isLoading: true,
      currentPage: 1,
      perPage: 10,
      fields: [
        {
          key: "client_id",
          sortable: true,
        },
        {
          key: "client_name",
          sortable: true,
        },
        // {
        //   key: "grant_types",
        //   formatter: (value) => {
        //     return value.length ? value.join() : "-";
        //   },
        // },
        {
          key: "token_endpoint_auth_method",
        },
        {
          key: "created_at",
          sortable: true,
          formatter: (value) => {
            return moment(value).local().format("DD/MM/YYYY, h:mm:ss A");
          },
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
  async created() {
    try {
      await this.$store.dispatch("getClientList");
    } catch (error) {
      console.error("Failed to fetch client list:", error);
      this.$toasted.error("Failed to load clients", {
        theme: "bubble",
        position: "top-right",
        duration: 4000,
      });
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
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
