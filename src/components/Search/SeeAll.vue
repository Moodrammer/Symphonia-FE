<template>
  <v-content
    color="#b3b3b3"
    class="root white--text scrollbar"
    fluid
    fill-height
  >
    <v-container class="ma-5">
      <div>
        <h1>{{ this.$route.params.type }}</h1>
      </div>
      <div v-if="tracks">
        <SongItem
          v-for="track in array"
          :key="track.name"
          :songName="track.name"
          :albumName="track.album.name"
          :albumID="track.album._id"
          :artistName="track.artist.name"
          :artistID="track.artist._id"
          :songDuration="track.durationMs"
          :ID="track._id"
          :isDisabled="track.premium"
          :contextMenu="contextMenu"
          contextType=""
          contextID=""
        />
        <p @click="loadMore" v-if="this.$store.state.search.next" class="More">
          See More
        </p>
      </div>
      <div v-else>
        <CardGrid :cardItems="array" />
        <p @click="loadMore" v-if="this.$store.state.search.next" class="More">
          See More
        </p>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import CardGrid from "../general/CardGrid.vue";
import SongItem from "../general/SongItem.vue";
export default {
  data() {
    return { tracks: false, type: "", limit: 12, offset: 12 };
  },
  props: {
    contextMenu: {}
  },
  components: {
    CardGrid,
    SongItem
  },
  created() {
    switch (this.$route.params.type) {
      case "Artists":
        this.type = "artist";
        break;
      case "Playlists":
        this.type = "playlist";
        break;
      case "Gernes":
        this.type = "category";
        break;
      case "Albums":
        this.type = "album";
        break;
      case "Profiles":
        this.type = "profile";
        break;
      case "Tracks":
        this.type = "track";
        this.tracks = true;
        break;
    }
    this.$store.dispatch("searchByType", {
      q:
        "/v1/search?q=" +
        this.$route.params.name +
        "&type=" +
        this.type +
        "&limit=12&offset=0",
      offset: 0,
      type: this.type,
      word: this.$route.params.name
    });
  },
  computed: {
    array() {
      let arr;
      switch (this.type) {
        case "artist":
          arr = { items: this.$store.state.search.artists };
          break;
        case "playlist":
          arr = { items: this.$store.state.search.playlist };
          break;
        case "category":
          arr = { items: this.$store.state.search.category };
          break;
        case "album":
          arr = { items: this.$store.state.search.albums };
          break;
        case "profile":
          arr = { items: this.$store.state.search.profiles };
          break;
        case "track":
          arr = this.$store.state.search.tracks;
          break;
      }
      return arr;
    }
  },
  methods: {
    loadMore: function() {
      let q =
        "/v1/search?q=" +
        this.$route.params.name +
        "&type=" +
        this.type +
        "&limit=" +
        this.limit +
        "&offset=" +
        this.offset;
      this.limit = this.offset;
      this.offset += 18;
      this.$store.dispatch("searchByType", {
        q: q,
        offset: this.offset,
        type: this.type
      });
    }
  }
};
</script>

<style scoped>
h2 {
  margin-left: 10px;
  margin-bottom: -15px;
}
.More {
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
</style>
