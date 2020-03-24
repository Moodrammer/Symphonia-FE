<template>
  <v-container class="pt-0 ">
    <v-row justify="center">
      <v-col lg="4" sm="12" md="12" class="column pr-10">
        <v-img
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          id="playPhoto"
          @mouseover="hover = true"
          @mouseleave="hover = false"
        >
          <v-overlay
          v-show="hover"
          class="overlay"
          absolute
          opacity="0.8"
          >
           <v-btn fab outlined color="white" id="playIcon" @click="iconClick=!iconClick">
              <v-icon large color="white" v-if="iconClick">mdi-pause</v-icon>
              <v-icon large color="white" v-else>mdi-play</v-icon>
             </v-btn>
        </v-overlay>
        </v-img>

        <h1 class="mt-5">Liked Songs</h1>

        <v-btn rounded class="white--text px-8" id="playBtn">Play</v-btn>
      </v-col>

      <v-col lg="8" sm="12" md="12">
        <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>
        <v-list color="transparent">
          <song
            v-for="track in tracks"
            :key="track.name"
            :songName="track.name"
            :artistName="track.artists.name"
            :albumName="track.album.name"
            :duration="track.duration_ms"
          />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Song from "../components/Song";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    Song
  },
  data: function() {
    return {
      hover: false,
      iconClick: false
    };
  },
  methods: {
    ...mapActions("track", ["getTracks"])
  },
  mounted() {
    this.getTracks();
  },
  computed: mapState({
    tracks: state => state.track.tracks
  })
};
</script>

<style scoped>
#playPhoto {
  max-height: 300px;
  max-width: 300px;
}

#playBtn {
  background-color: #1aa34a;
  border-width: 0;
  border-radius: 500px;
  margin-top: 30px;
  margin-left: 20%;
}

#playIcon:hover {
  transform: scale(1.1, 1.1);
}

#playBtn:hover {
  background-color: #1ed760;
  transform: scale(1.05, 1.05);
}
h1 {
  padding-left: 12%;
}
</style>
