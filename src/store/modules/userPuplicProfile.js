import axios from "axios";

const state = {
  albums: []
};


const mutations = {
  delete_albums: (state, list) =>
    (state.albums = state.albums.filter(album => !list.includes(album._id)))
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

  getUserProfile({ commit, dispatch }, payload) {
    axios
      .get(`/v1/me/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(response => {
        console.log(response);
        response.tracks.forEach(element => dispatch("getFollowedTracks",{id: element, token: payload.token}));
        // response.ownedPlaylists.forEach(element => dispatch("getPlaylists",{id: element, token: payload.token}));
        // response.followedAlbums.forEach(element => dispatch("getFollowedAlbums",{id: element, token: payload.token}));
        commit("getFollowedAlbums",{albums: response.followedAlbums, token: payload.token});     

        
      })
      .catch(error => {
        console.log("axios caught an error in getAlbums");
        console.log(error);
      });
  },

  getUserPlaylists({ commit }, payload) {
    axios
      .get(`/v1/users/${payload.id}/playlists`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: { limit: 50, offset: 0 }
      })
      .then(response => {
        console.log(response);
        commit("load_playlists", response);        
      })
      .catch(error => {
        console.log("axios caught an error in getUserPlaylists");
        console.log(error);
      });

  },

  getUserAlbums({ commit }, payload) {
    axios
      .get(`/v1/albums`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: { ids: payload.ids.join() }
      })
      .then(response => {
        console.log(response);
        commit("load_albums", response);        
      })
      .catch(error => {
        console.log("axios caught an error in getUserAlbums");
        console.log(error);
      });
      
  },



};

export default {
  state,
  mutations,
  actions,
  getters
};
