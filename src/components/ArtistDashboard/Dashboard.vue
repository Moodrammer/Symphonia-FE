<template>
  <v-app>
    <Drawer></Drawer>

    <v-content class="content-container">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Drawer from "./Drawer.vue";
import getuserID from "../../mixins/userService/getuserID";
import getuserType from "../../mixins/userService/getuserType";
/**
 * @displayName Artist Dashboard
 * @example [none]
 */
export default {
  mixins: [getuserType, getuserID],
  components: {
    Drawer
  },
  created() {
    console.log(this.getuserID())
    console.log(this.getuserType())
    console.log(this.$route.params.id)
    console.log(this.$route.params)
    console.log(this.$route)
    if (
      !this.getuserID() ||
      this.getuserID() != this.$route.params.id ||
      this.getuserType() != "artist"
    )
      this.$router.push("/webhome");
  }
};
</script>

<style>
.content-container {
  background: #1a1a1a;
  height: 100%;
}
</style>
