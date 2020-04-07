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
    <cardGrid :cardItems="gridItems" :cardStyle="gridStyle" />
  </v-container>
</template>

<script>
import cardGrid from "./CardGrid";
export default {
  components: {
    cardGrid
  },
  props: {
    name: String,
    id: String,
    seeAll: Boolean,
    gridItems: Object,
    gridStyle: String
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
