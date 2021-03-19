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
  deleteClient({ dispatch }, id) {
    return request(this.$axios, "delete", `/clients/${id}`);
  },
  getClientDetails({ commit }, id) {
    return request(this.$axios, "get", `/clients/${id}`)
      .then((response) => {
        commit("client", response);
      })
      .catch((error) => {
        commit("client", []);
        return error;
      });
  },
  // Not using
  updateClient({ dispatch }, data) {
    return request(this.$axios, "put", `/clients/${data.client_id}`, data);
  },
  consentSession({ dispatch }, data) {
    return request(
      this.$axios,
      "get",
      `/oauth2/auth/sessions/consent?subject=${data.client_id}`
    );
  },
  getConsentRequest({ dispatch }, data) {
    return request(
      this.$axios,
      "get",
      `/oauth2/auth/requests/consent?consent_challenge=${data.client_name}`
    );
  },
  acceptConsentSession({ dispatch }, { id, data }) {
    return request(
      this.$axios,
      "put",
      `/oauth2/auth/requests/consent/accept?consent_challenge=${id}`,
      data
    );
  },
};
