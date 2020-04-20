<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <h1>{{ gridItems.categoryName }}</h1>
      <cardGrid :cardItems="gridItems.list" />
    </v-container>
  </v-content>
</template>

<script>
import cardGrid from "./CardGrid";
import { mapState } from "vuex";
/**
 * This component contains all the playlists\albums of this genre
 * @displayName Genre
 * @example [none]
 */
export default {
  components: {
    cardGrid
  },
  data: function() {
    return {
      id: this.$route.params.id
    };
  },
  created: function() {
    this.$store.dispatch("category/getGenrePlaylists", this.id);
  },
  computed: mapState({
    gridItems: state => state.category.singleCategory
  })
};
</script>

<style scoped></style>
