const state = {
  homepageInstance: null,
  navigationBarColor: "rgba(0, 0, 0, 0.6)",
};

const mutations = {
  setHomepageInstance: (state, homepageInstance) => {
    state.homepageInstance = homepageInstance;
  },
  setNavigationBarColor: (state, navigationBarColor) => {
    state.navigationBarColor = navigationBarColor
  }
};

export default {
  namespaced: true,
  state,
  mutations,
};
