import axios from "axios";

const state = {
    albums: []
};

const mutations = {
    
  load_albums: (state, list) => state.albums = list,
  delete_albums:(state, list) => state.albums = state.albums.filter(album => !list.includes(album.album.id))

};
  
const getters = {
  allAlbums: function(state){
    var newValue = state.albums;
    var albums = [];
    newValue.forEach(element => {
      var k = {
        name: element.album.name,
        image: element.album.images[0].url,
        description: element.album.artists[0].name,
        id: element.album.id,
        url: "url to be added"
      }
      albums.push(k);
    });
    return albums;
}
}

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
      .then(response => commit("load_albums", response.data))
      .catch(error => {
        console.log("axios caught an error in getAlbums");
        console.log(error);
      });
  },

  /**
   * called to remove albums from the user's saved albums
   * @param {object} payload contains the token and the albums ids
   */


  deleteAlbums({commit},payload){
    
    axios.delete('/v1/me/albums', {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
      data: payload.albums
    }).then(
      commit("delete_albums", payload.albums)
    )
    .catch(error => {
      console.log("axios caught an error in deleteAlbums");
      console.log(error);
    })
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};