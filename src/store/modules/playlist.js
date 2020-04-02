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
const user_id = localStorage.getItem("userID");

const actions = {
  createPlaylist({ commit }, playlistName) {
    axios
      .post("/v1/users/" + user_id + "/playlists", {
        data: { name: playlistName }
      })
      .then(response => {
        var newPlaylist = response.data;
        commit("add_playlist", newPlaylist);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },

  // getPlayslist works for (Get a List of Current User's Playlists) when nothing send in the parameter 'user'
  // and works for (Get a List of a User's Playlists) when user is send in the parameter 'user'
  async getPlaylists({ commit }) {
    await axios
      .get("/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        let list = response.data;
        let newList = [];
        list.forEach(element => {
          var k = {
            name: element.name,
            image: element.images[0].url,
            description: element.description,
            id: element.id,
            url: "url to be added"
          };
          newList.push(k);
        });
        commit("load_likedPlaylists", newList);
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
