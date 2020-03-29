import axios from "axios";

const state = {
    albums: []
};

const mutations = {
    load_albums(state, list) {
      state.albums = list;
    },
    delete_albums(state,list) {
      list.forEach(x => {
        for(var i = state.albums.length - 1; i >= 0; i--) {
          if(state.albums[i].album.id === x) {
            state.albums.splice(i, 1);
            break;
          }
        }  
      });
    }
  };
  
const token = localStorage.getItem("userToken");

const actions = {
  getAlbums({ commit }) {
    axios
      .get("/v1/me/albums", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        let list = response.data;
        console.log(response);
        console.log(list);
        commit("load_albums", list);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },



  deleteAlbums({commit},albums){
    
    axios.delete('/v1/me/albums', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: albums
    }).then(
      commit("delete_albums", albums)
    )
    .catch(error => console.log(error))
    
  }


};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
