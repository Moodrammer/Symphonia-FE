<template>
  <v-container>
    <v-row>
      <!--Display the section name-->
      <h1>{{ categoryName }}</h1>

      <v-spacer></v-spacer>

      <!--See All to route to the genre and display all the items of this section-->
      <router-link
        v-if="seeAll"
        v-bind:to="'/genre/' + genreID"
        class="white--text mt-3"
        :contextMenu="contextMenu"
      >
        <p id="seeAll">SEE ALL</p>
      </router-link>
    </v-row>

    <!--Card Grid to display the bar of items-->
    <CardGrid :cardItems="gridItems" :contextMenu="contextMenu" />
  </v-container>
</template>

<script>
import CardGrid from "./CardGrid";
/**
 * A bar of playlists\albums cards with the name of the category
 * @displayName Category
 * @example [none]
 */
export default {
  components: {
    CardGrid
  },
  props: {
    categoryName: String,
    genreID: String,
    seeAll: {
      type: Boolean,
      default: false
    },
    gridItems: Object,
    contextMenu: {}
  }
};
</script>

<style scoped>
a:hover {
  opacity: 1;
  cursor: pointer;
  text-decoration: underline;
}

a {
  text-decoration: none;
  opacity: 0.6;
}
</style>
