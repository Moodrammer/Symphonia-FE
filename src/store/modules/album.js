import axios from "axios";
import getuserToken from "../../mixins/userService/getUserToken";
import isPremium from "../../mixins/userService/isPremium";

//--------------------------------------------------------
//             The stored album's data
//--------------------------------------------------------
const state = {
  //Array of user's followed albums
  followedAlbums: [],
  //The needed data for a single album
  singleAlbum: null,
  albumTracks: [],
  isFollowdAlbum: true,
  isLoading: false,
  nonPremiumTrackID: null
};

//-----------------------------------------------------------------
//  Save the returned data from requests in the state's variables
//-----------------------------------------------------------------
const mutations = {
  setFollowdAlbums(state, userFollowdAlbums) {
    state.followedAlbums = userFollowdAlbums;
  },
  setAlbumData(state, albumData) {
    state.singleAlbum = albumData;
    state.isLoading = false;
  },
  setAlbumTracks(state, albumTracks) {
    state.nonPremiumTrackID = null;
    state.albumTracks = albumTracks;
    let premium = isPremium.methods.isPremium();
    if (premium) {
      state.nonPremiumTrackID = albumTracks[0]._id;
    } else {
      for (let i = 0; i < albumTracks.length; i++) {
        if (albumTracks[i].premium == false) {
          state.nonPremiumTrackID = albumTracks[i]._id;
          break;
        }
      }
    }
  },
  setFollowed(state, payload) {
    state.isFollowdAlbum = payload[0];
  },
  notFollowedAlbum(state) {
    state.isFollowdAlbum = false;
  },
  followedAlbum(state) {
    state.isFollowdAlbum = true;
  },
  setLoading() {
    state.isLoading = true;
  },
  removeFollowedAlbum(state, albumID) {
    let albums = state.followedAlbums.filter(function(userAlbums) {
      return userAlbums._id != albumID;
    });
    state.followedAlbums = albums;
  }
};

const getters = {
  allAlbums: function(state) {
    var newValue = state.followedAlbums;
    var albums = [];
    newValue.forEach(element => {
      var k = {
        name: element.name,
        image: element.image,
        description: element.artists,
        id: element._id,
        type: "album"
      };
      albums.push(k);
    });
    return albums;
  }
};

const actions = {
  //-----------------------------------------
  //      Get User's followed albums
  //-----------------------------------------
  getAlbums({ commit }, payload) {
    axios
      .get("/v1/me/albums", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(response => {
        commit("setFollowdAlbums", response.data.Albums.items);
      })
      .catch(error => {
        console.log("axios caught an error in getAlbums");
        console.log(error);
      });
  },
  //---------------------------------------------
  //        Get a single album's data
  //---------------------------------------------
  async getAlbum({ commit, dispatch }, albumID) {
    commit("setLoading");
    dispatch("getAlbumTracks", albumID);
    await axios
      .get("/v1/albums/" + albumID)
      .then(response => {
        commit("setAlbumData", response.data);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  //----------------------------------------------
  //    Get a single album's tracks
  //----------------------------------------------
  getAlbumTracks({ commit }, albumID) {
    axios
      .get("/v1/albums/" + albumID + "/tracks")
      .then(response => {
        commit("setAlbumTracks", response.data.tracks.items);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  //--------------------------------------------------
  //     Check if the current user save the album
  //--------------------------------------------------
  async checkFollowed({ commit }, payload) {
    //No user logged in
    if (payload.token == null) {
      commit("notFollowedAlbum");
    } else {
      await axios
        .get("/v1/me/albums/contains?ids=" + payload.albumID, {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        })
        .then(response => {
          commit("setFollowed", response.data);
        })
        .catch(error => {
          console.log("axios caught an error");
          console.log(error);
        });
    }
  },
  //-------------------------------------------------
  //      Save an album for the current user
  //-------------------------------------------------
  followAlbum({ commit }, albumID) {
    const userToken = getuserToken.methods.getuserToken();
    if (userToken) {
      axios
        .put(
          "/v1/me/albums?ids=" + albumID,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        )
        .then(() => {
          commit("followedAlbum");
        })
        .catch(error => {
          console.log("axios caught an error");
          console.log(error);
        });
    } else commit("webplayerHome/toggleLogoutPopUpState", null, { root: true });
  },
  //-------------------------------------------------
  //    Delete an album from user's followed albums
  //-------------------------------------------------
  unfollowAlbum({ commit }, albumID) {
    const userToken = getuserToken.methods.getuserToken();
    axios
      .delete("/v1/me/albums?ids=" + albumID, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(() => {
        commit("notFollowedAlbum");
        commit("removeFollowedAlbum", albumID);
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
