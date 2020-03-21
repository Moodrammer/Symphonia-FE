<template>
  <v-app>
    <nav-drawer></nav-drawer>
    <nav-bar></nav-bar>

    <router-view></router-view>
  </v-app>
</template>

<script>
import NavDrawer from "../components/WebNavDrawer";
import NavBar from "../components/WebNavBar";
export default {
  components: {
    NavDrawer,
    NavBar
  },
  data: function() {
    return {
      hover: false
    };
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
