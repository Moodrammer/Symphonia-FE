import Vue from "vue";
import Vuex from "vuex";
//import client from "api-client";
import user from "./modules/user";
import playlist from "./modules/playlist";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playlist,
    user
  }
});
