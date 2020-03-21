<template>
  <v-content style="overflow:hidden; padding: 0px;">
    <NavigationBar />
    <Content />
    <Footer />
  </v-content>
</template>

<script>
import NavigationBar from "../components/Homepage/TheHomepageNavigationBar.vue";
import Content from "../components/Homepage/TheHomepagePremiumContent.vue";
import Footer from "../components/Homepage/TheHomepageFooter";

export default {
  name: "App",

  components: {
    NavigationBar,
    Content,
    Footer,
  },

  data: () => ({}),
};
</script>

<style scoped></style>
