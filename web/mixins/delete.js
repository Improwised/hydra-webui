export const deleteClient = {
    methods: {
      async deleteClient(data) {
        try {
          const response = await this.$store.dispatch('deleteClient', data);
          const response1 = await this.$store.dispatch('getClientList');
          this.$toasted.success("Client Deleted Successfully", {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000
          });
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
  