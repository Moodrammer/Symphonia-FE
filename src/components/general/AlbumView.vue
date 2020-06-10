<template>
  <!--The Album view wil be used later-->
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
                <!--The album's image-->
                <v-card
                  elevation="9"
                  color="trasparent"
                  v-bind:class="{
                    'small-card': isSm() || isXs() || isMd(),
                    'lg-card': isLg()
                  }"
                >
                  <v-img
                    :src="album.image"
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

              <!--Display the album's name - artist's name - number of songs-->
              <v-col lg="12" md="8" sm="7" xs="1" cols="12">
                <v-row
                  justify-lg="center"
                  @contextmenu.prevent="menuClick($event)"
                >
                  <h1 class="mt-5">{{ album.name }}</h1>
                </v-row>
                <v-row justify-lg="center">
                  <router-link
                    v-bind:to="'/webhome/artist/' + this.album.artist._id"
                    class="white--text"
                  >
                    <p class="mt-2" id="artistName">{{ album.artist.name }}</p>
                  </router-link>
                </v-row>
                <!--The play button-->
                <v-row justify-lg="center">
                  <v-btn
                    rounded
                    class="white--text px-8 my-4"
                    id="playBtn"
                    @click="play"
                    v-if="isPaused"
                  >
                    Play
                  </v-btn>
                  <v-btn
                    rounded
                    class="white--text px-8 my-4"
                    id="pauseBtn"
                    @click="pause"
                    v-else
                  >
                    Pause
                  </v-btn>
                </v-row>

                <!--Follow / Unfollow this album-->
                <v-row justify-lg="center" class="mt-4">
                  <v-icon
                    color="white"
                    @click="followAlbum"
                    id="followIcon"
                    v-if="!followed"
                    class="mr-3"
                    >mdi-heart-outline</v-icon
                  >
                  <v-icon
                    color="success"
                    id="unfollowIcon"
                    @click="unfollowAlbum"
                    v-else
                    class="mr-3"
                    >mdi-heart</v-icon
                  >

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
                  <h5 id="year" class="mt-3 mr-2">{{ album.year }}</h5>
                  <h5 id="year" class="mt-3 mr-2">.</h5>
                  <h5 id="year" class="mt-3 mr-2">{{ album.tracksCount }}</h5>
                  <h5 id="year" class="mt-3 mr-2">SONGS</h5>
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
                :artistName="track.artist.name"
                :artistID="track.artist._id"
                :songDuration="track.durationMs"
                :isAlbum="true"
                :ID="track._id"
                :isDisabled="track.premium"
                :contextMenu="contextMenu"
                :contextType="'album'"
                :contextID="id"
              />
            </div>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import SongItem from "./SongItem";
import getDeviceSize from "../../mixins/getDeviceSize";
import getuserToken from "../../mixins/userService/getUserToken";
import getuserID from "../../mixins/userService/getuserID";
import isLoggedIn from "../../mixins/userService/isLoggedIn";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

/**
 * @displayName Album View
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
      id: this.$route.params.id
    };
  },
  methods: {
    /**
     * Gets called when the user clicks on the play button/icon to play the album
     * @public This is a public method
     * @param {none}
     */
    play: async function() {
      if (this.firstNonPreimum !==null) {
        if (this.id != this.contextID) {
          this.$store.commit("track/setContextData", {
            contextID: this.id,
            contextType: "album",
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
     * Gets called when the user clicks on heart icon to follow the album
     * @public This is a public method
     * @param {none}
     */
    followAlbum: function() {
      this.$store.dispatch("album/followAlbum", this.id);
    },
    /**
     * Gets called when the user clicks on heart icon to unfollow the album
     * @public This is a public method
     * @param {none}
     */
    unfollowAlbum: async function() {
      await this.$store.dispatch("album/unfollowAlbum", this.id);
    },
    /**
     * Function to set the right click menu data
     * @public This is a public method
     * @param {Event} event the event type
     */
    menuClick(event) {
      this.$props.contextMenu.event = event;
      this.$props.contextMenu.id = this.$route.params.id;
      this.$props.contextMenu.type = "album";
    },
    /**
     *Function to get the album's data
     * @public This is a public method
     * @param {none}
     */
    getAlbumData() {
      this.$store.dispatch("album/getAlbum", this.$route.params.id);
    },
    /**
     *Function to check if the user follow this album
     * @public This is a public method
     * @param {none}
     */
    isFollowedAlbum() {
      this.$store.dispatch("album/checkFollowed", {
        albumID: [this.$route.params.id],
        token: this.getuserToken()
      });
    }
  },
  created: function() {
    this.getAlbumData();
    this.isFollowedAlbum();
  },
  computed: {
    album() {
      return this.$store.state.album.singleAlbum;
    },
    tracks() {
      return this.$store.state.album.albumTracks;
    },
    followed() {
      return this.$store.state.album.isFollowdAlbum;
    },
    isLoading() {
      return this.$store.state.album.isLoading;
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
      return this.$store.state.album.nonPremiumTrackID;
    }
  },
  props: ["contextMenu"],
  mixins: [getDeviceSize, getuserToken, isLoggedIn, getuserID]
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

#year,
#artistName {
  opacity: 0.6;
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
