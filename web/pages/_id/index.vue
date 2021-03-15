<template>
  <div class="p-3 w-100" align="center">
    <b-card
      class="border-0 shadow w-75 mb-4 rounded-lg"
      header-tag="header"
      header-class="d-flex justify-content-between align-items-center"
      header-bg-variant="transparent"
      body-class="custom-body p-0"
      footer-tag="footer"
      footer-class="custom-footer bt-1"
    >
      <template #header>
        <h3 class="mb-0 text-danger">Client Details</h3>
      </template>
      <clientDetail />
    </b-card>
  </div>
</template>

<script>
import clientDetail from "@/components/Client/ClientDetail.vue";
export default {
  components: {
    clientDetail,
  },
  layout: "client",
  async asyncData({ store, route }) {
    await store.dispatch("getClientDetails", route.params.id);
  },
};
</script>
