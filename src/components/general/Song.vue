<template>
  <v-list-item
    class="my-2 songItem pa-3"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <v-icon
      class="mr-2 pb-9"
      v-if="hover && !disabled"
      v-bind:class="{ enabled: !playing, playing: playing }"
      >mdi-play</v-icon
    >
    <v-icon
      class="mr-2 pb-9"
      v-bind:class="{
        'disabled-1': disabled,
        enabled: !disabled && !playing,
        playing: playing
      }"
      v-else
    >
      mdi-music-note-eighth
    </v-icon>
    <v-list-item-title
      class="draweritem"
      v-bind:class="{
        'disabled-1': disabled,
        'white--text': !disabled && !playing,
        playing: playing
      }"
    >
      {{ songName }}
      <v-list-item-subtitle class="mt-3 pl-3 white--text">
        <!--Display the artist and the album/playlist name-->
        <v-row>
          <p class="subtitle mr-2" v-bind:class="{ 'disabled-2': disabled }">
            artistName
          </p>
          <p>.</p>
          <p v-bind:class="{ 'disabled-2': disabled }" class="subtitle ml-2">
            albumName
          </p>
        </v-row>
      </v-list-item-subtitle>
      <!--To make the next elements start from the end-->
      <v-spacer></v-spacer>
    </v-list-item-title>

    <v-menu offset-x>
      <template v-slot:activator="{ on }">
        <!--Icon to activate the menu-->
        <div v-on="on" v-on:click="checkLiked" id="enableMenu">
          <v-icon color="white" class="mx-2" v-if="hover" id="menu">
            mdi-dots-horizontal
          </v-icon>
        </div>
      </template>

      <!--Menu list-->
      <v-list color="#282828" dark class="mt-3 white--text">
        <v-list-item>
          <v-list-item-title class="draweritem">
            Start Radio
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-if="!liked" @click="likeSong" id="saveTrack">
          <v-list-item-title class="draweritem">
            Save to your Liked Songs
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-if="liked" @click="deleteSong" id="removeTrack">
          <v-list-item-title class="draweritem">
            Remove from your Liked Songs
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title class="draweritem">
            Add to Queue
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title class="draweritem">
            Add to Playlist
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title class="draweritem">
            Copy Song Link
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <p class="white--text ml-12">{{ min }}:{{ sec }}</p>
    <v-snackbar v-model="snackbar" style="bottom: 100px;">
      <span>Start listening with a free Symphonia account</span>

      <router-link to="/signup" style="text-decoration: none;">
        <v-btn color="green" text id="snackbarSignup">
          sign up
        </v-btn>
      </router-link>

      <router-link to="/login" style="text-decoration: none;">
        <v-btn color="cyan" text min-width="20" id="snackbarLogin">
          log in
        </v-btn>
      </router-link>
    </v-snackbar>
  </v-list-item>
</template>

<script>
import { mapState } from "vuex";
import getuserToken from "../../mixins/userService";
import isLoggedIn from "../../mixins/userService";
/**
 * Song component contains the track name , duration , artist's name , album's name
 * @example [none]
 */
export default {
  props: {
    songName: String,
    artistName: String,
    albumName: String,
    duration: Number,
    id: String,
    disabled: {
      type: Boolean,
      default: false
    },
    playing: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      hover: "false",
      min: 0,
      sec: 0,
      snackbar: false
    };
  },
  created() {
    this.hover = false;
    this.convert(this.$props.duration);
  },
  methods: {
    /**
     * Convert the duration from ms to minutes and seconds
     * @public This is a public method
     * @param {Number} val the duration in ms
     */
    convert: function(val) {
      this.min = Math.floor((val / 1000 / 60) << 0);
      this.sec = Math.floor((val / 1000) % 60);
    },
    /**
     * Function to remove this song from user's the saved tracks
     * @public This is a public method
     * @param {none}
     */
    deleteSong: function() {
      if (this.isLoggedIn()) {
        this.$store.dispatch("track/removeSavedTrack", {
          id: [this.id],
          token: this.getuserToken()
        });
        this.$root.$emit("updateContent");
      } else {
        this.snackbar = true;
      }
    },
    /**
     * Function to check if the user saves this song or not , gets called at the menu click
     * @public This is a public method
     * @param {none}
     */
    checkLiked: function() {
      this.$store.dispatch("track/checkSaved", {
        id: this.id,
        token: this.getuserToken()
      });
    },
    /**
     * Function to save a track for user
     * @public This is a public method
     * @param {none}
     */
    likeSong: function() {
      if (this.isLoggedIn()) {
        this.$store.dispatch("track/saveTrack", {
          id: [this.id],
          token: this.getuserToken()
        });
      } else {
        this.snackbar = true;
      }
    }
  },
  computed: mapState({
    liked: state => state.track.generalLiked
  }),
  mixins: [getuserToken, isLoggedIn]
};
</script>

<style>
.subtitle {
  opacity: 0.6;
}

.subtitle:hover {
  opacity: 1;
  cursor: pointer;
  text-decoration: underline;
}

.songItem:hover {
  background-color: #282828;
}

.enabled {
  color: white !important;
}

.disabled-1 {
  color: #b3b3b3 !important;
}

.disabled-2 {
  color: #b3b3b3 !important;
  opacity: 0.6;
}

.playing {
  color: green !important;
}
</style>
