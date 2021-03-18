export default {
  methods: {
    async addClient(data) {
      await this.$store
        .dispatch("addClient", data)
        .then(() => {
          this.$toasted.success("Client added successfully", {
            theme: "bubble",
            position: "top-right",
            duration: 2000,
          });
          this.$bvModal.hide("add-model");
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
