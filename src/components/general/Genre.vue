<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <h1>gggggf</h1>
      <CardGrid :cardItems="griditems" />
      <p>{{ griditems }}</p>
    </v-container>
  </v-content>
</template>

<script>
import CardGrid from "./CardGrid";
import { mapState } from "vuex";
export default {
  components: {
    CardGrid
  },
  data: function() {
    return {
      id: this.$route.id
    };
  },
  created: function() {
    console.log("ff");
    this.$store.dispatch("category/getGenrePlaylists", "pop");
  },
  computed: mapState({
    griditems: state => state.category.singleCategoryPlaylists
  })
};
</script>

<style scoped></style>
