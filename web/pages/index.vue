<template>
  <div class="p-3">
    <b-card
      class="border-0 shadow w-100 mb-4 rounded-lg"
      header-tag="header"
      header-class="d-flex justify-content-between align-items-center"
      header-bg-variant="transparent"
      body-class="custom-body p-0"
      footer-tag="footer"
      footer-class="custom-footer bt-1"
    >
      <template #header>
        <h3 class="mb-0 text-danger">Client List</h3>
        <Add />
      </template>
      <List></List>
    </b-card>
  </div>
</template>

<script>
import List from '@/components/List/Table.vue'
import Add from '@/components/List/Add.vue'

export default {
  components: {
    List,
    Add,
  },
  layout: 'client',
  async asyncData({ store }) {
    await store.dispatch('getClientList')
    return {}
  },
}
</script>
