<template>
  <v-content class="pa-0">
        <!--Display the Songs -->
        <v-card-title class="display-3 white--text">Popular</v-card-title>
        <v-row>
        <v-col class="mx-auto" lg="11" sm="12" md="12">
          <!--this divider will be shown at the small screen sizes only-->
          <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>
          <v-list class="mx-auto mt-3" dark>
            <!--Nesting the song component-->
            <div v-if="tracks">
              <SongItem
                v-for="track in allArtistTopTracks"
                :key="track.name"
                :songName="track.name"
                :albumName="track.album.name"
                :albumID="track.album._id"
                :artistName="artistName"
                :artistID="artistID"
                :songDuration="track.durationMs"
                :ID="track._id"
                :isDisabled="track.premium"
                :image="track.album.image"
                
              />
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
            </div>
          </v-list>
        </v-col>
        </v-row>
  </v-content>
</template>

<script>
import getuserToken from "../../mixins/userService";
import SongItem from "../general/SongItem"
import { mapGetters, mapActions } from "vuex";

export default {
    components:{
        SongItem
    },
    mixins: [getuserToken],
    created(){
      this.getArtistTopTracks({
        id: this.$props.artistID,
        token: this.getuserToken(),
        limit : 5,
        offset: 0
      })
    },
    methods:{
      ...mapActions("artist", ["getArtistTopTracks"])
    },
    computed:{
      ...mapGetters("artist", ["allArtistTopTracks"])
    },
    props:["artistID", "artistName"],
    data(){
        return {
            tracks: [{
                durationMs: 323213232,
                name: "saad",
                album:{
                    name:"sa",
                    _id:"dsa",
                },
                artist:{
                    name: "dsadsa",
                    _id: "dsadssadsa",
                }
            }]
        }
    }
}
</script>

<style>

</style>