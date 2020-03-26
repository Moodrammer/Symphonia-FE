<template>
  <v-app>
    <nav-drawer></nav-drawer>
    <nav-bar></nav-bar>

    <router-view></router-view>
    <sound-player file="http://localhost:8080/example.mp3" />
  </v-app>
</template>

<script>
import NavDrawer from "../components/WebNavDrawer";
import NavBar from "../components/WebNavBar";
import SoundPlayer from "../components/TheSoundPlayer/TheSoundPlayer.vue"
export default {
  components: {
    NavDrawer,
    NavBar,
    SoundPlayer
  }
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
