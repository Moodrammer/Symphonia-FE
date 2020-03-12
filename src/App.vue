<template>
  <v-app style="overflow:hidden;">
    <NavBar />
    <Content />
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "./components/TheNavigationBar.vue";
import Content from "./components/TheHomepageContent.vue";
import Footer from "./components/TheHomepageFooter";

export default {
  name: "App",

  components: {
    NavBar,
    Content,
    Footer,
  },

  data: () => ({
    //
  })
};
</script>

<style scoped>
</style>
