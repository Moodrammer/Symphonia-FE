<template>
  <v-dialog fullscreen v-model="dialog" @keydown.esc="close">
    <v-card align="center" color="rgb(0,0,0,0.9)" class="white--text ">
      <v-container class="pt-12">
        <v-card
          color="rgb(153, 204, 255)"
          max-height="428"
          max-width="810"
          id="card"
        >
          <v-row>
            <v-col lg="6" sm="6" md="6" cols="12" class="mt-6 pa-0">
              <v-container class="ma-0 pa-0">
                <v-img
                  src="../../../public/s11.png"
                  class="mt-6"
                  v-bind:class="{
                    'xsmall-img': isXs(),
                    'small-img': isSm(),
                    'lg-img': isLg() || isMd()
                  }"
                >
                </v-img>
              </v-container>
            </v-col>
            <v-col lg="6" sm="6" md="6" class="pr-3 mt-5">
              <v-row justify="center">
                <h2
                  class="white--text font-weight-black mr-1"
                  v-bind:class="{
                    'small-header': isSm(),
                    'xsmall-header': isXs(),
                    'lg-header': isLg() || isMd()
                  }"
                >
                  Continue with a free
                </h2>
                <h2
                  class="white--text font-weight-black"
                  v-bind:class="{
                    'small-header': isSm(),
                    'xsmall-header': isXs(),
                    'lg-header': isLg() || isMd()
                  }"
                >
                  Symphonia account..?
                </h2>
              </v-row>
              <v-row justify="center">
                <v-btn
                  id="signUp"
                  class="white--text px-12 mt-5 mb-5"
                  rounded
                  to="/signup"
                  >SIGN UP FREE</v-btn
                >
              </v-row>
              <v-row justify="center" class="white--text">
                <p class="mr-2">Already have an account?</p>
                <router-link to="/login" class="white--text">
                  <h4 id="login">LOG IN</h4>
                </router-link>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-btn outlined class="white--text mb-2" id="close" @click="close"
              >Close</v-btn
            >
          </v-row>
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import getDeviceSize from "../../mixins/getDeviceSize";
export default {
  data: function() {
    return {
      dialog: true
    };
  },
  methods: {
    /**
     * Gets called when the user clicks on the close button or press esc
     * @public This is a public method
     * @param {none}
     */
    close: function() {
      this.$store.commit("webplayerHome/toggleLogoutPopUpState");
      this.dialog = false;
    }
  },
  destroyed: function() {
    this.close();
  },
  mixins: [getDeviceSize]
};
</script>

<style scoped>
#signUp {
  color: #fff;
  background-color: #1db954;
  border-width: 0;
}
#signUp:hover {
  background-color: #1ed760;
}
#card {
  margin-top: 90px;
  background-image: linear-gradient(-20deg, #616161 0%, #9bc5c3 100%);
}
#close {
  border-width: 0;
  text-decoration: none;
}
#close:before {
  background-color: rgba(0, 0, 0, 0);
}

.lg-img {
  height: 260px;
  width: 260px;
}
.xsmall-img {
  height: 92px;
  width: 90px;
}
.small-img {
  height: 220px;
  width: 220px;
}
.xsmall-header,
.small-header {
  font-size: 16px;
}
.lg-header {
  font-size: 35px;
}
a {
  text-decoration: none;
}
#login:hover {
  transform: scale(1.05, 1.05);
}
</style>
