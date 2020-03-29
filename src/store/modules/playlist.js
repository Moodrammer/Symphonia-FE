import axios from "axios";

const state = {
  likedPlaylists: []
};

const mutations = {
  add_playlist(state, { id, name }) {
    state.likedPlaylists.push({
      id: id,
      name: name
    });

    console.log("Playlist was added");
  },
  load_likedPlaylists(state, list) {
    state.likedPlaylists = list;
  }
};

const token = localStorage.getItem("userToken");

const actions = {
  createPlaylist({ commit }, playlistName) {
    axios
      .post("/playlists", {
        data:{name: playlistName}
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
      .get("/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        let list = response.data;
        console.log(response);
        commit("load_likedPlaylists", list);
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
