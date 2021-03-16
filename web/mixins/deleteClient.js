export default {
  methods: {
    async deleteClient(data) {
      await this.$store
        .dispatch("deleteClient", data)
        .then(() => {
          this.$toasted.success("Client deleted successfully", {
            theme: "bubble",
            position: "top-right",
            duration: 4000,
          });
          this.$store.dispatch("getClientList");
        })
        .catch((err) => {
          this.$toasted.error(err.response.data.error_debug, {
            theme: "bubble",
            position: "top-right",
            duration: 4000,
          });
        });
    },
  },
};
