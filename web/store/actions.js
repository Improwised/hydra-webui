import { request } from "../store/api";
export default {
  getClientList({ commit }) {
    return request(this.$axios, "get", `${this.$env.API_URL}/clients`)
      .then(response => {
        commit('clients', response);
      })
      .catch(err => {
        commit("clients", []);
      });
  },
  addClient({ dispatch }, data) {
    return request(this.$axios, "post", `${this.$env.API_URL}/clients`, data);
  },
  deleteClient({ dispatch }, data) {
    return request(this.$axios, 'delete', `${this.$env.API_URL}/clients/${data}`);
  },};
