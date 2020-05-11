<template>
  <v-dialog fullscreen v-model="dialog" @keydown.esc="close">
    <v-card align="center" color="rgb(0,0,0,0.9)" class="white--text ">
      <v-container class="pt-12">
        <v-card
          color="rgb(153, 204, 255)"
          max-height="428"
          max-width="810"
          min-height="380"
          id="card"
        >
          <v-row>
            <v-col lg="6" sm="6" md="6" cols="12" class="mt-6 pa-0">
              <v-container class="ma-0 pa-0">
                <v-img
                  src="../../../public/s11.png"
                  max-height="300"
                  max-width="300"
                  class="mt-6"
                  :aspect-ratio="9 / 16"
                >
                </v-img>
              </v-container>
            </v-col>
            <v-col lg="6" sm="6" md="6" class="pr-3 mt-8">
              <h2 class="white--text font-weight-black display-3 mt-3 mr-3">
                Enjoying
              </h2>
              <h2 class="white--text font-weight-black display-3 mt-3 mr-3">
                Symphonia..?
              </h2>
              <h2 class="white--text font-weight-bold mt-3 mr-3">
                Become one of our premium members today.
              </h2>
              <v-btn
                id="premium"
                class="white--text px-6 mt-5 mb-5 mr-6"
                rounded
                to="/premium/?checkout=false"
                >Get Premium</v-btn
              >
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
  }
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
</style>
