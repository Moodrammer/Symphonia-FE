<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <h1>{{ griditems.categoryName }}</h1>
      <CardGrid :cardItems="griditems.list" />
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
      id: this.$route.params.id
    };
  },
  created: function() {
    this.$store.dispatch("category/getGenrePlaylists", this.id);
  },
  computed: mapState({
    griditems: state => state.category.singleCategory
  })
};
</script>

<style scoped></style>
