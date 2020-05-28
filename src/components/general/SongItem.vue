<template>
  <v-list-item
    class="my-2 songItem pa-3"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @contextmenu.prevent="menuClick($event, ID)"
  >
  
    <!--The song's icons-->
    <v-icon
      class="mr-2 pb-9"
      v-if="hover && !isDisabled"
      v-bind:class="{ enabled: !isPlaying, playing: isPlaying }"
      >mdi-play</v-icon
    >

    <v-icon
      class="mr-2 pb-9"
      v-bind:class="{
        'disabled-1': isDisabled,
        enabled: !isDisabled && !isPlaying,
        playing: isPlaying
      }"
      v-else
    >
      mdi-music-note-eighth</v-icon
    >

    <!--Display the song image -->
    <v-list-item-avatar v-if="image" class="mx-4" tile size="70">
      <img :src="image" />
    </v-list-item-avatar>

    <!--Display the song data -->
    <v-list-item-title
      class="draweritem"
      v-bind:class="{
        'disabled-1': isDisabled,
        'white--text': !isDisabled && !isPlaying,
        playing: isPlaying
      }"
    >
      {{ songName }}

      <v-list-item-subtitle class="mt-3 pl-3 white--text">
        <!--Display the artist and the album/playlist name-->
        <v-row>
          <p class="subtitle mr-2" v-bind:class="{ 'disabled-2': isDisabled }">
            {{ artistName }}
          </p>

          <p v-if="!isAlbum">.</p>
          <router-link
            v-bind:to="'/webhome/album/' + this.albumID"
            class="white--text"
          >
            <p
              v-bind:class="{ 'disabled-2': isDisabled }"
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
      v-bind:class="{ 'disabled-2': isDisabled }"
      @mousedown.prevent="menuClick($event, ID)"
    >
      mdi-dots-horizontal
    </v-icon>

    <!--Display the song's duration-->
    <p class="white--text ml-12" v-bind:class="{ 'disabled-2': isDisabled }">
      {{ min }}:{{ sec }}
    </p>
  </v-list-item>
</template>

<script>
import getuserToken from "../../mixins/userService/getUserToken";
import isLoggedIn from "../../mixins/userService/isLoggedIn";
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
    isPlaying: {
      type: Boolean,
      default: false
    },
    contextMenu: {}
  },
  data: function() {
    return {
      hover: "false",
      min: 0,
      sec: 0
    };
  },
  created() {
    this.hover = false;
    this.convert(this.$props.songDuration);
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
    }
  },
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
