const state = {
  logoutPopUpState: false,
  logoutRequest: {
    requestType: null,
    requestPayload: null
  }
};

const mutations = {
  toggleLogoutPopUpState(state) {
    state.logoutPopUpState = !state.logoutPopUpState;
  },
  setLogoutRequest(state, payload) {
    state.logoutRequest.requestType = payload.requestType;
    state.logoutRequest.requestPayload = payload.requestPayload;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
