import axios from "axios";

const state = {
  popularPlaylists: [],
  popularArtists: [],
  genrePlaylists: [],
  freshAlbums: []
};

const mutations = {
  load_popularPlaylists(state,payload) {
    state.popularPlaylists=payload;
  }
};

const actions = {
  getPopularPlaylists({ commit }) {
    axios
      .get("/v1/me/popularPlaylists")
      .then(response => {
        let playlists = response.data;
        commit("load_popularPlaylists", playlists);
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
