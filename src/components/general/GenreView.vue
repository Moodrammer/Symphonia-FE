<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <h1>{{ gridItems.categoryName }}</h1>
      <CardGrid :cardItems="gridItems.list" :contextMenu="contextMenu" />
    </v-container>
  </v-content>
</template>

<script>
import CardGrid from "./CardGrid";
/**
 * This component contains all the playlists\albums of this genre
 * @displayName Genre
 * @example [none]
 */
export default {
  components: {
    CardGrid
  },
  created: function() {
    this.$store.dispatch("category/getGenrePlaylists", this.$route.params.id);
  },
  computed: {
    gridItems() {
      return this.$store.state.category.singleCategory;
    }
  },
  props: {
    contextMenu: {}
  }
};
</script>

<style scoped></style>
