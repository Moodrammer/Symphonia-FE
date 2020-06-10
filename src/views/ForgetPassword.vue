<template>
  <div>
    <v-container fluid>
      <v-app-bar app absolute color="black" flat>
        <router-link to="/">
          <v-row>
            <v-img src="/s11.png" max-width="30px"></v-img>
            <h2 class="white--text">Symphonia</h2>
          </v-row>
        </router-link>
      </v-app-bar>
      <router-view></router-view>
    </v-container>
    <!-- <Footer></Footer> -->
    <v-footer app absolute color="black" height="200px"> </v-footer>
  </div>
</template>

<script>
/**
 * The Forget password page used by the user to reset his password
 * @displayName Forget Password
 * @example [none]
 */
export default {
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>
