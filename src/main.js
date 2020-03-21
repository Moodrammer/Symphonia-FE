import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { makeServer } from "./server";

Vue.config.productionTip = false;

//Enabling the mock server to intercept your requests when in development mode
//The NODE_ENV can be either development | test | Production according to the vue-cli-service used to run the application
if (process.env.NODE_ENV === "development") {
  makeServer();
}

//configure axios base url
axios.defaults.baseURL = "/api";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
