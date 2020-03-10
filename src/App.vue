<template>
  <v-app>
    <NavBar/>
    <Content/>
  </v-app>
</template>

<script>
import NavBar from "./components/TheNavigationBar.vue";
import Content from "./components/TheHomepageContent.vue";

export default {
  name: "App",

  components: {
    NavBar,
    Content,
  },

  data: () => ({
    //
  })
};
</script>

<style scoped>

</style>
