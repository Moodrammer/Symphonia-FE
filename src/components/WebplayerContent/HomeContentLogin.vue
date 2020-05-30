<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <!--Display the webplayer home sections if the user logged in-->
      <Category
        v-for="category in categories"
        :key="category.categoryName"
        :categoryName="category.categoryName"
        :genreID="category.categoryID"
        :seeAll="category.showSeeAll"
        :gridItems="category.list"
        :contextMenu="contextMenu"
      />
    </v-container>
  </v-content>
</template>

<script>
import Category from "../general/Category";
import getuserToken from "../../mixins/userService/getUserToken";
/**
 * The webplayer home content if the user is logged in
 * @displayName Home Content Login
 * @example [none]
 */
export default {
  components: {
    Category,
  },
  created: function() {
    this.$store.dispatch("category/recentlyPlayedSection", this.getuserToken());
    this.$store.dispatch("category/getNewReleases");
    this.$store.dispatch("category/yourPlaylistsSection", this.getuserToken());
    this.$store.dispatch("category/loadGenres");
  },
  computed: {
    categories: function() {
      return this.$store.state.category.categories;
    }
  },
  mixins: [getuserToken],
  props: {
    contextMenu: {}
  }
};
</script>
