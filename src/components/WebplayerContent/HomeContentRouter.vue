<template>
  <!--This component to handle the home content of the webplayer according to user state-->
  <HomeConentLogout v-if="!isLoggedIn()" />
  <HomeContentLogin v-else />
</template>

<script>
//Importing the required components and mixins
import isLoggedIn from "../../mixins/userService";
import HomeContentLogin from "./HomeContentLogin.vue";
import HomeConentLogout from "./HomeContentLogout.vue";
/**
 * This component to handle the home content of the webplayer according to user state
 * @example [none]
 */
export default {
  components: {
    HomeContentLogin,
    HomeConentLogout
  },
  mixins: [isLoggedIn]
};
</script>
