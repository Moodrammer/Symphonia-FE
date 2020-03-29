import Vue from "vue";
import Vuex from "vuex";
//import client from "api-client";
import user from "./modules/user";
import playlist from "./modules/playlist";
import track from "./modules/track";
import player from "./modules/player";
import webplayerHome from "./modules/webplayerHome";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playlist,
    user,
    track,
    player,
    webplayerHome
  }
});
