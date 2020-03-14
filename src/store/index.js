import Vue from "vue";
import Vuex from "vuex";
import client from "api-client";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    getClient(){        //just a dummy function to prevent (( 'client' is defined but never used )) error
      return client;   //anyone is welcomed to remove this function after implementing any other function that uses 'client'.
    }
  },
  modules: {}
});
