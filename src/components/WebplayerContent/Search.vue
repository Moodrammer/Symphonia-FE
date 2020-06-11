<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <div>
        <h1>Browse all</h1>
      </div>
      <v-row justify="start">
        <v-col v-for="genre in gernes" :key="genre.id" cols="3">
          <cardGerne :name="genre.name" :ID="genre.id" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import cardGerne from "../Search/CardGenre.vue";
/**
 * This page is used to search for certain text and view our Genres
 * @displayName Recover Playlist
 * @example [none]
 */
export default {
  components: {
    cardGerne: cardGerne
  },
  created() {
    this.$store.dispatch("category/loadGenres");
  },
  computed: {
    gernes() {
      return this.$store.state.category.savedGenres;
    }
  }
};
</script>

<style scoped></style>
