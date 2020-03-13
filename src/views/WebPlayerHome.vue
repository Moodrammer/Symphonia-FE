<template>
<v-container color="#b3b3b3" class="root" fluid fill-height>
  <nav-drawer></nav-drawer>
 
 <nav-bar></nav-bar>
  <v-container
    fluid
    tag="section"
  >

  </v-container>
</v-container>
</template>

<script>

import NavDrawer from "../components/WebNavDrawer"
import NavBar from "../components/WebNavBar"
export default {
    components: {
      NavDrawer,
      NavBar
    }
}
</script>

<style scoped>
.root{
  background-color:#1a1a1a;
}
.main {
    grid-area: main-view;
    width: 100%;
    position: relative;
}
</style>