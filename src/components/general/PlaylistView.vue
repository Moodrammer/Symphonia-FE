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
                      <v-btn fab outlined color="white">
                        <v-icon
                          large
                          color="white"
                          v-if="!isPaused"
                          @click="pause"
                          id="pauseIcon"
                          class="mb-2"
                        >
                          mdi-pause
                        </v-icon>
                        <v-icon
                          large
                          color="white"
                          v-else
                          @click="play"
                          id="playIcon"
                          class="mb-2"
                        >
                          mdi-play
                        </v-icon>
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
                  <router-link
                    v-bind:to="'/webhome/user/' + this.playlist.owner._id"
                    class="white--text"
                  >
                    <p class="mt-1" style="opacity:0.4" id="owner">
                      {{ playlist.owner.name }}
                    </p>
                  </router-link>
                </v-row>

                <!--The play button-->
                <v-row justify-lg="center" class="mt-1">
                  <v-btn
                    rounded
                    class="white--text px-8 my-4"
                    id="pauseBtn"
                    @click="pause"
                    v-if="!isPaused"
                  >
                    Pause
                  </v-btn>
                  <v-btn
                    v-else
                    rounded
                    class="white--text px-8 my-4"
                    id="playBtn"
                    @click="play"
                    v-bind:class="{ disabled: playlist.tracksCount == 0 }"
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
                    @click.stop="menuClick($event)"
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
                :contextType="'playlist'"
                :contextID="id"
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
            <v-row justify="center">
              <v-btn rounded class="px-8" id="discoverBtn" to="/webhome/search">
                DISCOVER
              </v-btn>
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
import getuserToken from "../../mixins/userService/getUserToken";
import isPremium from "../../mixins/userService/isPremium";
import getuserID from "../../mixins/userService/getuserID";
import isLoggedIn from "../../mixins/userService/isLoggedIn";
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
    play: async function() {
      if (this.playlist.tracksCount && this.firstNonPreimum) {
        if (this.id != this.contextID) {
          this.$store.commit("track/setContextData", {
            contextID: this.id,
            contextType: "playlist",
            contextUrl: "https://thesymphonia.ddns.net/api"
          });
          await this.$store.dispatch(
            "track/playTrackInQueue",
            this.firstNonPreimum
          );

          await this.$store.dispatch("track/getTrackInformation", {
            token: "Bearer " + this.getuserToken(),
            trackId: this.firstNonPreimum
          });

          await this.$store.dispatch(
            "track/updateQueue",
            "Bearer " + this.getuserToken()
          );
        } else {
          this.$store.dispatch("track/togglePauseAndPlay");
        }
        this.$store.commit("track/setIsTrackPaused", this.isPaused);
      }
    },
    /**
     * Gets called when the user clicks on the pause button/icon
     * @public This is a public method
     * @param {none}
     */
    pause: function() {
      this.$store.dispatch("track/togglePauseAndPlay");
      this.$store.commit("track/setIsTrackPaused", this.isPaused);
    },
    /**
     *Function to follow this playlist,gets called when the user clicks on white heart icon
     * @public This is a public method
     * @param {none}
     */
    followPlaylist: function() {
      this.$store.dispatch("playlist/followPlaylist", {
        id: this.id,
        name: this.$store.state.playlist.singlePlaylist.name
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
    if (this.isLoggedIn() && !this.isPremium()) {
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
    },
    isPaused() {
      if (this.id == this.contextID)
        return this.$store.state.track.isTrackPaused;
      else return true;
    },
    contextID() {
      return this.$store.state.track.contextId;
    },
    firstNonPreimum() {
      return this.$store.state.playlist.nonPremiumTrackID;
    }
  },
  props: {
    contextMenu: {}
  },
  mixins: [getDeviceSize, getuserToken, isLoggedIn, getuserID, isPremium]
};
</script>

<style scoped>
#playBtn,
#pauseBtn {
  background-color: #1aa34a;
  border-width: 0;
  border-radius: 500px;
}

#playIcon:hover {
  transform: scale(1.1, 1.1);
}

#playBtn:hover,
#pauseBtn:hover {
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

.disabled {
  cursor: no-drop;
}
</style>
