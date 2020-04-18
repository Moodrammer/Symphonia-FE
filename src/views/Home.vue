<template>
  <v-content style="overflow:hidden; padding: 0px;">
    <NavigationBar />
    <Content v-if="!isLoggedIn()" />
    <ContentLoggedIn v-if="isLoggedIn()" />
    <Footer />
  </v-content>
</template>

<script>
import NavigationBar from "../components/Homepage/TheHomepageNavigationBar.vue";
import Content from "../components/Homepage/TheHomepageContent.vue";
import Footer from "../components/Homepage/TheHomepageFooter";
import ContentLoggedIn from "../components/Homepage/TheHomepageLoginContent.vue";
import isLoggedIn from "../mixins/userService";
import { mapMutations } from "vuex";

/**
 * The homepage view
 * @version 1.0.0
 */

export default {
  name: "Homepage",

  components: {
    NavigationBar,
    Content,
    Footer,
    ContentLoggedIn
  },

  methods: {
    ...mapMutations("homepage", ["setHomepageInstance"])

  },
  mounted: function() {
    this.setHomepageInstance(this);
  },

  mixins: [isLoggedIn]
};
</script>

<style scoped></style>
