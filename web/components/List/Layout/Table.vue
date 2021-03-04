<template>
  <div>
    <div class="btn">
      <Add></Add>
    </div>
    <!-- list table -->
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row style="margin-top: 11px">
        <!-- <b-col lg="6" class="my-1"> -->
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="left"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <!-- </b-col> -->
      </b-row>

      <b-table
        :items="items"
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
            class="mr-1 del-btn"
            @click="delBtn(row.item, row.index, $event.target)"
            >Delete</b-button
          >
        </template>
      </b-table>
      <!-- delete modal -->
      <b-modal
        :id="deleteModal.id"
        :title="deleteModal.title"
        ok-only
        @ok="delClient"
      >
        <pre>Are you sure you want to delete ? </pre>
      </b-modal>
    </b-container>
    <div>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import deleteClient from '@/mixins/delete.js'
import Add from '../Actions/Add.vue'
export default {
  components: {
    Add,
  },
  mixins: [deleteClient],
  data() {
    return {
      totalRows: this.totalRows,
      currentPage: 1,
      perPage: 5,
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
          key: 'owner',
          sortable: true,
        },
        {
          key: 'subject_type',
          sortable: true,
        },
        {
          key: 'client_secret_expires_at',
          sortable: true,
        },
        {
          key: 'tos_uri',
          sortable: true,
        },
        {
          key: 'policy_uri',
          sortable: true,
        },
        {
          key: 'contacts',
          sortable: true,
        },
        {
          key: 'created_at',
          sortable: true,
        },
        {
          key: 'Action',
          sortable: true,
        },
      ],
      bordered: true,
      responsive: true,
      filter: null,
      items: this.$store.getters.clients,
    }
  },
  mounted() {
    this.totalRows = this.items.length
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
  },
}
</script>
<style>
.btn {
  float: right;
}
.del-btn {
  background: #c21c2d;
}
.btn .add-btn {
  background: #004085;
  font-weight: bold;
}
</style>
