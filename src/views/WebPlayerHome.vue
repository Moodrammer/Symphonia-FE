<template>
  <v-app>
    <nav-drawer :loggedIn="isLoggedIn()"></nav-drawer>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavDrawer from "../components/WebNavDrawer";
import NavBar from "../components/WebNavBar";
import isLoggedIn from "../mixins/userService";
/**
 * The webplayer view it contains (the side bar - the navigation bar - the sound player)
 * @displayName Webplayer Home
 * @example [none]
 */
export default {
  components: {
    NavDrawer,
    NavBar
  },
  mounted: function() {
    this.$root.$on('updateContent', () => {
      // your code goes here
      console.log("Force Update");
      this.$forceUpdate();
    });
  },
  mixins: [isLoggedIn]
};
</script>

<style scoped>
.root {
  background-color: #1a1a1a;
}
.main {
  grid-area: main-view;
  width: 100%;
  position: relative;
}
</style>
