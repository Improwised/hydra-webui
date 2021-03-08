<template>
  <div class="container">
    <b-card
      class="custom-card w-100 mb-4"
      header-tag="header"
      header-class="custom-header dfaisb bb-1"
      body-class="custom-body p-0"
      footer-tag="footer"
      footer-class="custom-footer bt-1"
    >
      <template #header>
        <h6 class="mb-0 fsfwcb">Client List</h6>
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

<style>
.container {
  overflow: unset;
  background-color: #ffff;
  padding: 3px 30px;
  width: 100%;
  min-width: 100%;
}
.title {
  font-size: 31px;
}
.header {
  height: 80px;
}
.fsfwcb {
  font-size: 24px;
  font-weight: 500;
  color: #004084;
}
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
