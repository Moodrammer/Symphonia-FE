<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="mx-4">
      <router-view></router-view>
    </v-container>
  </v-content>
</template>

<script>
import getuserToken from "../../mixins/userService";

export default {
  name: "Library",
  mixins: [getuserToken],

  created() {
    console.log("token", this.getuserToken());
    if (!this.getuserToken()) {
      console.log("redirect to home");
      this.$router.push("../");
    }
  }
};
</script>
