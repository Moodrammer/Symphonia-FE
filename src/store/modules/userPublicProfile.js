import axios from "axios";

const state = {
  playlists: null,
  userInfo: null
};

const mutations = {
  setPlaylists: (state, list) => {
    list.playlists.items = list.playlists.items.filter(e => e.public);
    if (
      !state.playlists ||
      list.playlists.offset == 0 ||
      list.playlists.offset == state.playlists.offset
    ) {
      state.playlists = list.playlists;
    } else {
      state.playlists.items = state.playlists.items.concat(
        list.playlists.items
      );
      state.playlists.limit = state.playlists.items.length;
    }
  },
  setUserInfo: (state, info) => (state.userInfo = info)
};

const getters = {
  allPublicPlaylists: function(state) {
    if (!state.playlists || !state.playlists.items) return;

    var playlists = [];
    state.playlists.items.forEach(element => {
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
  allInfo: function(state) {
    if (state.userInfo)
      return {
        name: state.userInfo.name,
        image: state.userInfo.imageUrl,
        type: state.userInfo.type
      };
  }
};

const actions = {
  /**
   * called to get user's public info
   * @param {object} payload contains the token
   */

  getUserInfo({ commit }, payload) {
    axios
      .get(`/v1/me/user/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(response => {
        commit("setUserInfo", response.data);
      })
      .catch(error => {
        console.log("axios caught an error in getUserInfo");
        console.log(error);
      });
  },

  /**
   * called to get user's public playlists
   * @param {object} payload contains the token
   */

  getPublicPlaylists({ commit, dispatch }, payload) {
    const limit = 50;
    axios
      .get(`/v1/users/${payload.id}/playlists`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: { limit: limit, offset: payload.offset }
      })
      .then(response => {
        commit("setPlaylists", response.data);
        if (response.data.playlists.items.length >= limit) {
          dispatch("getPublicPlaylists", {
            token: payload.token,
            id: payload.id,
            offset: payload.offset + limit
          });
        }
      })
      .catch(error => {
        console.log("axios caught an error in getUserPlaylists");
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
