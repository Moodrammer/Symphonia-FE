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
            <v-col lg="6" sm="6" md="6" class="pr-3 mt-8">
              <v-row justify="center">
                <h2
                  class="white--text font-weight-black mt-3 mr-2"
                  v-bind:class="{
                    'small-header': isSm(),
                    'xsmall-header': isXs(),
                    'lg-header': isLg() || isMd()
                  }"
                >
                  Enjoying
                </h2>
                <h2
                  class="white--text font-weight-black mt-3"
                  v-bind:class="{
                    'small-header': isSm(),
                    'xsmall-header': isXs(),
                    'lg-header': isLg() || isMd()
                  }"
                >
                  Symphonia..?
                </h2>
              </v-row>
              <h2
                class="white--text font-weight-bold mt-3 mr-3"
                v-bind:class="{
                  'small-header2': isSm(),
                  'xsmall-header2': isXs()
                }"
              >
                Become one of our premium members today.
              </h2>
              <v-row justify="center">
                <v-btn
                  id="premium"
                  class="white--text px-6 mt-5 mb-5"
                  rounded
                  to="/premium/?checkout=false"
                  >Get Premium</v-btn
                >
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
/**
 * @displayName Ads Pop Up
 * @example [none]
 */
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
      this.$store.commit("playlist/changeAdsPopup");
      this.dialog = false;
    }
  },
  mixins: [getDeviceSize]
};
</script>

<style scoped>
#premium {
  color: #fff;
  background-color: #1db954;
  border-width: 0;
}
#premium:hover {
  background-color: #1ed760;
}
#card {
  margin-top: 90px;
  background-image: linear-gradient(-225deg, #cbbacc 0%, #2580b3 100%);
}
#close {
  border-width: 0;
  text-decoration: none;
}
#close:before {
  background-color: rgba(0, 0, 0, 0);
}

.lg-img {
  height: 300px;
  width: 300px;
}
.xsmall-img {
  height: 95px;
  width: 95px;
}
.small-img {
  height: 220px;
  width: 220px;
}
.small-header,
.xsmall-header {
  font-size: 25px;
}
.small-header2,
.xsmall-header2 {
  font-size: 20px;
}
.lg-header {
  font-size: 50px;
}
</style>
