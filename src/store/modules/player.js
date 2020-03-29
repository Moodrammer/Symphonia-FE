import axios from "axios";

const token = localStorage.getItem("userToken");

const state = {
  recentlyTracks: []
};

const mutations = {
  load_recentTracks(state, list) {
    state.recentlyTracks = list;
  }
};

const actions = {
  getRecentlyTracks({ commit }) {
    axios
      .get("/v1/me/player/tracks/history", {
        headers: {
          Authorization: `Bearer ${token}`
        }})
      .then(response => {
        let tracks = response.data;
        commit("load_recentTracks", tracks);
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
