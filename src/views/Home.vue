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

export default {
  name: "App",

  components: {
    NavigationBar,
    Content,
    Footer,
    ContentLoggedIn
  },

  data: () => ({}),

  methods: {
    isLoggedIn() {
      return true;
    }
  }
};
</script>

<style scoped></style>
