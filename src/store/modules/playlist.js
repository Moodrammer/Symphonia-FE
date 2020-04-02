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

//const token = localStorage.getItem("userToken");

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

  // getPlayslist works for (Get a List of Current User's Playlists) when nothing send in the parameter 'user'
  // and works for (Get a List of a User's Playlists) when user is send in the parameter 'user'
  getPlaylists({ commit }) {

    // var request = user ? 'users/' + user : 'me';
    // request = '/v1/' + request + '/playlists';

    // axios
    //   .get(request, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //   .then(response => {
    //     let list = response.data;
    //     console.log(list);
    //     commit("load_playlists", list);
    //   })
    //   .catch(error => {
    //     console.log("axios caught an error");
    //     console.log(error);
    //   });

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
