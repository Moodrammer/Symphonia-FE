<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <h1 class="mb-3" v-if="isLoggedIn()">Recently played</h1>
    </v-container>
  </v-content>
</template>

<script>
import isLoggedIn from "../../mixins/userService";
/**
 * The webplayer home content if the user is logged in
 * @example [none]
 */
export default {
  data() {
    return {
      hover: "false"
    };
  },
  mixins: [isLoggedIn]
};
</script>
