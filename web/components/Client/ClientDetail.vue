<template>
  <div>
    <div class="p-3">
      <table class="table table-bordered m-0">
        <tbody>
          <tr v-for="(client, index) in clientData" :key="index">
            <td class="w-50">
              <strong>{{ index | formatValues }}</strong>
            </td>

            <td class="w-50">
              {{ client }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    clientData() {
      return this.$store.getters.client;
    },
  },
};
</script>
