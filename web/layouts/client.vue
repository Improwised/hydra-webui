<template>
  <div>
    <NavBar />
    <nuxt />
  </div>
</template>

<script>
import NavBar from "@/components/Layout/NavBar.vue";
export default {
  name: "Client",
  components: {
    NavBar,
  },
};
</script>
