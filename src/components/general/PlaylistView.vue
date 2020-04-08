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
                  <v-btn rounded class="white--text px-8" id="playBtn" @click="play">
                    Play
                  </v-btn>
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
            <song
              v-for="track in tracks"
              :key="track.name"
              :songName="track.name"
              :artistName="track.artist.name"
              :albumName="track.album.name"
              :duration="track.durationMs"
              :id="track._id"
            />
            <p>{{this.getuserToken()}}</p>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Song from "./Song";
//import { mapState } from "vuex";
import getDeviceSize from "../../mixins/getDeviceSize";
import getuserToken from "../../mixins/userService";
/**
 * @displayName Liked Songs
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
      type: this.$route.params.type
    };
  },
  methods: {
    play: function() {
      this.$store.dispatch("track/playSongStore",{
        songId: this.tracks[0]._id,
        token: 'Bearer '+ this.getuserToken(),
        contextId: this.playlist._id
      });
    }
  },
  created: function() {
    this.$store.dispatch("playlist/getPlaylist", this.id);
    this.$store.dispatch("playlist/getPlaylistTracks", this.id);
  },
  computed: {
    // ...mapState('playlist',{
    //     playlist: state => state.singlePlaylist,
    //     tracks: state => state.playlistTracks
    //   })
    playlist() {
      return this.$store.state.playlist.singlePlaylist;
    },
    tracks() {
      return this.$store.state.playlist.playlistTracks;
    }
  },
  mixins: [getDeviceSize, getuserToken]
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
