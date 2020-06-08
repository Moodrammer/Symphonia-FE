import axios from "axios";
import getuserToken from "../../mixins/userService/getUserToken";

const state = {
  userSavedPlaylists: [],
  ownedPlaylists: [],
  singlePlaylist: null,
  menuPlaylist: null,
  playlistTracks: [],
  isFollowed: false,
  deletedFlag: false,
  playlistID: null,
  updateTracksFlag: null,
  nonPremiumTrackID: null,
  createWithTrack: false,

  //The tracks' IDs to be added
  tracksToAdd: [],

  //Playlist's popups flags
  deletePlaylist: false,
  createPlaylist: false,
  addTrack: false,
  adsPopup: false,

  isLoading: false
};

const mutations = {
  addNewPlaylist(state, payload) {
    var k = {
      name: payload.name,
      image: payload.images[0],
      description: payload.description,
      id: payload.id,
      type: "playlist"
    };
    state.userSavedPlaylists.push(k);
  },
  setUserPlaylists(state, list) {
    state.userSavedPlaylists = list;
  },
  setPlaylist(state, payload) {
    if (payload.isMenu) state.menuPlaylist = payload.playlist;
    else state.singlePlaylist = payload.playlist;
    state.isLoading = false;
  },
  setPlaylistTracks(state, tracks) {
    state.playlistTracks = tracks;
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].premium == false) {
        state.nonPremiumTrackID = tracks[i]._id;
        break;
      }
    }
  },
  setOwnedPlaylists(state, playlists) {
    state.ownedPlaylists = playlists;
  },
  setFollowed(state, payload) {
    state.isFollowed = payload[0];
  },
  followedPlaylist(state) {
    state.isFollowed = true;
  },
  unfollowedPlaylist(state) {
    state.isFollowed = false;
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
  setDeletedFlag(state) {
    state.deletedFlag = true;
  },
  setPlaylistID(state, ID) {
    state.playlistID = ID;
  },
  changeUpdatePlaylistTracks(state) {
    state.updateTracksFlag = !state.updateTracksFlag;
  },
  setAddedTracks(state, payload) {
    state.tracksToAdd = payload;
  },
  createWithTrackModel(state) {
    state.createWithTrack = !state.createWithTrack;
  },
  setLoading() {
    state.isLoading = true;
  }
};

const getters = {
  likedPlaylists(state) {
    return state.userSavedPlaylists;
  },
  playlistTracks(state) {
    return state.playlistTracks;
  },
  singlePlaylist(state) {
    return state.singlePlaylist;
  }
};

const actions = {
  //--------------------------------------------------------
  //   Get a single playlist's data
  //--------------------------------------------------------
  async getPlaylist({ commit }, payload) {
    if (!payload.isMenu) commit("setLoading");
    await axios
      .get("/v1/playlists/" + payload.playlistID)
      .then(response => {
        commit("setPlaylist", {
          playlist: response.data,
          //Flag to know if this data for the playlist view or to the right click menu
          isMenu: payload.isMenu
        });
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  //--------------------------------------------------------
  //   Get a single playlist's tracks
  //--------------------------------------------------------
  getPlaylistTracks({ commit }, playlistID) {
    axios
      .get("/v1/playlists/" + playlistID + "/tracks")
      .then(response => {
        let returnedTracks = response.data.tracks.items;
        commit("setPlaylistTracks", returnedTracks);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  //--------------------------------------------------------
  //   Get User's playlists (owned || followed)
  //--------------------------------------------------------
  async getPlaylists({ commit }, payload) {
    if (payload != null) {
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
              type: "playlist"
            };
            newList.push(k);
          });
          commit("setUserPlaylists", newList);
        })
        .catch(error => {
          console.log("axios caught an error");
          console.log(error);
        });
    }
  },
  //--------------------------------------------------------
  //   Get User's owned playlists (created by him)
  //--------------------------------------------------------
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
  //--------------------------------------------------------
  //   Check if the user follows a specific playlist
  //--------------------------------------------------------
  async checkFollowed({ commit }, payload) {
    if (payload.token == null) {
      commit("unfollowedPlaylist");
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
  //--------------------------------------------------------
  //          Follow a playlist (Not created by user)
  //--------------------------------------------------------
  followPlaylist({ commit }, payload) {
    const userToken = getuserToken.methods.getuserToken();
    if (userToken) {
      axios
        .put(
          "/v1/playlists/" + payload.id + "/followers",
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        )
        .then(() => {
          commit("followedPlaylist");
        })
        .catch(error => {
          if (error.response.statusText === "Unauthorized") {
            commit("webplayerHome/toggleLogoutPopUpState", null, {
              root: true
            });
          }
        });
    } else commit("webplayerHome/toggleLogoutPopUpState", null, { root: true });
  },
  //--------------------------------------------------------
  //          Unfollow a playlist (Not created by user)
  //--------------------------------------------------------
  unfollowPlaylist({ commit }, payload) {
    axios
      .delete("/v1/playlists/" + payload.id + "/followers", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(() => {
        commit("unfollowedPlaylist");
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  //--------------------------------------------------------
  //               Create a new playlist
  //--------------------------------------------------------
  //It has 2 cases:
  //1)Normal Creation     2)Create to add track to it
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
        commit("addNewPlaylist", newPlaylist);
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
  //--------------------------------------------------------
  //    Delete a Playlist (From user's owned playlists)
  //--------------------------------------------------------
  deletePlaylist({ commit, state }, token) {
    axios
      .delete("/v1/playlists/" + state.playlistID, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        commit("setDeletedFlag");
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  //--------------------------------------------------------
  //            Make a playlist public\secret
  //--------------------------------------------------------
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
  //--------------------------------------------------------
  //             Add Track To Playlist
  //--------------------------------------------------------
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
        commit("changeUpdatePlaylistTracks");
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  //--------------------------------------------------------
  //             Remove Track From Playlist
  //--------------------------------------------------------
  async removePlaylistTrack({ commit }, payload) {
    await axios
      .delete(
        "/v1/playlists/" + payload.playlistID + "/tracks?ids=" + payload.ids,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      .then(() => {
        commit("changeUpdatePlaylistTracks");
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
