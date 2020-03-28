import axios from "axios";

const state = {
    albums: []
};

const mutations = {
    load_albums(state, list) {
      state.albums = list;
    }
  };
  
const token = localStorage.getItem("userToken");

const actions = {
  getAlbums({ commit }) {
    axios
      .get("/v1/me/albums", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        let list = response.data;
        console.log(response);
        console.log(list);
        commit("load_albums", list);
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
