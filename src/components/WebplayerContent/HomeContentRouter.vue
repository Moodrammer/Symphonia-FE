<template>
  <!--This component to handle the home content of the webplayer according to user state-->
  <HomeConentLogout v-if="!loggedIn" />
  <HomeContentLogin v-else />
</template>

<script>
//Importing the required components
import HomeContentLogin from "./HomeContentLogin.vue";
import HomeConentLogout from "./HomeContentLogout.vue";
/**
 * This component to handle the home content of the webplayer according to user state
 * @displayName Home Content Router
 * @example [none]
 */
export default {
  props: {
    loggedIn: Boolean
  },
  components: {
    HomeContentLogin,
    HomeConentLogout
  }
};
</script>
