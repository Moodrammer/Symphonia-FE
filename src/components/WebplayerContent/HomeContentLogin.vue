<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
    <category
        v-for="category in categories"
        :key="category.categoryName"
        :name="category.categoryName"
        :seeAll="category.showSeeAll"
        :griditems="category.list"
        :gridStyle="category.style"
      ></category>
    </v-container>
  </v-content>
</template>

<script>
import Category from "../general/Category";
import { mapGetters } from "vuex";
/**
 * The webplayer home content if the user is logged in
 * @example [none]
 */
export default {
  components: {
    Category
  },
  created: function(){
    this.$store.dispatch("category/loadUserSections");
    this.$store.dispatch("category/getPopularPlaylists");
    this.$store.dispatch("category/getPopularArtists");
    this.$store.dispatch("category/loadGenres");
  },
  computed: mapGetters({
    categories: 'category/categoriesGetter'
  })
};
</script>
