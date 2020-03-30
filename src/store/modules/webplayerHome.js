import axios from "axios";

const state = {
  popularPlaylists: [],
  popularArtists: [],
  popPlaylists: [],
  rockPlaylists:[],
  jazzPlaylists:[],
  folkPlaylists:[],
  freshAlbums: []
};

const mutations = {
  load_popularPlaylists(state,payload) {
    state.popularPlaylists=payload;
  },
  load_popularArtists(state,payload) {
    state.popularArtists=payload;
  },
  load_popPlaylists(state,payload) {
    state.popPlaylists=payload;
  },
  load_rockPlaylists(state,payload) {
    state.rockPlaylists=payload;
  },
  load_jazzPlaylists(state,payload) {
    state.jazzPlaylists=payload;
  },
  load_folkPlaylists(state,payload) {
    state.folkPlaylists=payload;

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
  },
  getPopularArtists({commit}) {
    axios
    .get("/v1/me/popularArtists")
    .then(response => {
      let artists=response.data;
      commit("load_popularArtists",artists);
    })
    .catch(error => {
      console.log("axios caught an error");
      console.log(error);
    })
  },
  getGenrePlaylists({commit},category_id){
    axios
      .get("v1/browse/categories/"+category_id+"/playlists")
      .then(response => {
         let genreList=response.data;
         if(category_id=="pop")
         commit("load_popPlaylists",genreList);
         else if(category_id=="rock")
         commit("load_rockPlaylists",genreList);
         else if(category_id=="folk")
         commit("load_folkPlaylists",genreList);
         else
         commit("load_jazzPlaylists",genreList);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      })
  }
};

const getters={
  popular_playlists: state => state.popularPlaylists
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
