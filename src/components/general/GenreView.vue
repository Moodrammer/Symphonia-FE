<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <v-row
        justify="center"
        align-content="center"
        v-if="isLoading"
        class="centering"
      >
        <pulse-loader
          :loading="isLoading"
          color="white"
          size="20px"
        ></pulse-loader>
      </v-row>
      <div v-else>
        <h1>{{ gridItems.categoryName }}</h1>
        <CardGrid :cardItems="gridItems.list" :contextMenu="contextMenu" />
      </div>
    </v-container>
  </v-content>
</template>

<script>
import CardGrid from "./CardGrid";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
/**
 * This component contains all the playlists\albums of this genre
 * @displayName Genre
 * @example [none]
 */
export default {
  components: {
    CardGrid,
    PulseLoader
  },
  created: function() {
    this.$store.dispatch("category/getGenrePlaylists", this.$route.params.id);
  },
  computed: {
    gridItems() {
      return this.$store.state.category.singleCategory;
    },
    isLoading() {
      return this.$store.state.category.isLoading;
    }
  },
  props: {
    contextMenu: {}
  }
};
</script>

<style scoped>
.centering {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  height: 50%;
  width: 50%;
  margin: auto;
}
</style>
