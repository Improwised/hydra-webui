import { request } from '@/store/api.js'
export default {
  getClientList({ commit }) {
    return request(this.$axios, 'get', `/clients`)
      .then((response) => {
        commit('clients', response)
      })
      .catch((error) => {
        commit('clients', [])
        return error
      })
  },
  addClient({ dispatch }, data) {
    return request(this.$axios, 'post', `/clients`, data)
  },
  deleteClient({ dispatch }, data) {
    return request(this.$axios, 'delete', `/clients/${data}`)
  },
}
