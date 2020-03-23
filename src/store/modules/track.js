import axios from "axios";

const state = {
  tracks:[]
};

const mutations = {
  load_tracks(state, list) {
    state.tracks = list;
  }
};
const token=localStorage.getItem("userToken");


const actions = {
  getTracks({ commit }) {
    axios
      .get("/v1/me/tracks", {
        headers: {
          'Authorization': `Bearer ${token}`
      }})
      .then(response => {
        let list = response.data;
        console.log(response);
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
