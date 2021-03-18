<template>
  <b-modal id="client-details" size="xl" title="Client details" hide-footer>
    <div class="p-3">
      <table class="table table-bordered m-0">
        <tbody>
          <tr v-for="(client, index) in clientData" :key="index">
            <td class="w-50">
              <strong>{{ index | formatValues }}</strong>
            </td>

            <td class="w-50">
              {{ client | filterValues(index) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    clientData: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
};
</script>
