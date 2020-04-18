<template>
  <!--The Playlist view wil be used later-->
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
                    :src="playlist.images[0]"
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
                <v-row justify-lg="center">
                  <h1 class="mt-5">{{ playlist.name }}</h1>
                </v-row>
                <v-row justify-lg="center">
                  <v-btn
                    rounded
                    class="white--text px-8"
                    id="playBtn"
                    @click="play"
                    v-if="!emptyPlaylist"
                  >
                    Play
                  </v-btn>
                  <v-btn
                    v-else
                    rounded
                    class="white--text px-8"
                    id="playBtn"
                    @click="play"
                    disabled
                  >
                    Play
                  </v-btn>
                </v-row>
                <v-row justify-lg="center" class="mt-6">
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
                  <v-menu offset-x>
                    <template v-slot:activator="{ on }">
                      <!--Icon to activate the menu-->
                      <div v-on="on" id="playlistMenu">
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
                        v-if="owned"
                        @click="makeSecret"
                        id="makeSecret"
                      >
                        <v-list-item-title class="draweritem">
                          Make secret
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item
                        @click="changeDelete"
                        id="deletePlaylist"
                        v-if="owned"
                      >
                        <v-list-item-title class="draweritem">
                          Delete
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item
                        v-else-if="!followed"
                        @click="followPlaylist"
                        id="followButton"
                      >
                        <v-list-item-title class="draweritem">
                          Save to Your Library
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item
                        v-else
                        @click="unfollowPlaylist"
                        id="unfollowButton"
                      >
                        <v-list-item-title class="draweritem">
                          Remove from your Library
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title class="draweritem">
                          Copy Link
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
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
                :albumName="track.album.name"
                :albumID="track.album._id"
                :artistName="track.artist.name"
                :artistID="track.artist._id"
                :duration="track.durationMs"
                :id="track._id"
              />
            </div>
          </v-list>
          <div v-if="emptyPlaylist" class="white--text ">
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
//import { mapState } from "vuex";
import getDeviceSize from "../../mixins/getDeviceSize";
import getuserToken from "../../mixins/userService";
import getuserID from "../../mixins/userService";
import isLoggedIn from "../../mixins/userService";

/**
 * @displayName Playlist View
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
      type: this.$route.params.type,
      disable: false,
      snackbar: false
    };
  },
  methods: {
    /**
     * Gets called when the user clicks on the play button to play the playlist\album
     * @public This is a public method
     * @param {none}
     */
    play: function() {
      if (this.isLoggedIn()) {
        this.$store.dispatch("track/playSongStore", {
          songId: this.tracks[0]._id,
          token: "Bearer " + this.getuserToken(),
          contextId: this.playlist._id
        });
      } else {
        this.snackbar = true;
      }
    },
    /**
     * Gets called when the user clicks on heart icon to follow the playlist\album
     * @public This is a public method
     * @param {none}
     */
    followPlaylist: function() {
      if (this.isLoggedIn()) {
        this.$store.dispatch("playlist/followPlaylist", {
          id: this.id,
          token: this.getuserToken()
        });
      } else {
        this.snackbar = true;
      }
    },
    /**
     * Gets called when the user clicks on heart icon to unfollow the playlist\album
     * @public This is a public method
     * @param {none}
     */
    unfollowPlaylist: async function() {
      if (this.isLoggedIn()) {
        await this.$store.dispatch("playlist/unfollowPlaylist", {
          id: this.id,
          token: this.getuserToken()
        });
      } else {
        this.snackbar = true;
      }
    },
    changeDelete: function() {
      this.$store.commit("playlist/setPlaylistID", this.$route.params.id);
      this.$store.commit("playlist/changeDeleteModel");
    },
    makeSecret: function() {}
  },
  created: function() {
    this.$store.dispatch("playlist/getPlaylist", this.$route.params.id);
    this.$store.dispatch("playlist/checkFollowed", {
      playlistId: this.$route.params.id,
      usersID: [this.getuserID()],
      token: this.getuserToken()
    });
  },
  watch: {
    "$route.params.id": function() {
      this.$store.dispatch("playlist/getPlaylist", this.$route.params.id);
      this.$store.dispatch("playlist/checkFollowed", {
        playlistId: this.$route.params.id,
        usersID: [this.getuserID()],
        token: this.getuserToken()
      });
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
      return this.$store.state.playlist.followed;
    },
    emptyPlaylist() {
      return this.$store.state.playlist.playlistTracks.length == 0;
    },
    owned() {
      return (
        this.$store.state.playlist.singlePlaylist.owner == this.getuserID()
      );
    }
  },
  mixins: [getDeviceSize, getuserToken, isLoggedIn, getuserID]
};
</script>

<style scoped>
#playBtn {
  background-color: #1aa34a;
  border-width: 0;
  border-radius: 500px;
  margin-top: 30px;
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
</style>
