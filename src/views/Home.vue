<template>
  <v-content style="overflow:hidden; padding: 0px;">
    <NavigationBar />
    <Content v-if="!isLoggedIn()" />
    <ContentLoggedIn v-if="isLoggedIn()" id="content" />
    <Footer />
  </v-content>
</template>

<script>
import NavigationBar from "../components/Homepage/TheHomepageNavigationBar.vue";
import Content from "../components/Homepage/TheHomepageContent.vue";
import Footer from "../components/Homepage/TheHomepageFooter";
import ContentLoggedIn from "../components/Homepage/TheHomepageLoginContent.vue";
import isLoggedIn from "../components/isLoggedIn"
export default {
  name: "App",

  components: {
    NavigationBar,
    Content,
    Footer,
    ContentLoggedIn
  },

  mounted: function() {
    this.$root.$on('forceUpdateContent', () => {
      // your code goes here
      this.$forceUpdate();
    });
  },

  mixins: [isLoggedIn]
};
</script>

<style scoped></style>
