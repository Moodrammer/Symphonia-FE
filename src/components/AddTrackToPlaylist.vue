<template>
  <v-dialog fullscreen v-model="dialog" @keydown.esc="close">
    <v-card
      align="center"
      color="rgb(0,0,0,0.9)"
      class="white--text justify-content-center"
    >
      <!--A button for closing the popup-->
      <v-btn fab color="rgb(0,0,0,0)" @click="close" id="closeIcon" depressed>
        <v-icon color="white" large>mdi-close</v-icon>
      </v-btn>

      <h1 class="display-3 font-weight-bold mt-10 mb-6">
        Add to playlist
      </h1>

      <!--Create playlist to add the track to it-->
      <v-btn
        class="white--text popbutton px-8 mb-12"
        rounded
        @click="create"
        id="create"
        >New Playlist
      </v-btn>

      <!--Display the user's owned playlists-->
      <v-row class="ml-4">
        <v-card
          v-for="(playlist, index) in playlists"
          :key="playlist.id"
          class="ma-2 white--text"
          color="transparent"
          @mouseover="imageHover(index)"
          @mouseleave="hoverIndex = null"
        >
          <v-img
            :src="playlist.images[0]"
            id="playlistPhoto"
            @click="add(playlist.id)"
          >
            <v-overlay absolute opacity="0.8" v-show="hoverIndex === index">
              <v-icon large color="white">
                mdi-music-note-plus
              </v-icon>
            </v-overlay>
          </v-img>
          <p class="mt-2 font-weight-bold">
            {{ playlist.name }}
          </p>
        </v-card>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import getDeviceSize from "../mixins/getDeviceSize";
import getuserToken from "../mixins/userService";
import getuserID from "../mixins/userService";

/**
 * @displayName Add track to Playlist
 * @example [none]
 */
export default {
  data: function() {
    return {
      dialog: null,
      hoverIndex: null
    };
  },
  created() {
    this.dialog = this.$store.state.playlist.addTrack;
    this.$store.dispatch("playlist/getOwnedPlaylists", this.getuserToken());
  },
  computed: {
    playlists() {
      return this.$store.state.playlist.ownedPlaylists;
    }
  },
  methods: {
    /**
     * Gets called when the user clicks on the cancel button or the close icon or press esc
     * @public This is a public method
     * @param {none}
     */
    close: function() {
      this.$store.commit("playlist/changeAddTrackModel");
      this.dialog = false;
    },
    /**
     * Gets called when the user clicks on create playlist to add the track to a new playlist
     * @public This is a public method
     * @param {none}
     */
    create: function() {
      this.$store.commit("playlist/createWithTrackModel");
      this.$store.commit("playlist/changeCreateModel");
    },

    /**
     * Set the index of the hovered playlist
     * @public This is a public method
     * @param {Number} itemIndex
     */
    imageHover: function(itemIndex) {
      this.hoverIndex = itemIndex;
    },
    /**
     * Gets called when the user choose a playlist to add the track to
     * @public This is a public method
     * @param {String} choosedPlaylistID the ID of the playlist to which the user adds the track
     */
    add: function(choosedPlaylistID) {
      this.$store.dispatch("playlist/addTrackToPlaylist", {
        playlistID: choosedPlaylistID,
        token: this.getuserToken()
      });
      this.$store.commit("playlist/changeAddTrackModel");
      this.dialog = false;
    }
  },
  mixins: [getDeviceSize, getuserToken, getuserID]
};
</script>

<style scoped>
#create {
  color: #fff;
  background-color: #1aa34a;
  border-width: 0;
  border-radius: 500px;
}

#create:hover {
  background-color: #1ed760;
  transform: scale(1.05, 1.05);
}

#closeIcon {
  margin-top: 30px;
}

#playlistPhoto {
  width: 220px;
  height: 220px;
}
</style>
