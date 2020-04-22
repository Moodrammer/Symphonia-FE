<template>
  <!--The Album view wil be used later-->
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
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

              <v-col lg="12" md="8" sm="7" xs="1" cols="12">
                <v-row
                  justify-lg="center"
                  @contextmenu.prevent="menuClick($event)"
                >
                  <h1 class="mt-5">{{ album.name }}</h1>
                </v-row>
                <v-row justify-lg="center">
                  <p class="mt-2" id="year">{{ album.artist.name }}</p>
                </v-row>
                <v-row justify-lg="center">
                  <v-btn
                    rounded
                    class="white--text px-8 my-4"
                    id="playBtn"
                    @click="play"
                  >
                    Play
                  </v-btn>
                </v-row>
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
                  <v-menu offset-x>
                    <template v-slot:activator="{ on }">
                      <!--Icon to activate the menu-->
                      <div v-on="on" id="albumMenu">
                        <v-icon color="white" class="mx-2" id="menuDots">
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

                      <v-list-item
                        v-if="!followed"
                        @click="followAlbum"
                        id="followButton"
                      >
                        <v-list-item-title class="draweritem">
                          Save to Your Library
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item
                        v-else
                        @click="unfollowAlbum"
                        id="unfollowButton"
                      >
                        <v-list-item-title class="draweritem">
                          Remove from your Library
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title class="draweritem">
                          Copy Album Link
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
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
              <song
                v-for="track in tracks"
                :key="track.name"
                :songName="track.name"
                :artistName="track.artist.name"
                :artistID="track.artist._id"
                :duration="track.durationMs"
                :album="true"
                :id="track._id"
                :disabled="track.premium"
                :contextMenu="contextMenu"
              />
            </div>
          </v-list>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" style="bottom: 100px;">
        <span>Start listening with a free Symphonia account</span>

        <router-link to="/signup" style="text-decoration: none;">
          <v-btn color="green" text>
            sign up
          </v-btn>
        </router-link>

        <router-link to="/login" style="text-decoration: none;">
          <v-btn color="cyan" text min-width="20">
            log in
          </v-btn>
        </router-link>
      </v-snackbar>
    </v-container>
  </v-content>
</template>

<script>
import Song from "./Song";
import getDeviceSize from "../../mixins/getDeviceSize";
import getuserToken from "../../mixins/userService";
import getuserID from "../../mixins/userService";
import isLoggedIn from "../../mixins/userService";

/**
 * @displayName Album View
 * @example [none]
 */
export default {
  components: {
    Song
  },
  data: function() {
    return {
      hover: false,
      iconClick: false,
      id: this.$route.params.id,
      disable: false,
      snackbar: false
    };
  },
  methods: {
    /**
     * Gets called when the user clicks on the play button to play the album
     * @public This is a public method
     * @param {none}
     */
    play: function() {
      if (this.isLoggedIn()) {
        this.$store.dispatch("track/playSongStore", {
          songId: this.tracks[0]._id,
          token: "Bearer " + this.getuserToken(),
          contextId: this.$route.params.id
        });
      } else {
        this.snackbar = true;
      }
    },
    /**
     * Gets called when the user clicks on heart icon to follow the album
     * @public This is a public method
     * @param {none}
     */
    followAlbum: function() {
      if (this.isLoggedIn()) {
        this.$store.dispatch("album/followAlbum", {
          id: this.id,
          token: this.getuserToken()
        });
      } else {
        this.snackbar = true;
      }
    },
    /**
     * Gets called when the user clicks on heart icon to unfollow the album
     * @public This is a public method
     * @param {none}
     */
    unfollowAlbum: async function() {
      if (this.isLoggedIn()) {
        await this.$store.dispatch("album/unfollowAlbum", {
          id: this.id,
          token: this.getuserToken()
        });
      } else {
        this.snackbar = true;
      }
    },
    menuClick(event) {
      this.$props.contextMenu.event = event;
      this.$props.contextMenu.id = this.$route.params.id;
      this.$props.contextMenu.type = "album";
    }
  },
  created: function() {
    this.$store.dispatch("album/getAlbum", this.$route.params.id);
    this.$store.dispatch("album/checkFollowed", {
      albumID: [this.$route.params.id],
      token: this.getuserToken()
    });
  },
  computed: {
    album() {
      return this.$store.state.album.singleAlbum;
    },
    tracks() {
      return this.$store.state.album.albumTracks;
    },
    followed() {
      return this.$store.state.album.followed;
    }
  },
  props: ["contextMenu"],
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

/* #followPlaylist {
  border-radius: 0; 
} */

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

#year {
  opacity: 0.6;
}
</style>
