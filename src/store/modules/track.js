import axios from "axios";

const token = localStorage.getItem("userToken");

const state = {
  trackName: "",
  liked: null,
  trackUrl: null,
  trackId: null,
  imageUrl: null,
  trackAlbumId: null,
  trackArtists: []
};

const mutations = {
  setTrackData( state ,payload) {
    state.trackName=payload.name;
    state.trackUrl=payload.href;
    state.trackArtists=payload.artists;
    state.imageUrl=payload.album.images[0].url;
    state.trackAlbumId=payload.album.id;
  },
  setLiked( state , payload) {
    state.liked=payload;
  },
  unlikeTrack( state) {
    state.liked=false;
  },
  likeTrack( state ) {
    state.liked=true;
  }
};

const actions = {
  getTrack({ commit }, id) {
    axios
      .get("/v1/users/track/" + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        let trackData = response.data[0];
        commit("setTrackData", trackData);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  checkSaved({ commit }, id) {

    axios
      .get("/v1/me/tracks/contains?ids="+id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        let liked=response.data;
        commit("setLiked",liked);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  removeSavedTrack({commit}, id) {
    axios
    .delete("/v1/me/tracks",{
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: id
    })
    .then(() => {
   //   if(id[0]==state.trackId)           //comment it for now
     commit("unlikeTrack");
    })
    .catch(error => {
      console.log("axios caught an error");
      console.log(error);
    })
  },
  saveTrack({ commit } ,id) {
    axios
      .put("/v1/me/tracks",{
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: id
      })
      .then(() => {
        //if(id[0]==state.trackId)
        commit("likeTrack");
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
