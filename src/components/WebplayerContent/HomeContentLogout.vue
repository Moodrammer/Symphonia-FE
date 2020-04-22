<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <category
        v-for="category in categories"
        :key="category.categoryName"
        :name="category.categoryName"
        :seeAll="category.showSeeAll"
        :id="category.categoryID"
        :gridItems="category.list"
        :gridStyle="category.style"
        :contextMenu="contextMenu"
      ></category>
    </v-container>
  </v-content>
</template>

<script>
import Category from "../general/Category";
import { mapGetters } from "vuex";
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
    this.$store.dispatch("category/newReleases");
    this.$store.dispatch("category/loadGenres");
  },
  computed: mapGetters({
    categories: "category/categoriesGetter"
  }),
  props: ["contextMenu"]
};
</script>
