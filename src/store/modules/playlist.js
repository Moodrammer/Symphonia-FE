import axios from "axios";

const state = {
  playlists: [],
  audio: undefined,
  paused: true,
  songLink: "",
  isQueueOpened: false,
  isSongLoaded: false,
};

const mutations = {
  add_playlist(state, { id, name }) {
    state.playlists.push({
      id: id,
      name: name
    });

    console.log("Playlist was added");
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
  }
};

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
  getPlaylists({ commit }) {
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
