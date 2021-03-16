export default {
  clientsList: (state) => {
    return state && state.clientsList ? state.clientsList : null;
  },
  client: (state) => {
    return state && state.client ? state.client : null;
  },
};
