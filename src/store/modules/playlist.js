import axios from "axios";

const state = {
  playlists: []
};

const mutations = {
  add_playlist(state, { id, name }) {
    state.playlists.push({
      id: id,
      name: name
    });

    console.log("Playlist was added");
  },
  load_playlists(state, list) {
    state.playlists = list;
  }
};

const actions = {
  createPlaylist({ commit }, playlistName) {
    axios
      .post("/playlists", {
        data: playlistName
      })
      .then(response => {
        console.log(response);
        var id = response.data.id;
        var name = response.data.name;
        commit("add_playlist", { id, name });
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  getPlaylists({ commit }) {
    axios
      .get("/playlists")
      .then(response => {
        let list = response.data;
        console.log(list);
        commit("load_playlists", list);
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
