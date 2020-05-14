<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <!--Display the webplayer home sections if the user logged out-->
      <Category
        v-for="category in categories"
        :key="category.categoryName"
        :categoryName="category.categoryName"
        :seeAll="category.showSeeAll"
        :genreID="category.categoryID"
        :gridItems="category.list"
        :gridStyle="category.style"
        :contextMenu="contextMenu"
      />
    </v-container>
  </v-content>
</template>

<script>
import Category from "../general/Category";
/**
 * The webplayer home content if the user hasn't logged in yet
 * @displayName Home Content Logout
 * @example [none]
 */
export default {
  components: {
    Category
  },
  created: function() {
    //this.$store.dispatch("category/getNewReleases");
    this.$store.dispatch("category/loadGenres");
  },
  computed: {
    categories: function() {
      return this.$store.state.category.categories;
    }
  },
  props: {
    contextMenu: {}
  }
};
</script>
