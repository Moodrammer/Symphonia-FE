<template>
  <v-footer app class="sound-player">
    <v-row>
      <v-col lg="4" md="4" sm="12" xs="12"> </v-col>

      <v-col lg="5" md="5" sm="5" xs="5">
        <div class="audio-controls">
          <!-- shuffle -->
          <a @click="signIn()" title="shuffle" style="margin-right: 20px;">
            <v-icon small class="icons">
              mdi-shuffle-variant
            </v-icon>
          </a>

          <!-- Previous -->
          <a @click="signIn()" title="Previous" style="margin-right: 10px;">
            <v-icon medium class="icons">
              mdi-skip-previous
            </v-icon>
          </a>
          <!-- Start and Pause -->
          <a @click="signIn()" style="width: 36px; height: 36px;">
            <v-icon large class="icons" title="play">
              mdi-play-circle-outline
            </v-icon>
          </a>

          <!-- Next -->
          <a @click="signIn()" title="Next" style="margin-left: 10px;">
            <v-icon medium class="icons">
              mdi-skip-next
            </v-icon>
          </a>

          <a @click="signIn()" title="Enable repeat" style="margin-left: 20px;">
            <v-icon small class="icons">
              mdi-repeat
            </v-icon>
          </a>
        </div>

        <v-toolbar flat color="rgba(0,0,0,0)" height="10">
          <!-- progress bar -->
          <span class="time" style="padding-right: 10px; margin-top:0px;"
            >00:00</span
          >

          <input
            type="range"
            min="0"
            max="0"
            value="0"
            @click="signIn()"
            class="hidden-sm-and-down"
          />

          <input
            type="range"
            min="0"
            max="0"
            value="0"
            @click="signIn()"
            class="progress-slider-sm hidden-md-and-up"
          />

          <!-- time -->
          <span class="time" style="padding-left: 10px; margin-top:0px;"
            >00:00</span
          >
        </v-toolbar>
      </v-col>

      <v-col lg="2" md="2" sm="7" xs="7" style="background: rgba(0, 0, 0, 0);">
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" style="bottom: 100px;">
      <span>Start listening with a free Symphonia account</span>

      <router-link to="/signup" style="text-decoration: none;">
        <v-btn color="green" text>
          sign up
        </v-btn>
      </router-link>

      <router-link to="/login" style="text-decoration: none;">
        <v-btn color="cyan" text min-width="20">
          log in
        </v-btn>
      </router-link>
    </v-snackbar>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false
    };
  },
  methods: {
    signIn: function() {
      this.snackbar = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

<style lang="scss" scoped>
//for sliders
@import "./slider.scss";

.volume-slider {
  max-width: 84px;
  width: -webkit-fill-available;
  width: -moz-available;
  margin-right: 0px;
}
</style>
