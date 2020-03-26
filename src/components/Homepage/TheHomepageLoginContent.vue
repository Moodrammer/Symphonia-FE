<template>
  <div class="wrap">
    <v-content
      app
      v-bind:class="{
        'hero-home-sm-cover': isXs(),
        'hero-home-bg-cover': !isXs()
      }"
    >
      <v-container style="padding-top:130px;">
        <v-row>
          <v-col md="10" offset-md="1" xs="12">
            <h1
              class="premium-header"
              v-bind:class="{
                'premium-header-sm': isSm(),
                'premium-header-xs': isXs()
              }"
            >
              Go Premium. Be happy.
            </h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="10" offset-md="1" xs="12" align="center">
            <router-link to="/download" class="download-button-large">
              start free trial
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-container class="large-content">
      <v-row justify="center">
        <h2
          class="looking-for-music-h2"
          v-bind:class="{
            'looking-for-music-sm': isSm(),
            'looking-for-music-md': isMd() || isLg(),
            'looking-for-music-xs': isXs()
          }"
        >
          Looking for music?
        </h2>
      </v-row>
      <v-row justify="center">
        <p class="lead">
          Pick up your recently played right where you left off.
        </p>
      </v-row>
      <v-row justify="center">
        <router-link to="/" class="listen-button">
          Listen on Spotify
        </router-link>
      </v-row>

      <v-container
        v-for="b in 2"
        :key="b"
        v-bind:class="{
          'cards-div-md': isMd(),
          'cards-div-lg': isLg(),
          'cards-div-sm': isSm()
        }"
        class="hidden-xs-only"
      >
        <v-content
          v-for="a in 3"
          :key="a"
          style="float: left; padding: 10px 10px 0px 0px;"
        >
          <v-hover v-slot:default="{ hover }" v-if="bestSixSongsLoaded">
            <router-link
              v-bind:to="bestSixSongs[a - 1 + 3 * (b - 1)].songLink"
              style="text-decoration: none;"
            >
              <v-card class="mx-auto" max-width="374">
                <v-img
                  aspect-ratio="1"
                  v-bind:src="bestSixSongs[a - 1 + 3 * (b - 1)].imageLink"
                  v-bind:class="{
                    'card-hover': hover,
                    'card-size-lg': isLg(),
                    'card-size-md': isMd(),
                    'card-size-sm': isSm()
                  }"
                >
                  <v-card-title v-if="hover">
                    <v-row justify="center" width="374">
                      <h2
                        class="song-name"
                        v-bind:class="{
                          'song-name-lg': isLg(),
                          'song-name-md': isMd(),
                          'song-name-sm': isSm()
                        }"
                      >
                        {{ bestSixSongs[a - 1 + 3 * (b - 1)].songName }}
                      </h2>
                    </v-row>
                  </v-card-title>
                  <v-card-title v-if="hover">
                    <v-row
                      justify="center"
                      style="padding: 0px; margin: 0px;"
                      class="singer-name"
                      v-bind:class="{
                        'singer-name-lg': isLg(),
                        'singer-name-md': isMd(),
                        'singer-name-sm': isSm()
                      }"
                    >
                      {{ bestSixSongs[a - 1 + 3 * (b - 1)].singerName }}
                    </v-row>
                  </v-card-title>
                  <v-card-title v-if="hover">
                    <v-row justify="center" class="play-now">
                      play now
                    </v-row>
                  </v-card-title>
                </v-img>
              </v-card>
            </router-link>
          </v-hover>
        </v-content>
      </v-container>

      <!-- this container is for preventing the next tag to be left floated into the previous tag -->
      <v-container style="clear: left;" class="hidden-xs-only"></v-container>

      <!-- slide group of cards in xs devices -->
      <v-slide-group class="pa-4 hidden-sm-and-up" v-if="bestSixSongsLoaded">
        <v-slide-item v-for="(song, index) in bestSixSongs" :key="index">
          <router-link v-bind:to="song.songLink" style="text-decoration: none;">
            <v-card
              class="mx-auto"
              max-width="344"
              style="padding-right: 20px;"
              flat
            >
              <v-img
                v-bind:src="song.imageLink"
                width="190px"
                aspect-ratio="1"
              ></v-img>

              <v-card-title class="song-name-xs">
                <v-row justify="center">
                  {{ song.songName }}
                </v-row>
              </v-card-title>

              <v-card-title class="singer-name-xs">
                <v-row justify="center">
                  {{ song.singerName }}
                </v-row>
              </v-card-title>

              <v-card-title class="play-now">
                <v-row justify="center">
                  play now
                </v-row>
              </v-card-title>
            </v-card>
          </router-link>
        </v-slide-item>
      </v-slide-group>
    </v-container>
  </div>
</template>

<script>
import getDeviceSize from "../getDeviceSize";
import axios from "axios";

/**
 * The homepage content after login.
 * @version 1.0.0
 */

export default {
  name: "HomepageLoginContent",

  components: {},

  data() {
    return {
      bestSixSongsLoaded: false,
      bestSixSongs: false
    };
  },

  mounted: function() {
    axios.get("/v1/bestsongs").then(response => {
      let list = response.data.data[0].attributes.songs;
      this.bestSixSongsLoaded = true;
      this.bestSixSongs = list;
    });
  },

  mixins: [getDeviceSize]
};
</script>

<style scoped>
.hero-home-sm-cover {
  background: url(http://localhost:8080/hero-hanging-man.png) no-repeat;
  margin-right: auto;
  margin-left: auto;
  width: 1170px;
  background-position: 140px -160px;
}

.hero-home-bg-cover {
  background: url(http://localhost:8080/hero-hanging-man.png) no-repeat;
  margin-right: auto;
  margin-left: auto;
  width: 1170px;
  min-height: 640px;
  background-position: right 3px top -55px;
}

.wrap {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  -webkit-box-direction: normal;
  color: #fff;
  box-sizing: border-box;
  background: radial-gradient(
    ellipse at center,
    #f6cb6c 0%,
    #f3c65d 0%,
    #f2ae54 100%
  );
}

.premium-header {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  text-align: center;
  box-sizing: border-box;
  margin: 0.5em 0 0.25em;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.15;
  font-size: 80px;
}

.premium-header-sm {
  font-size: 64px;
}

.premium-header-xs {
  font-size: 48px;
}

.download-button-large {
  line-height: 1.5;
  margin: 0;
  display: inline-block;
  border-radius: 500px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;
  background-color: #1aa34a;
  padding: 16px 48px 18px;
  margin-top: 16px;
  margin-bottom: 0;
  font: 700 14px Helvetica, Arial, sans-serif;
  transition-duration: 0.3s;
}

.download-button-large:hover {
  background-color: #1ed760;
}

.download-button-large:active {
  background-color: #1aa34a;
}

.large-content {
  min-width: 100%;
  background-color: white;
  color: black;
}

.looking-for-music-h2 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  text-align: center;
  box-sizing: border-box;
  margin: 0.5em 0 0.25em;
  font-family: inherit;
  color: inherit;
  margin-top: 24px;
  margin-bottom: 12px;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.looking-for-music-md {
  font-size: 48px;
}

.looking-for-music-sm {
  font-size: 40px;
}

.looking-for-music-xs {
  font-size: 32px;
}

.large-content p {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  -webkit-box-direction: normal;
  text-align: center;
  color: #000;
  box-sizing: border-box;
  margin: 0.5em 0 1em;
  margin-bottom: 24px;
  line-height: 1.4;
  font-size: 18px;
  font-weight: 400;
  padding-left: 15px;
  padding-right: 15px;
}

.listen-button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  display: inline-block;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  user-select: none;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  padding: 16px 48px 18px;
  transition-property: background-color, border-color, color, box-shadow, filter,
    -webkit-box-shadow, -webkit-filter;
  transition-duration: 0.3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  box-shadow: 0 0 0 2px #616467 inset;
  outline: 0;
  text-decoration: none;
  color: #616467;
  margin-bottom: 70px;
}

.listen-button:hover {
  background-color: #616467;
  color: white;
}

.listen-button:active {
  background-color: black;
  border-color: black;
  box-shadow: 0 0 0 2px black inset;
}

.song-name {
  font-family: inherit;
  font-weight: 900;
  letter-spacing: -0.015em;
  line-height: 1.3;
  color: #fff;
  padding: 0px;
}

.song-name-lg {
  font-size: 32px;
  margin-top: 140px;
}

.song-name-md {
  font-size: 24px;
  margin-top: 100px;
}

.song-name-sm {
  font-size: 18px;
  margin-top: 80px;
}

.song-name-xs {
  font-size: 18px;
  font-weight: 700;
  color: #919496;
  font-family: Helvetica, Arial, sans-serif;
  padding-bottom: 0px;
}

.play-now {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  color: #1ed760;
}

.card-hover {
  filter: brightness(50%);
}

.card-size-lg {
  width: 374px;
}

.card-size-md {
  width: 300px;
}

.card-size-sm {
  width: 250px;
}

.cards-div-lg {
  width: 1200px;
  max-width: 1200px;
}

.cards-div-md {
  width: 970px;
  max-width: 970px;
}

.cards-div-sm {
  width: 804px;
  max-width: 804px;
}

.singer-name {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  list-style-type: none;
  visibility: visible;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  font-family: inherit;
  line-height: 1.1;
  margin: 0.5em 0 1em;
  font-weight: 400;
  color: #919496;
}

.singer-name-lg {
  font-size: 18px;
}

.singer-name-md {
  font-size: 16px;
}

.singer-name-sm {
  font-size: 14px;
}

.singer-name-xs {
  font-family: Helvetica, Arial, sans-serif;
  margin: 0.5em 0 1em;
  font-weight: 400;
  font-size: 16px;
  color: #c1c3c6;
  padding: 0px;
  margin: 0px;
}
</style>
