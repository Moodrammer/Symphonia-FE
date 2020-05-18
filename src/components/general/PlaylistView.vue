<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="pt-0">
      <v-row
        justify="center"
        align-content="center"
        v-if="isLoading"
        class="centering"
      >
        <pulse-loader
          :loading="isLoading"
          color="white"
          size="20px"
        ></pulse-loader>
      </v-row>
      <v-row justify="center" v-else>
        <v-col lg="4" sm="12" md="12" cols="12" class="pr-10">
          <v-container class="pt-0">
            <v-row justify-lg="center">
              <v-col
                lg="12"
                md="3"
                sm="5"
                xs="2"
                cols="12"
                v-bind:class="{
                  'small-col': isSm() || isXs() || isMd(),
                  'lg-col': isLg()
                }"
              >
                <!--The playlist's image-->
                <v-card
                  elevation="9"
                  color="trasparent"
                  v-bind:class="{
                    'small-card': isSm() || isXs() || isMd(),
                    'lg-card': isLg()
                  }"
                >
                  <v-img
                    :src="playlist.images[0]"
                    id="playPhoto"
                    @mouseover="hover = true"
                    @mouseleave="hover = false"
                    @contextmenu.prevent="menuClick($event)"
                    elevation="12"
                    v-bind:class="{
                      'lg-img': isLg(),
                      'sm-img': isSm() || isXs() || isMd()
                    }"
                  >
                    <!--Overlay for the button that is showed at hover-->
                    <v-overlay
                      v-show="hover"
                      class="overlay"
                      absolute
                      opacity="0.8"
                    >
                      <v-btn
                        fab
                        outlined
                        color="white"
                        id="playIcon"
                        @click="iconClick = !iconClick"
                      >
                        <v-icon large color="white" v-if="iconClick">
                          mdi-pause
                        </v-icon>
                        <v-icon large color="white" v-else>mdi-play</v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-img>
                </v-card>
              </v-col>

              <!-- Display the playlist's name - owner's name - number of songs-->
              <v-col lg="12" md="8" sm="7" xs="1" cols="12">
                <v-row
                  justify-lg="center"
                  @contextmenu.prevent="menuClick($event)"
                >
                  <h1 class="mt-5">{{ playlist.name }}</h1>
                </v-row>
                <v-row justify-lg="center">
                  <p class="mt-1" style="opacity:0.4">
                    {{ playlist.owner.name }}
                  </p>
                </v-row>

                <!--The play button-->
                <v-row justify-lg="center" class="mt-1">
                  <v-btn
                    rounded
                    class="white--text px-8"
                    id="playBtn"
                    @click="play"
                    v-if="playlist.tracksCount"
                  >
                    Play
                  </v-btn>
                  <v-btn
                    v-else
                    rounded
                    class="white--text px-8"
                    id="playBtnDisabled"
                    disabled
                  >
                    Play
                  </v-btn>
                </v-row>

                <!--Follow/Unfollow playlist-->
                <v-row justify-lg="center" class="mt-4">
                  <div v-if="!owned">
                    <v-icon
                      color="white"
                      @click="followPlaylist"
                      id="followIcon"
                      v-if="!followed"
                      class="mr-3"
                      >mdi-heart-outline</v-icon
                    >

                    <v-icon
                      color="success"
                      id="unfollowIcon"
                      @click="unfollowPlaylist"
                      v-else
                      class="mr-3"
                      >mdi-heart</v-icon
                    >
                  </div>

                  <!--Icon to activate the menu-->
                  <v-icon
                    color="white"
                    class="mx-2"
                    id="menuDots"
                    @mousedown.prevent="menuClick($event)"
                  >
                    mdi-dots-horizontal
                  </v-icon>
                </v-row>
                <v-row justify-lg="center">
                  <h5 class="mr-2 mt-2">{{ playlist.tracksCount }}</h5>
                  <h5 class="mr-2 mt-2">SONGS</h5>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <!--Display the Songs -->
        <v-col lg="8" sm="12" md="12">
          <!--this divider will be shown at the small screen sizes only-->
          <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>

          <v-list color="transparent">
            <!--Nesting the song component-->
            <div v-if="tracks">
              <SongItem
                v-for="track in tracks"
                :key="track.name"
                :songName="track.name"
                :albumName="track.album.name"
                :albumID="track.album._id"
                :artistName="track.artist.name"
                :artistID="track.artist._id"
                :songDuration="track.durationMs"
                :ownedPlaylist="owned"
                :ID="track._id"
                :isDisabled="track.premium"
                :contextMenu="contextMenu"
              />
            </div>
          </v-list>

          <!--The empty playlist view-->
          <div v-if="!playlist.tracksCount" class="white--text ">
            <v-row justify="center" class="my-5">
              <v-icon color="white" large>mdi-camera-outline</v-icon>
            </v-row>
            <v-row justify="center" class="my-5">
              <h1>It's a bit empty here...</h1>
            </v-row>
            <v-row justify="center" class="my-5">
              <p>Let's find some songs for your playlist</p>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import SongItem from "./SongItem";
import getDeviceSize from "../../mixins/getDeviceSize";
import getuserToken from "../../mixins/userService";
import getuserID from "../../mixins/userService";
import isLoggedIn from "../../mixins/userService";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
/**
 * @displayName Playlist View
 * @example [none]
 */
export default {
  components: {
    SongItem,
    PulseLoader
  },
  data: function() {
    return {
      hover: false,
      iconClick: false,
      id: this.$route.params.id,
      disable: false
    };
  },
  methods: {
    /**
     * Gets called when the user clicks on the play button to play the playlist\album
     * @public This is a public method
     * @param {none}
     */
    play: function() {},

    /**
     *Function to follow this playlist,gets called when the user clicks on white heart icon
     * @public This is a public method
     * @param {none}
     */
    followPlaylist: function() {
      this.$store.dispatch("playlist/followPlaylist", {
        id: this.id,
        token: this.getuserToken()
      });
    },

    /**
     *Function to unfollow this playlist,gets called when the user clicks on green heart icon
     * @public This is a public method
     * @param {none}
     */
    unfollowPlaylist: async function() {
      await this.$store.dispatch("playlist/unfollowPlaylist", {
        id: this.id,
        token: this.getuserToken()
      });
    },

    /**
     * Function to set the right click menu data
     * @public This is a public method
     * @param {Event} event the event type
     */
    menuClick(event) {
      this.$props.contextMenu.event = event;
      this.$props.contextMenu.id = this.$route.params.id;
      this.$props.contextMenu.type = "playlist";
    },

    /**
     *Function to get the playlist data (name - owner's name - number of songs)
     * @public This is a public method
     * @param {none}
     */
    getPlaylistData() {
      this.$store.dispatch("playlist/getPlaylist", {
        playlistID: this.$route.params.id,
        isMenu: false
      });
    },

    /**
     *Function to get the playlist's tracks
     * @public This is a public method
     * @param {none}
     */
    getPlaylistTracks() {
      this.$store.dispatch("playlist/getPlaylistTracks", this.$route.params.id);
    },

    /**
     *Function to check if the user follow this playlist
     * @public This is a public method
     * @param {none}
     */
    isFollowedPlaylist() {
      this.$store.dispatch("playlist/checkFollowed", {
        playlistId: this.$route.params.id,
        usersID: [this.getuserID()],
        token: this.getuserToken()
      });
    }
  },
  created: function() {
    if (this.isLoggedIn()) {
      this.$store.commit("playlist/changeAdsPopup");
    }
    this.getPlaylistData();
    this.getPlaylistTracks();
    this.isFollowedPlaylist();
  },
  watch: {
    playlistID: function() {
      if (this.isLoggedIn()) {
        this.$store.commit("playlist/changeAdsPopup");
      }
      this.getPlaylistData();
      this.getPlaylistTracks();
      this.isFollowedPlaylist();
    },
    updatePlaylistTracks: function() {
      if (this.updatePlaylistTracks) {
        this.getPlaylistData();
        this.getPlaylistTracks();
        this.$store.commit("playlist/changeUpdatePlaylistTracks");
      }
    }
  },
  computed: {
    playlist() {
      return this.$store.state.playlist.singlePlaylist;
    },
    tracks() {
      return this.$store.state.playlist.playlistTracks;
    },
    followed() {
      return this.$store.state.playlist.isFollowed;
    },
    owned() {
      return (
        this.$store.state.playlist.singlePlaylist.owner._id == this.getuserID()
      );
    },
    updatePlaylistTracks() {
      return this.$store.state.playlist.updateTracksFlag;
    },
    playlistID() {
      return this.$route.params.id;
    },
    isLoading() {
      return this.$store.state.playlist.isLoading;
    }
  },
  props: {
    contextMenu: {}
  },
  mixins: [getDeviceSize, getuserToken, isLoggedIn, getuserID]
};
</script>

<style scoped>
#playBtn {
  background-color: #1aa34a;
  border-width: 0;
  border-radius: 500px;
}

#playIcon:hover {
  transform: scale(1.1, 1.1);
}

#playBtn:hover {
  background-color: #1ed760;
  transform: scale(1.05, 1.05);
}
h5 {
  opacity: 0.5;
}

.lg-img,
.lg-card,
.lg-col {
  height: 300px;
  width: 300px;
}

.sm-img,
.small-col,
.v-card.v-sheet.theme--light.small-card {
  width: 157px;
  height: 157px;
}

.small-col {
  width: 157px;
  height: 157px;
}

.centering {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  height: 50%;
  width: 50%;
  margin: auto;
}
</style>
