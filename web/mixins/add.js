export default {
  methods: {
    async addClient(data) {
      await this.$store
        .dispatch('addClient', data)
        .then(() => {
          this.$toasted.success('Client Added Successfully', {
            theme: 'bubble',
            position: 'top-right',
            duration: 4000,
          })
          this.$nextTick(() => {
            this.$bvModal.hide('add-model')
          })
          this.$router.go()
        })
        .catch((err) => {
          this.$toasted.error(err.response.data.error_debug, {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000,
          })
        })
    },
  },
}
