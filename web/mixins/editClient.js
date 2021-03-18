export default {
  methods: {
    async editClient(data) {
      await this.$store
        .dispatch("updateClient", data)
        .then(() => {
          this.$toasted.success("Client updated successfully", {
            theme: "bubble",
            position: "top-right",
            duration: 2000,
          });
          this.$bvModal.hide("edit-modal");
          this.$store.dispatch("getClientList");
        })
        .catch((err) => {
          const msg = err.response.data.error_hint
            ? err.response.data.error_hint
            : err.response.data.error;
          this.$toasted.error(msg, {
            theme: "bubble",
            position: "top-right",
            duration: 2000,
          });
        });
    },
  },
};
