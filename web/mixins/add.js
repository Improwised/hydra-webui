export const addClient = {
    methods: {
      async addClient(data) {
        try {
          const response = await this.$store.dispatch('addClient', data);
          const response1 = await this.$store.dispatch('getClientList');
          this.$toasted.success("Client Added Successfully", {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000
          });
          this.$nextTick(() => {
            this.$bvModal.hide('add-model')
          })
        } catch (err) {
          this.$toasted.error(err.response.data.error_debug, {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000
          });
        }
      }
    }
  };
  