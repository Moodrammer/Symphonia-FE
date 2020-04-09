<template>
  <v-container class="pt-0">
    <h1 style="font-size: 28px;">Play Queue</h1>
    <v-row justify="center">
      <!--Display the Now player -->
      <v-col lg="12" sm="12" md="12">
        <h2 style="font-size: 18px;">Now Playing</h2>
        <!--this divider will be shown at the small screen sizes only-->
        <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>
        <v-list color="transparent">
          <!--Nesting the song component-->
          <song
            :playing="true"
            :songName="curTrkName"
            :artistName="curTrkArtistName"
            :duration="totalDuration * 1000"
          />
        </v-list>
      </v-col>
    </v-row>

    <v-row justify="center">
      <!--Display the Now player -->
      <v-col lg="12" sm="12" md="12">
        <h2 style="font-size: 18px;">Next Up</h2>
        <!--this divider will be shown at the small screen sizes only-->
        <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>
        <v-list color="transparent">
          <!--Nesting the song component-->
          <song
            v-for="track in queueNextTracks"
            :key="track.name"
            :disabled="true"
            :songName="track.name"
            :artistName="track.artistName"
            :duration="track.durationMs"
          /> 
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Song from "../components/general/Song";
import { mapState, mapActions, mapMutations } from "vuex";
import getuserToken from "../mixins/userService";

export default {
  name: "TheQueue",

  components: {
    Song,
  },

  data: function() {
    return {
      hover: false,
      loading: true,

      token: undefined,
    };
  },

  methods: {
    ...mapActions("track", ["updateQueueNextTracksInfo"]),
    ...mapMutations("playlist", ["setIsQueueOpened"])
  },

  computed: {
    ...mapState({
      curTrkName: (state) => state.track.trackName,
      curTrkArtistName: (state) => state.track.trackArtists[0].name,
      queueNextTracks: (state) => state.track.queueNextTracks,
      totalDuration: (state) => state.track.totalDuration
    }),
  },

  mounted: function() {
    this.token = "Bearer " + this.getuserToken();

    //this.updateQueueNextTracksInfo(this.token);
  },

  beforeDestroy: function() {
    this.setIsQueueOpened(false);
  },
  mixins: [getuserToken]
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
