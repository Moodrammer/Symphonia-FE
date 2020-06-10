<template>
  <!--The Liked Songs view-->
  <v-container class="pt-0">
    <v-row justify="center">
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
              <!--Liked songs' image-->
              <v-card
                elevation="9"
                color="trasparent"
                v-bind:class="{
                  'small-card': isSm() || isXs() || isMd(),
                  'lg-card': isLg()
                }"
              >
                <v-img
                  src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
                  id="playPhoto"
                  @mouseover="hover = true"
                  @mouseleave="hover = false"
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
                      v-bind:class="{ disabled: numOfTracks == 0 }"
                    >
                      <v-icon
                        large
                        color="white"
                        v-if="!isPaused"
                        @click="pauseLikedSongs"
                        id="pauseIcon"
                        class="mb-2"
                      >
                        mdi-pause
                      </v-icon>
                      <v-icon
                        large
                        color="white"
                        v-else
                        @click="playLikedSongs"
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

            <v-col lg="12" md="8" sm="7" xs="1" cols="12">
              <v-row justify-lg="center">
                <h1 class="mt-5">Liked Songs</h1>
              </v-row>
              <v-row justify-lg="center">
                <v-btn
                  rounded
                  class="white--text px-8 my-4"
                  id="pauseBtn"
                  @click="pauseLikedSongs"
                  v-if="!isPaused"
                >
                  Pause
                </v-btn>
                <v-btn
                  v-else
                  rounded
                  class="white--text px-8 my-4"
                  id="playBtn"
                  @click="playLikedSongs"
                  v-bind:class="{ disabled: numOfTracks == 0 }"
                >
                  Play
                </v-btn>
              </v-row>
              <v-row class="mt-2" justify-lg="center">
                <h5 class="mr-2">{{ numOfTracks }}</h5>
                <h5>SONGS</h5>
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
          <SongItem
            v-for="track in tracks"
            :key="track.name"
            :songName="track.name"
            :albumName="track.album.name"
            :albumID="track.album._id"
            :artistName="track.artist.name"
            :artistID="track.artist._id"
            :songDuration="track.durationMs"
            :ID="track._id"
            :isDisabled="track.premium"
            :ownedPlaylist="false"
            :contextMenu="contextMenu"
            :contextType="'liked'"
            :contextID="'id'"
          />
        </v-list>
        <div v-if="!numOfTracks" class="white--text ">
          <v-row justify="center" class="my-5">
            <v-icon color="white" large>mdi-camera-outline</v-icon>
          </v-row>
          <v-row justify="center" class="my-5">
            <h1>Songs you've liked</h1>
          </v-row>
          <v-row justify="center" class="my-5">
            <p>
              Find more of the songs you love in Browse and save to your Liked
              Songs
            </p>
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
</template>

<script>
import SongItem from "../components/general/SongItem";
import getDeviceSize from "../mixins/getDeviceSize";
import getuserToken from "../mixins/userService/getUserToken";

/**
 * @displayName Liked Songs
 * @example [none]
 */
export default {
  components: {
    SongItem
  },
  data: function() {
    return {
      hover: false,
      iconClick: false,
      update: false
    };
  },
  watch: {
    isUpdateTracks: function() {
      if (this.isUpdateTracks) {
        this.$store.dispatch("track/getTracks", this.getuserToken());
        this.$store.commit("track/changeUpdateTracks");
      }
    }
  },
  created: function() {
    this.$store.dispatch("track/getTracks", this.getuserToken());
  },
  computed: {
    tracks() {
      return this.$store.state.track.savedTracks;
    },
    numOfTracks() {
      return this.$store.state.track.savedTracksNum;
    },
    isUpdateTracks() {
      return this.$store.state.track.updateSavedTracks;
    },
    isPaused() {
      if (this.contextType == "liked")
        return this.$store.state.track.isTrackPaused;
      else return true;
    },
    contextType() {
      return this.$store.state.track.contextType;
    },
    firstNonPreimum() {
      return this.$store.state.track.nonPremiumTrackID;
    }
  },
  methods: {
    /**
     * Gets called when the user clicks on the play button to play the liked songs
     * @public This is a public method
     * @param {none}
     */
    playLikedSongs: async function() {
      if (this.numOfTracks && this.firstNonPreimum != null) {
        if (this.contextType != "liked") {
          this.$store.commit("track/setContextData", {
            contextID: "id",
            contextType: "liked",
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
    pauseLikedSongs: function() {
      this.$store.dispatch("track/togglePauseAndPlay");
      this.$store.commit("track/setIsTrackPaused", this.isPaused);
    }
  },
  props: ["contextMenu"],
  mixins: [getDeviceSize, getuserToken]
};
</script>

<style scoped>
#playBtn,
#pauseBtn {
  background-color: #1aa34a;
  border-width: 0;
  border-radius: 500px;
  margin-top: 30px;
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

h5 {
  opacity: 0.5;
}
.disabled {
  cursor: no-drop;
}
</style>
