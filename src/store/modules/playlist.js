import axios from "axios";

const state = {
  likedPlaylists: [],
  playlists: [],
  audio: undefined,
  paused: true,
  isQueueOpened: false,
  isSongLoaded: false,
  flag: null, //A flag to know if the request had been done or not (will be removed)
  singlePlaylist: null
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
  setIsQueueOpened(state, isQueueOpened) {
    state.isQueueOpened = isQueueOpened;
  },
  setIsSongLoaded(state, isSongLoaded) {
    state.isSongLoaded = isSongLoaded;
  },
  setFlag(state) {
    state.flag = true;
  },
  setPlaylist(state, playlist) {
    state.singlePlaylist = playlist;
    console.log("from mutations");
    console.log(state.singlePlaylist.tracks);
    console.log(state.singlePlaylist);
  }
};

const getters = {
  audio(state) {
    return state.audio;
  },
  paused(state) {
    return state.paused;
  },
  isQueueOpened(state) {
    return state.isQueueOpened;
  },
  isSongLoaded(state) {
    return state.isSongLoaded;
  },
  likedPlaylists: state => state.likedPlaylists
};

const actions = {
  //Create a new playlist for the current user payload{Playlist's name & token}
  createPlaylist({ commit }, payload) {
    axios
      .post(
        "/v1/users/" + payload.id + "/playlists",
        { name: payload.name },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      .then(response => {
        var newPlaylist = response.data.playlist;
        commit("add_playlist", newPlaylist);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },

  // getPlayslist works for (Get a List of Current User's Playlists) when nothing send in the parameter 'user'
  // and works for (Get a List of a User's Playlists) when user is send in the parameter 'user'
  async getPlaylists({ commit }, payload) {
    await axios
      .get("/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${payload}`
        }
      })
      .then(response => {
        let list = response.data.items;
        let newList = [];
        list.forEach(element => {
          var k = {
            name: element.name,
            image: element.images[0],
            description: element.description,
            id: element.id,
            url: "to be added",
            type: "playlist"
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
  },
  //Follow a playlist Payload {playlist's id , token}
  followPlaylist({ commit }, payload) {
    axios
      .put(
        "/v1/playlists/" + payload.id + "/followers",
        {},
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      .then(() => {
        commit("setFlag");
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  getPlaylist({ commit }, playlistID) {
    axios
      .get("/v1/playlists/" + playlistID)
      .then(response => {
        let returnedPlaylist = response.data.playlist[0];
        console.log("dsasdsa")
        console.log(returnedPlaylist)
        commit("setPlaylist", returnedPlaylist);
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
  actions,
  getters
};
