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
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Homepage/TheHomepageFooter";

export default {
  components: {
    Footer
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>
