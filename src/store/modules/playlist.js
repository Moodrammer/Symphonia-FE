import axios from "axios";

const state = {
  likedPlaylists: []
};

const mutations = {
  add_playlist(state, payload) {
    state.likedPlaylists.push(payload);
  },
  load_likedPlaylists(state, list) {
    state.likedPlaylists = list;
  }
};

const token = localStorage.getItem("userToken");
const user_id=localStorage.getItem("userID");

const actions = {
  createPlaylist({ commit }, playlistName) {
    axios
      .post("/v1/users/"+user_id+"/playlists", {
        data:{name: playlistName}
      })
      .then(response => {
        var newPlaylist = response.data
        commit("add_playlist", newPlaylist);
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
        console.log("Hi from playlist");
        commit("load_likedPlaylists", list);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  }
};

const getters = {
  likedPlaylists: state => state.likedPlaylists
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
