<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <div>
        <h1>Search for `{{ this.$route.params.name }}`</h1>
      </div>
      <div style="margin-top:15px;">
        <h2>Artists</h2>
        <CardGrid :cardItems="artists" cardStyle="artist" />
      </div>
      <div style="margin-top:15px;">
        <h2>Albums</h2>
        <CardGrid :cardItems="albums" />
      </div>
      <div style="margin-top:15px;">
        <h2>Playlist</h2>
        <CardGrid :cardItems="playlist" />
      </div>
      <div style="margin-top:15px;">
        <h2>Gernes</h2>
        <CardGrid :cardItems="category" />
      </div>
    </v-container>
  </v-content>
</template>

<script>
import CardGrid from "../general/CardGrid.vue";
export default {
  data() {
    return { contextMenu: { event: null, type: null, id: null } };
  },
  components: {
    CardGrid
  },
  created() {
    this.$store.dispatch("searchFor", encodeURI(this.$route.params.name));
  },
  beforeUpdate() {
    this.$store.dispatch("searchFor", encodeURI(this.$route.params.name));
  },
  computed: {
    albums() {
      return { items: this.$store.state.search.albums };
    },
    category() {
      return { items: this.$store.state.search.category };
    },
    playlist() {
      return { items: this.$store.state.search.playlist };
    },
    artists() {
      return { items: this.$store.state.search.artists };
    }
  }
};
</script>

<style scoped>
h2 {
  margin-left: 10px;
  margin-bottom: -15px;
}
</style>
