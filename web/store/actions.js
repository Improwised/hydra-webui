import { request } from "@/store/api.js";
export default {
  getClientList({ commit }) {
    return request(this.$axios, "get", `/clients`)
      .then((response) => {
        commit("clientsList", response);
      })
      .catch((error) => {
        commit("clientsList", []);
        return error;
      });
  },
  addClient({ dispatch }, data) {
    return request(this.$axios, "post", `/clients`, data);
  },
  deleteClient({ dispatch }, data) {
    return request(this.$axios, "delete", `/clients/${data}`);
  },
  getClientDetails({ commit }, data) {
    return request(this.$axios, "get", `/clients/${data}`)
      .then((response) => {
        commit("client", response);
      })
      .catch((error) => {
        commit("client", []);
        return error;
      });
  },
};
