<template>
  <v-container>
    <v-row>
      <h1>{{ name }}</h1>
      <v-spacer></v-spacer>
      <router-link
        v-if="seeAll"
        v-bind:to="'/genre/' + id"
        class="white--text mt-3"
      >
        <p id="seeAll">SEE ALL</p>
      </router-link>
    </v-row>
    <cardGrid :cardItems="gridItems" :contextMenu="contextMenu"/>
  </v-container>
</template>

<script>
import cardGrid from "./CardGrid";
/**
 * A bar of playlists\albums cards with the name of the category
 * @displayName Category
 * @example [none]
 */
export default {
  components: {
    cardGrid
  },
  props: {
    name: String,
    id: String,
    seeAll: Boolean,
    gridItems: Object,
    gridStyle: String,
    contextMenu: {
      event: null,
      type: null,
      id: null
    }
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
