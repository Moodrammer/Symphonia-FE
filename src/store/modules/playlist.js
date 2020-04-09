import axios from "axios";

const state = {
  likedPlaylists: [],
  playlists: [],
  audio: undefined,
  paused: true,
  isQueueOpened: false,
  isSongLoaded: false,
  singlePlaylist: null,
  playlistTracks: [],
  followed: false,
  isFirstSong: true
};

const mutations = {
  add_playlist(state, payload) {
    var k = {
      name: payload.name,
      image: payload.images[0],
      description: payload.description,
      id: payload.id,
      url: "to be added",
      type: "playlist"
    };
    state.likedPlaylists.push(k);
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
    if (state.paused) {
      state.audio.pause();
    } else {
      state.isFirstSong = false;
      state.audio.play();
    }
  },
  setIsQueueOpened(state, isQueueOpened) {
    state.isQueueOpened = isQueueOpened;
  },
  setIsSongLoaded(state, isSongLoaded) {
    state.isSongLoaded = isSongLoaded;
  },
  followed(state) {
    state.followed = true;
  },
  setPlaylist(state, playlist) {
    state.singlePlaylist = playlist;
  },
  setIsFirstSong(state, isFirstSong) {
    state.isFirstSong = isFirstSong;
  },
  setTracks(state, tracks) {
    //Vue.set(state, "playlistTracks", tracks);
    state.playlistTracks = tracks;
  },
  emptyTracks(state) {
    state.playlistTracks = [];
  },
  setFollowed(state, payload) {
    state.followed = payload[0];
  },
  unfollow(state) {
    state.followed = false;
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
  likedPlaylists: state => state.likedPlaylists,
  playlistTracks(state) {
    return state.playlistTracks;
  },
  singlePlaylist(state) {
    return state.singlePlaylist;
  }
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
  async getPlaylists({ commit }, payload) {
    if (payload != null) {
      await axios
        .get("/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${payload}`
          }
        })
        .then(response => {
          let list = response.data.ownedPlaylists;
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
    }
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
        commit("followed");
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  getPlaylist({ commit, dispatch }, playlistID) {
    dispatch("getPlaylistTracks", playlistID);
    axios
      .get("/v1/playlists/" + playlistID)
      .then(response => {
        let returnedPlaylist = response.data[0];
        commit("setPlaylist", returnedPlaylist);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  getPlaylistTracks({ commit }, playlistID) {
    axios
      .get("/v1/playlists/" + playlistID + "/tracks")
      .then(response => {
        let returnedTracks = response.data[0].tracks;
        commit("setTracks", returnedTracks);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  checkFollowed({ commit }, payload) {
    if (payload.token == null) {
      commit("unfollow");
    } else {
      axios
        .get(
          "/v1/playlists/" +
            payload.playlistId +
            "/followers/contains?ids=" +
            payload.usersID,
          {
            headers: {
              Authorization: `Bearer ${payload.token}`
            }
          }
        )
        .then(response => {
          let status = response.data;
          commit("setFollowed", status);
        })
        .catch(error => {
          console.log("axios caught an error");
          console.log(error);
        });
    }
  },
  unfollowPlaylist({ commit }, payload) {
    axios
      .delete("/v1/playlists/" + payload.id + "/followers", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(() => {
        commit("unfollow");
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
