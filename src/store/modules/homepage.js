const state = {
  instance: null
}

const mutations = {
  setInstance: (state, instance) => { state.instance = instance }
}

export default {
  namespaced: true,
  state,
  mutations
};
