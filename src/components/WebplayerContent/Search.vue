<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <div>
        <h1>Browse all</h1>
      </div>
      <v-row justify="start">
        <v-col v-for="(genre, idx) in genres" :key="idx" cols="3">
          <cardGerne :name="genre.name" :ID="genre.id" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import cardGerne from "../Search/CardGenre.vue";
export default {
  data() {
    return {
      genres: []
    };
  },
  components: {
    cardGerne: cardGerne
  },
  created() {
    this.$store.dispatch("category/loadGenres").then(() => {
      this.$store.state.category.savedGenres.forEach(element => {
        this.genres.push(element);
      });
    });
  }
};
</script>

<style scoped></style>
