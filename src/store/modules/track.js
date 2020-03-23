import axios from "axios";

const state = {
  tracks:[]
};

const mutations = {
  load_tracks(state, list) {
    state.tracks = list;
  }
};

const actions = {
  getTracks({ commit }) {
    axios
      .get("/v1/me/tracks")
      .then(response => {
        let list = response.data;
        console.log(list);
        commit("load_tracks", list);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
