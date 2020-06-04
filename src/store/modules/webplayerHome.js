const state = {
  logoutPopUpState: false
};

const mutations = {
  toggleLogoutPopUpState(state) {
    state.logoutPopUpState = !state.logoutPopUpState;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
