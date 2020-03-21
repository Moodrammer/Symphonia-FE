<template>
  <v-content style="overflow:hidden; padding: 0px;">
    <NavigationBar />
    <Content />
    <Footer />
  </v-content>
</template>

<script>
import NavigationBar from "../components/TheHomepageNavigationBar.vue";
import Content from "../components/TheHomepageContent.vue";
import Footer from "../components/TheHomepageFooter";

export default {
  name: "App",

  components: {
    NavigationBar,
    Content,
    Footer
  },

  data: () => ({})
};
</script>

<style scoped></style>
