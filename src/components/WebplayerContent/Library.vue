<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="mx-4">
      <router-view :contextMenu="contextMenu"></router-view>
    </v-container>
  </v-content>
</template>

<script>
import getuserToken from "../../mixins/userService/getUserToken";

export default {
  name: "Library",
  mixins: [getuserToken],
  props: ["contextMenu"]
};
</script>
