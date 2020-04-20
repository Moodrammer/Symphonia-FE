import axios from "axios";

const state = {
  albums: [],
  singleAlbum: null,
  followed: false,
  albumTracks: []
};

const mutations = {
  load_albums: (state, list) => (state.albums = list),
  delete_albums: (state, list) =>
    (state.albums = state.albums.filter(album => !list.includes(album._id))),
  setAlbum(state, payload) {
    state.singleAlbum = payload;
  },
  setTracks(state, payload) {
    state.albumTracks = payload;
  },
  setFollowed(state, payload) {
    state.followed = payload[0];
  },
  unfollow(state) {
    state.followed = false;
  },
  followed(state) {
    state.followed = true;
  }
};

const getters = {
  allAlbums: function(state) {
    var newValue = state.albums;
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
  /**
   * called to get user's saved albums
   * @param {object} payload contains the token
   */

  getAlbums({ commit }, payload) {
    axios
      .get("/v1/me/albums", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(response => {
        commit("load_albums", response.data.Albums.items);
      })
      .catch(error => {
        console.log("axios caught an error in getAlbums");
        console.log(error);
      });
  },

  /**
   * called to remove albums from the user's saved albums
   * @param {object} payload contains the token and the albums ids
   */

  deleteAlbums({ commit }, payload) {
    axios
      .delete("/v1/me/albums", {
        headers: {
          Authorization: `Bearer ${payload.token}`,
          "Content-Type": "application/json"
        },
        data: payload.albums
      })
      .then(commit("delete_albums", payload.albums))
      .catch(error => {
        console.log("axios caught an error in deleteAlbums");
        console.log(error);
      });
  },
  getAlbum({ commit, dispatch }, albumID) {
    dispatch("getAlbumTracks", albumID);
    axios
      .get("/v1/albums/" + albumID)
      .then(response => {
        let album = response.data;
        commit("setAlbum", album);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  getAlbumTracks({ commit }, albumID) {
    axios
      .get("/v1/albums/" + albumID + "/tracks")
      .then(response => {
        let tracks = response.data.tracks.items;
        commit("setTracks", tracks);
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
        .get("/v1/me/albums/contains?ids=" + payload.albumID, {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        })
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
  followAlbum({ commit }, payload) {
    axios
      .put(
        "/v1/me/albums?ids=" + payload.id,
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
  unfollowAlbum({ commit }, payload) {
    axios
      .delete("/v1/me/albums?ids=" + payload.id, {
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
