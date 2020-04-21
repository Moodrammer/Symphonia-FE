import axios from "axios";

const state = {
  playlists: [],
  userInfo: null
};


const mutations = {
  load_playlists: (state, list) =>
    (state.playlists = list.playlists.items.filter(e=>e.public)),
  load_userInfo: (state, info) => {state.userInfo = info; console.log("sadasd",info)},
};

const getters = {
  allPublicPlaylists: function(state) {
    if(!state.playlists) return;
    var newValue = state.playlists;
    var playlists = [];
    newValue.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0],
        description: `By ${element.owner.name}`,
        id: element._id,
        type: "playlist"
      };
      playlists.push(k);
    });
    return playlists;
  },
  allInfo: function(state){
    if(state.userInfo)
    return {name: state.userInfo.name, image: state.userInfo.imageUrl}
  }
};
 
const actions = {
  /**
   * called to get user's public info
   * @param {object} payload contains the token
   */

  getUserInfo({ commit }, payload) {
    axios
      .get(`/v1/me/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(response => {
        console.log("user",response);
        // response.ownedPlaylists.forEach(element => dispatch("getPlaylists",{id: element, token: payload.token}));
        // response.followedAlbums.forEach(element => dispatch("getFollowedAlbums",{id: element, token: payload.token}));
        commit("load_userInfo", response.data);     

        
      })
      .catch(error => {
        console.log("axios caught an error in getAlbums");
        console.log(error);
      });
  },

  /**
   * called to get user's public playlists
   * @param {object} payload contains the token
   */

  getPublicPlaylists({ commit }, payload) {
    axios
      .get(`/v1/users/${payload.id}/playlists`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: { limit: 50, offset: 0 }
      })
      .then(response => {
        console.log(response);
        commit("load_playlists", response.data);        
      })
      .catch(error => {
        console.log("axios caught an error in getUserPlaylists");
        console.log(error);
      });

  },


};

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
};
