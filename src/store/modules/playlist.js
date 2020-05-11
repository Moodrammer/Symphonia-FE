import axios from "axios";

const state = {
  likedPlaylists: [],
  playlists: [],
  singlePlaylist: null,
  playlistOwner: null,
  playlistTracks: [],
  followed: false,
  deletePlaylist: false,
  createPlaylist: false,
  adsPopup: false,
  addTrack: false,
  deleted: false,
  playlistID: null,
  ownedPlaylists: [],
  flag: null,
  tracksToAdd: [],
  createWithTrack: false,
  menuPlaylist: null
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
  load_playlists(state, list) {
    state.playlists = list;
  },
  followed(state) {
    state.followed = true;
  },
  setPlaylist(state, payload) {
    if (payload.isMenu) state.menuPlaylist = payload.playlist;
    else state.singlePlaylist = payload.playlist;
  },
  setTracks(state, tracks) {
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
  },
  changeDeleteModel(state) {
    state.deletePlaylist = !state.deletePlaylist;
  },
  changeCreateModel(state) {
    state.createPlaylist = !state.createPlaylist;
  },
  changeAddTrackModel(state) {
    state.addTrack = !state.addTrack;
  },
  changeAdsPopup(state) {
    state.adsPopup = !state.adsPopup;
  },
  deleted(state) {
    state.deleted = true;
  },
  setPlaylistID(state, ID) {
    state.playlistID = ID;
  },
  emptyPlaylists(state) {
    state.likedPlaylists = [];
  },
  setOwnedPlaylists(state, playlists) {
    state.ownedPlaylists = playlists;
  },
  changeFlag(state) {
    state.flag = true;
  },
  setAddedTracks(state, payload) {
    state.tracksToAdd = payload;
  },
  createWithTrackModel(state) {
    state.createWithTrack = !state.createWithTrack;
  }
};

const getters = {
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
  createPlaylist({ commit, state, dispatch }, payload) {
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
        if (state.createWithTrack == true) {
          dispatch("addTrackToPlaylist", {
            playlistID: newPlaylist.id,
            token: payload.token
          });
          commit("changeAddTrackModel");
        }
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
      // await commit("emptyPlaylists");
      await axios
        .get("/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${payload}`
          }
        })
        .then(response => {
          let list = response.data.playlists.items;
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
  async getPlaylist({ commit }, payload) {
    await axios
      .get("/v1/playlists/" + payload.playlistID)
      .then(response => {
        let returnedPlaylist = response.data;
        commit("setPlaylist", {
          playlist: returnedPlaylist,
          isMenu: payload.isMenu
        });
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
        let returnedTracks = response.data.tracks.items;
        commit("setTracks", returnedTracks);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  async checkFollowed({ commit }, payload) {
    if (payload.token == null) {
      commit("unfollow");
    } else {
      await axios
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
  },
  deletePlaylist({ commit, state }, token) {
    axios
      .delete("/v1/playlists/" + state.playlistID, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        commit("deleted");
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  // followedPlaylist({ commit }, token) {
  //   axios
  //     .get("/v1/me/following/playlists", {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       let list = response.data;
  //       let newList = [];
  //       list.forEach(element => {
  //         var k = {
  //           name: element.name,
  //           image: element.images[0],
  //           description: element.description,
  //           id: element.id,
  //           url: "to be added",
  //           type: "playlist"
  //         };
  //         newList.push(k);
  //       });
  //       commit("load_likedPlaylists", newList);
  //     })
  //     .catch(error => {
  //       console.log("axios caught an error");
  //       console.log(error);
  //     });
  // },
  changeDetails({ commit }, payload) {
    axios
      .patch(
        "/v1/playlists/" + payload.playlistID,
        {
          public: payload.public
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      .then(response => {
        let returnedPlaylist = response.data;
        commit("setPlaylist", returnedPlaylist);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  addTrackToPlaylist({ commit, state }, payload) {
    axios
      .post(
        "/v1/playlists/" + payload.playlistID + "/tracks",
        {
          tracks: state.tracksToAdd
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      .then(() => {
        commit("changeFlag");
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  getOwnedPlaylists({ commit }, token) {
    axios
      .get("/v1/me/playlists/owned", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        let owned = response.data.playlists.items;
        commit("setOwnedPlaylists", owned);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  removePlaylistTrack({ commit }, payload) {
    axios
      .delete(
        "/v1/playlists/" + payload.playlistID + "/tracks?ids=" + payload.ids,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      .then(() => {
        commit("changeFlag");
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
