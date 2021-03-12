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
        <template #cell(Action)="row">
          <b-button
            size="sm"
            variant="danger"
            class="mr-3"
            @click="delBtn(row.item, row.index, $event.target)"
            >Delete</b-button
          >
        </template>
      </b-table>
      <!-- delete modal -->
      <b-modal
        :id="deleteModal.id"
        :title="deleteModal.title"
        centered
        ok-only
        @ok="delClient"
      >
        <pre>Are you sure you want to delete this client? </pre>
      </b-modal>
      <!--  -->
    </b-container>
    <!--  -->
    <div class="text-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        size="sm"
        align="center"
        @change="onPageChange"
      ></b-pagination>
    </div>
    <!--  -->
  </div>
</template>
<script>
import deleteClient from '~/mixins/deleteClient.js'
export default {
  mixins: [deleteClient],
  data() {
    return {
      totalRows: this.totalRows,
      currentPage: 1,
      perPage: 10,
      deleteModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        {
          key: 'client_id',
          sortable: true,
        },
        {
          key: 'client_name',
          sortable: true,
        },
        {
          key: 'grant_types',
        },
        {
          key: 'created_at',
          sortable: true,
        },
        {
          key: 'Action',
        },
      ],
      bordered: true,
      responsive: true,
      filter: null,
    }
  },
  computed: {
    clientList() {
      return this.$store.getters.clients
    },
  },
  mounted() {
    this.totalRows = this.clientList.length
    this.$router.push({ query: '' })
  },
  methods: {
    delClient() {
      this.deleteClient(this.deleteModal.content.client_id)
    },
    delBtn(item, index, button) {
      this.deleteModal.title = `Delete: ${item.client_name}`
      this.deleteModal.content = item
      this.$root.$emit('bv::show::modal', this.deleteModal.id, button)
    },
    onPageChange(value) {
      this.$router.push({ query: { page: value } })
    },
  },
}
</script>
