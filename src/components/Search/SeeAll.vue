<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <div>
        <h1>{{ this.$route.params.type }}</h1>
      </div>
      <div v-if="traks">
        <SongItem />
      </div>
      <div v-else>
        <CardGrid :cardItems="array" />
      </div>
    </v-container>
  </v-content>
</template>

<script>
import CardGrid from "../general/CardGrid.vue";
import SongItem from "../general/SongItem.vue";
export default {
  data() {
    return { contextMenu: { event: null, type: null, id: null } };
  },
  components: {
    CardGrid,
    SongItem
  },
  created() {
    this.$store.dispatch("searchFor", encodeURI(this.$route.params.name));
  },
  beforeUpdate() {
    this.$store.dispatch("searchFor", encodeURI(this.$route.params.name));
  },
  computed: {
    array() {
      let arr;
      switch (this.$route.params.type) {
        case "artist":
          arr = { items: this.$store.state.search.artists };
          break;
        case "playlist":
          arr = { items: this.$store.state.search.playlist };
          break;
        case "category":
          arr = { items: this.$store.state.search.category };
          break;
        case "albums":
          arr = { items: this.$store.state.search.albums };
          break;
        case "profiles":
          arr = { items: this.$store.state.search.profiles };
          break;
      }
      return arr;
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
