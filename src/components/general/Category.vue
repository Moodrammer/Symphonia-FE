<template>
  <v-container>
    <v-row>
      <h1>{{ name }}</h1>
      <v-spacer></v-spacer>
      <p v-if="seeAll" id="seeAll">SEE ALL</p>
    </v-row>
    <CardGrid :cardItems="griditems" :cardStyle="gridStyle" />
  </v-container>
</template>

<script>
import CardGrid from "./CardGrid";
export default {
  components: {
    CardGrid
  },
  props: {
    name: String,
    seeAll: Boolean,
    griditems: Object,
    gridStyle: String
  }
};
</script>

<style scoped>
#seeAll {
  opacity: 0.6;
}

#seeAll:hover {
  opacity: 1;
  cursor: pointer;
  text-decoration: underline;
}
</style>
