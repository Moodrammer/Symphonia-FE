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
// axios.defaults.baseURL = "https://thesymphonia.ddns.net/api";

//intializing the facebook sdk ////////////////////////////////////////////////////////////////
//funtion taken from https://github.com/adi518/vue-facebook-login-component/blob/master/packages/vue-facebook-login-component/src/Sdk.js
function initSdk(options) {
  return new Promise(resolve => {
    // prettier-ignore
    window.fbAsyncInit = function() {
      window.FB.init(options)
      resolve(window.FB)
    }; // eslint-disable-line
    /* eslint-disable */
    // prettier-ignore
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    /* eslint-enable */
  });
}

function initializeFacebookSDk() {
  initSdk({
    appId: "820827945085597",
    xfbml: true, // Parse social plugins on this webpage.
    version: "v7.0" // Use this Graph API version for this call.
  });
}

initializeFacebookSDk()
//////////////////////////////////////////////////////////////////////////////////////////////////

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
