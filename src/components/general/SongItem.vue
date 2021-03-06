<template>
  <v-list-item
    class="my-2 songItem pa-3"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @contextmenu.prevent="menuClick($event, ID)"
  >
    <!--The song's icons-->
    <v-icon
      v-if="!isPaused"
      class="mr-2 pb-9"
      v-bind:class="{ enabled: !isPlaying, playing: isPlaying }"
      @click="pauseTrack"
      id="pauseIcon"
    >
      mdi-pause
    </v-icon>
    <v-icon
      class="mr-2 pb-9"
      v-else-if="hover && !disabledTrack"
      v-bind:class="{ enabled: !isPlaying, playing: isPlaying }"
      @click="playTrack"
      id="playIcon"
      >mdi-play</v-icon
    >

    <v-icon
      class="mr-2 pb-9"
      v-bind:class="{
        'disabled-1': disabledTrack,
        enabled: !disabledTrack && !isPlaying,
        playing: isPlaying
      }"
      v-else
      id="noteEight"
    >
      mdi-music-note-eighth</v-icon
    >

    <!--Display the song image -->
    <v-list-item-avatar
      v-if="image && (isLg() || isMd() || isSm())"
      class="mx-4"
      tile
      size="70"
    >
      <img :src="image" />
    </v-list-item-avatar>

    <!--Display the song data -->
    <v-list-item-title
      class="draweritem"
      v-bind:class="{
        'disabled-1': disabledTrack,
        'white--text': !disabledTrack && !isPlaying,
        playing: isPlaying
      }"
    >
      {{ songName }}

      <v-list-item-subtitle class="mt-3 pl-3 white--text">
        <!--Display the artist and the album/playlist name-->
        <v-row>
          <router-link
            v-bind:to="'/webhome/artist/' + this.artistID"
            class="white--text"
          >
            <p
              class="subtitle mr-2"
              v-bind:class="{ 'disabled-2': disabledTrack }"
              id="routeToArtist"
            >
              {{ artistName }}
            </p>
          </router-link>
          <p v-if="!isAlbum && (isLg() || isMd() || isSm())">.</p>
          <router-link
            v-bind:to="'/webhome/album/' + this.albumID"
            class="white--text"
            v-if="isLg() || isMd() || isSm()"
          >
            <p
              v-bind:class="{ 'disabled-2': disabledTrack }"
              class="subtitle ml-2"
              v-if="!isAlbum"
              id="routeToAlbum"
            >
              {{ albumName }}
            </p>
          </router-link>
        </v-row>
      </v-list-item-subtitle>

      <!--To make the next elements start from the end-->
      <v-spacer></v-spacer>
    </v-list-item-title>

    <!--the song's menu activator-->
    <v-icon
      color="white"
      class="mx-2"
      v-if="hover"
      id="menu"
      v-bind:class="{ 'disabled-2': disabledTrack }"
      @click.stop="menuClick($event, ID)"
    >
      mdi-dots-horizontal
    </v-icon>

    <!--Display the song's duration-->
    <p class="white--text ml-12" v-bind:class="{ 'disabled-2': disabledTrack }">
      {{ min }}:{{ sec }}
    </p>
  </v-list-item>
</template>

<script>
import getuserToken from "../../mixins/userService/getUserToken";
import isLoggedIn from "../../mixins/userService/isLoggedIn";
import isPremium from "../../mixins/userService/isPremium";
import getDeviceSize from "../../mixins/getDeviceSize";
/**
 * Song component contains the track name , duration , artist's name , album's name
 * @displayName Song Item
 * @example [none]
 */
export default {
  props: {
    songName: String,
    artistName: String,
    albumName: String,
    albumID: String,
    image: String,
    artistID: String,
    songDuration: Number,
    playlistID: String,
    isAlbum: {
      type: Boolean,
      default: false
    },
    ownedPlaylist: {
      type: Boolean,
      default: true
    },
    ID: String,
    isDisabled: {
      type: Boolean,
      default: false
    },
    contextType: String,
    contextID: String,
    contextMenu: {},
    isNextInQueue: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      hover: "false",
      min: 0,
      sec: 0,
      disabledTrack: null
    };
  },
  created() {
    this.hover = false;
    this.convert(this.$props.songDuration);
    this.disabledTrack =
      (this.$props.isDisabled && !this.isPremium()) ||
      this.$props.isNextInQueue;
  },
  computed: {
    isPlaying() {
      return this.ID == this.$store.state.track.trackId;
    },
    isPaused() {
      if (this.isPlaying) return this.$store.state.track.isTrackPaused;
      else return true;
    },
    currentContextID() {
      return this.$store.state.track.contextID;
    }
  },
  methods: {
    /**
     * Convert the duration from milliseconds to minutes and seconds
     * @public This is a public method
     * @param {Number} durationMS the duration in ms
     */
    convert: function(durationMS) {
      this.min = Math.floor((durationMS / 1000 / 60) << 0);
      this.sec = Math.floor((durationMS / 1000) % 60);
    },

    /**
     * Function to set the right click menu data
     * @public This is a public method
     * @param {Event} event the event type
     * @param {String} trackID
     */
    menuClick(event, trackID) {
      this.$props.contextMenu.event = event;
      this.$props.contextMenu.id = trackID;
      this.$props.contextMenu.type = "track";
    },
    /**
     * Gets called when the user clicks on play icon on a specific song
     * @public This is a public method
     * @param {none}
     */
    playTrack: async function() {
      if (
        !this.isPlaying ||
        (this.isPlaying && this.contextID != this.currentContextID)
      ) {
        this.$store.commit("track/setContextData", {
          contextID: this.contextID,
          contextType: this.contextType,
          contextUrl: "https://thesymphonia.ddns.net/api"
        });
        await this.$store.dispatch("track/playTrackInQueue", this.ID);
        await this.$store.dispatch("track/getTrackInformation", {
          token: "Bearer " + this.getuserToken(),
          trackId: this.ID
        });
        await this.$store.dispatch(
          "track/updateQueue",
          "Bearer " + this.getuserToken()
        );
      } else {
        this.$store.dispatch("track/togglePauseAndPlay");
      }
      this.$store.commit("track/setIsTrackPaused", this.isPaused);
    },
    /**
     * Gets called when the user clicks on pause icon on the currently playing song
     * @public This is a public method
     * @param {none}
     */
    pauseTrack: function() {
      this.$store.dispatch("track/togglePauseAndPlay");
      this.$store.commit("track/setIsTrackPaused", this.isPaused);
    }
  },
  mixins: [getuserToken, isLoggedIn, isPremium, getDeviceSize]
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
  opacity: 0.6;
}

.disabled-2 {
  color: #b3b3b3 !important;
  opacity: 0.5;
}

.playing {
  color: green !important;
}

a {
  text-decoration: none;
}
</style>
