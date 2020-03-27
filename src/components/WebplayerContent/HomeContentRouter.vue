<template>
  <HomeConentLogout v-if="!isLoggedIn()"/>
  <HomeContentLogin v-else/>
</template>

<script>
import isLoggedIn from "../../mixins/userService";
import HomeContentLogin from "./HomeContentLogin.vue"
import HomeConentLogout from "./HomeContentLogout.vue"

export default {
  components: {
    HomeContentLogin,
    HomeConentLogout
  },
  mixins: [isLoggedIn]
};
</script>
