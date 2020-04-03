import axios from "axios";

const state = {
  likedPlaylists: [],
  playlists: [],
  audio: undefined,
  paused: true,
  songLink: "",
  isQueueOpened: false,
  isSongLoaded: false,
};

const mutations = {
  add_playlist(state, payload) {
    state.likedPlaylists.push(payload);
  },
  load_likedPlaylists(state, list) {
    state.likedPlaylists = list;
  },
  //for Pause and Play
  load_playlists(state, list) {
    state.playlists = list;
  },
  setAudio(state, audio) {
    state.audio = audio;
  },
  setPaused(state, paused) {
    state.paused = paused;
  },
  pauseAndPlay(state) {
    state.paused = !state.paused;
    state.paused ? state.audio.pause() : state.audio.play();
  },
  setSongLink(state, songLink) {
    state.songLink = songLink;
  },
  setIsQueueOpened(state, isQueueOpened) {
    state.isQueueOpened = isQueueOpened;
  },
  setIsSongLoaded(state, isSongLoaded) {
    state.isSongLoaded = isSongLoaded;
  }
};

const getters = {
  audio(state) {
    return state.audio;
  },
  paused(state) {
    return state.paused;
  },
  songLink(state) {
    return state.songLink;
  },
  isQueueOpened(state) {
    return state.isQueueOpened;
  },
  isSongLoaded(state) {
    return state.isSongLoaded;
  },
  likedPlaylists: state => state.likedPlaylists,
};

const token = localStorage.getItem("userToken");
//const user_id = localStorage.getItem("userID");

const actions = {
  createPlaylist({ commit }, payload) {
    axios
      .post("/v1/users/" + payload.id + "/playlists", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        data: { name: payload.name }
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
  },
  pauseAndPlay(context) {
    context.commit("pauseAndPlay");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
