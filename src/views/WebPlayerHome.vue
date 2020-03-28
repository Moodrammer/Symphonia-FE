<template>
  <v-app>
    <!--Sending a prop to the drawer to be updated after logout-->
    <nav-drawer :loggedIn="isLoggedIn()"></nav-drawer>
    <nav-bar></nav-bar>
    <router-view
      style="
    /* TODO: style this scrollbar */
    overflow-x: hidden;
    overflow-y: scroll;
    height: 50px;
    "
      :loggedIn="isLoggedIn()"
    ></router-view>
    <sound-player
      :loggedIn="isLoggedIn()"
      file="http://localhost:8080/example.mp3"
    />
  </v-app>
</template>

<script>
import NavDrawer from "../components/WebplayerLayout/WebNavDrawer";
import NavBar from "../components/WebplayerLayout/WebNavBar";
import isLoggedIn from "../mixins/userService";
import SoundPlayer from "../components/TheSoundPlayer/TheSoundPlayer.vue";
/**
 * The webplayer view it contains (the side bar - the navigation bar - the sound player)
 * @displayName Webplayer Home
 * @example [none]
 */
export default {
  components: {
    NavDrawer,
    NavBar,
    SoundPlayer
  },
  mounted: function() {
    //Handle the updateContent event by force the component to update
    this.$root.$on("updateContent", () => {
      console.log("Force Update");
      this.$forceUpdate();
    });

    //hide the html scrollbar
    document.getElementById("html").classList.add("mystyle");
  },
  mixins: [isLoggedIn]
};
</script>

<style>
.mystyle {
  overflow-x: hidden;
}
.mystyle::-webkit-scrollbar {
  width: 0px;
}
</style>

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
