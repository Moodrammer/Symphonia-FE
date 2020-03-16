import Vue from "vue";
import Vuex from "vuex";
import client from "api-client";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playlists: []
  },
  mutations: {
    add_playlist(state,{id,name}){
      state.playlists.push({
        id: id,
        name: name
      });
     
      console.log("Playlist was added");
    },
    load_playlists(state,list){
      state.playlists=list
    }
  },
  actions: {
    getClient() {
      //just a dummy function to prevent (( 'client' is defined but never used )) error
      return client; //anyone is welcomed to remove this function after implementing any other function that uses 'client'.
    },
    createPlaylist({commit},playlistName){
      axios
      .post("/api/playlists",{
        data: playlistName
      })
      .then(response =>{
        console.log(response);
        var id = response.data.id;
        var name=response.data.name;
        commit("add_playlist",{id,name});
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
      
    },
    getPlaylists({commit}){
      axios
      .get("/api/playlists")
      .then(response =>{
        let list=response.data;
        console.log(list)
        commit("load_playlists",list)
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
    }

  },
  modules: {}
});
