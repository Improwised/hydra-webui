export default {
  methods: {
    async deleteClient(data) {
      try {
        await this.$store.dispatch('deleteClient', data)
        // await this.$store.dispatch('getClientList')
        this.$toasted.success('Client Deleted Successfully', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
        })
        this.$router.go()
      } catch (err) {
        this.$toasted.error(err.response.data.error_debug, {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
        })
      }
    },
  },
}
