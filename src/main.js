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
//axios.defaults.baseURL = "http://localhost:3000/api"
//axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODJhNDgwNTQ2NjA2NzJmZDY5OTg4MyIsImlhdCI6MTU4NTg3NzMxOCwiZXhwIjoxNTg1ODgwOTE4fQ.6AylaCVfdT-M-BXyPik_Xc7DPJd_Os9W2fUnmKhovEA";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
