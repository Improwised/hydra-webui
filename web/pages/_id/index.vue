<template>
  <div class="p-3" align="center">
    <b-card
      class="border-0 shadow w-75 mb-4 rounded-lg"
      header-tag="header"
      header-class="d-flex justify-content-between align-items-center"
      header-bg-variant="transparent"
      body-class="p-0"
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
