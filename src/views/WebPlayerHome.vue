<template>
  <v-app>
    <!--Sending a prop to the drawer to be updated after logout-->
    <nav-drawer :loggedIn="isLoggedIn()"></nav-drawer>
    <nav-bar></nav-bar>
    <router-view :loggedIn="isLoggedIn()"></router-view>
    <sound-player v-if="isLoggedIn()" />
    <sound-player-logout v-if="!isLoggedIn()" />
  </v-app>
</template>

<script>
import NavDrawer from "../components/WebplayerLayout/WebNavDrawer";
import NavBar from "../components/WebplayerLayout/WebNavBar";
import isLoggedIn from "../mixins/userService";
import SoundPlayer from "../components/TheSoundPlayer/TheSoundPlayer.vue";
import SoundPlayerLogout from "../components/TheSoundPlayer/TheSoundPlayerLogout.vue";

/**
 * The webplayer view it contains (the side bar - the navigation bar - the sound player)
 * @displayName Webplayer Home
 * @example [none]
 */
export default {
  components: {
    NavDrawer,
    NavBar,
    SoundPlayer,
    SoundPlayerLogout
  },
  mounted: function() {
    //Handle the updateContent event by force the component to update
    this.$root.$on("updateContent", () => {
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
