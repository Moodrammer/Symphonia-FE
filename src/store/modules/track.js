import axios from "axios";

const state = {
  trackName: "",
  liked: null,
  trackUrl: null,
  trackId: null,
  imageUrl: null,
  trackAlbumId: null,
  trackArtists: [],
  generalLiked: null,
};

const mutations = {
  setTrackData(state, payload) {
    state.trackName = payload.name;
    state.imageUrl = payload.category[0].icons[0].url;
    axios
      .get("/v1/artists/" + payload.artist, {
        headers: {
          Authorization: payload.token,
        },
      })
      .then((response) => {
        let artist = {
          name: undefined,
          href: ""
        }
        artist.name = response.data.name
        state.trackArtists[0] = artist;
      });
  },
  setLiked(state, payload) {
    if (payload.id == state.trackId) state.liked = payload.status;
    state.generalLiked = payload.status;
  },
  unlikeTrack(state, id) {
    if (id == state.trackId) state.liked = false;
    state.generalLiked = false;
  },
  likeTrack(state, id) {
    if (id == state.trackId) state.liked = true;
    state.generalLiked = true;
  },
  setTrackUrl(state, trackUrl) {
    state.trackUrl = trackUrl;
  },
  setID(state, id) {
    state.trackId = id;
  },
};

const actions = {
  async getTrack({ commit }, payload) {
    await commit("setID", payload.id);
    axios
      .get("/v1/users/track/" + payload.id, {
        headers: {
          Authorization: payload.token,
        },
      })
      .then((response) => {
        let trackData = response.data;
        commit("setTrackData", trackData);
      })
      .catch((error) => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  checkSaved({ commit }, payload) {
    axios
      .get("/v1/me/tracks/contains?ids=" + payload.id, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })
      .then((response) => {
        let liked = response.data;
        commit("setLiked", { status: liked, id: payload.id });
      })
      .catch((error) => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  removeSavedTrack({ commit }, payload) {
    axios
      .delete("/v1/me/tracks", {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        data: payload.id,
      })
      .then(() => {
        //   if(id[0]==state.trackId)           //comment it for now
        commit("unlikeTrack", payload.id);
      })
      .catch((error) => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  saveTrack({ commit }, payload) {
    axios
      .put(
        "/v1/me/tracks",
        { data: payload.id },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      )
      .then(() => {
        //if(id[0]==state.trackId)
        commit("likeTrack", payload.id);
      })
      .catch((error) => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
