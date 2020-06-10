<template>
  <v-content style="overflow:scroll; padding: 0px;">
    <navigation-bar></navigation-bar>
    <v-container
      fluid
      style="height: 80%; background-color: lightblue;"
      class="wrap"
    >
      <v-content class="centering">
        <v-col cols="12" lg="12" md="12" sm="12" xs="12">
          <v-row justify="center" align-content="center">
            <p class="display-1" style="text-align: center; ">
              <strong> Sorry we couldn't find that page 😔</strong>
            </p>
          </v-row>
        </v-col>
      </v-content>
    </v-container>
    <Footer></Footer>
  </v-content>
</template>

<script>
import NavigationBar from "../components/Homepage/TheHomepageNavigationBar.vue";
import Footer from "../components/Homepage/TheHomepageFooter";

/**
 * A page for all Urls not found in our website
 * @displayName Not Found
 * @example [none]
 */
export default {
  name: "notfound",
  components: {
    NavigationBar,
    Footer
  }
};
</script>

<style scoped>
.root {
  background-color: lightblue;
}

.centering {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  height: 50%;
  width: 95%;
  margin: auto;
}

.wrap {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  -webkit-box-direction: normal;
  color: #fff;
  box-sizing: border-box;
}
</style>
