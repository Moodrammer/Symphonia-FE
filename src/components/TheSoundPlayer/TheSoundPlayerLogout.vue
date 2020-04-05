<template>
  <v-footer app class="sound-player">
    <v-row>
      <v-col cols="4">
      </v-col>

      <v-col cols="5">
        <div class="audio-controls">
          <!-- shuffle -->
          <a
            @click="signIn()"
            title="shuffle"
            style="margin-right: 20px;"
          >
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
          <a
            @click="signIn()"
            style="width: 36px; height: 36px;"
          >
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

          <a
            @click="signIn()"
            title="Enable repeat"
            style="margin-left: 20px;"
          >
            <v-icon small class="icons">
              mdi-repeat
            </v-icon>
          </a>
        </div>

        <v-toolbar flat color="rgba(0,0,0,0)" height="10">
          <!-- progress bar -->
          <span class="time" style="padding-right: 10px; margin-top:0px;">00:00</span>

          <input
            type="range"
            min="0"
            max="0"
            value="0"
            @click="signIn()"
          />

          <!-- time -->
          <span class="time" style="padding-left: 10px; margin-top:0px;">00:00</span>
        </v-toolbar>
      </v-col>

      <v-spacer></v-spacer>
      <v-col cols="2" style="background: rgba(0, 0, 0, 0);"></v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  methods: {
    signIn: function() {
      console.log("sign in please")
    }
  }
}
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
