import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import playlist from "./modules/playlist";
import track from "./modules/track";
import category from "./modules/category";
import album from "./modules/album";
import artist from "./modules/artist";
import userPublicProfile from "./modules/userPublicProfile";
import homepage from "./modules/homepage";
import notification from "./modules/notification";
import search from "./modules/search";
import webplayerHome from "./modules/webplayerHome";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playlist,
    user,
    userPublicProfile,
    track,
    category,
    album,
    artist,
    homepage,
    notification,
    search,
    webplayerHome
  }
});
