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

/**
 * The Homepage premium view.
 * @version 1.0.0
 */

export default {
  name: "Homepage premium",

  components: {
    NavigationBar,
    Content,
    Footer
  }
};
</script>

<style scoped></style>
