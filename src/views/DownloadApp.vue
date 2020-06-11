<template>
  <v-app class="color">
    <navBar />
    <v-content>
      <v-container fluid>
        <div class="container">
          <h1>Discover our App</h1>
          <v-row>
            <v-col cols="12" md="8">
              <v-img src="../assets/perspective.png" />
            </v-col>
            <v-col
              cols="12"
              md="4"
              align-self="center"
              class="hidden-sm-and-down"
            >
              <v-img src="../assets/googlePlay.png" style="max-width:200px;" />
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col>
              <h2>Synphonia is available for Android devices</h2>
            </v-col>
          </v-row>
          <v-row justify="center" align="center" style="margin-bottom:50px;">
            <v-col style="all:inherit;">
              <v-btn large rounded
                ><v-img
                  src="../assets/playicon.png"
                  style="margin-right:2px;"
                />
                Download Now</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-content>
    <appFooter />
  </v-app>
</template>

<script>
import navBar from "../components/Homepage/TheHomepageNavigationBar.vue";
import appFooter from "../components/Homepage/TheHomepageFooter.vue";
export default {
  components: {
    navBar: navBar,
    appFooter: appFooter
  }
};
</script>

<style scoped>
@font-face {
  font-family: Circular;
  src: url("https://sp-bootstrap.global.ssl.fastly.net/8.12.4/fonts/circular-book.woff2")
      format("woff2"),
    url("https://sp-bootstrap.global.ssl.fastly.net/8.12.4/fonts/circular-book.woff")
      format("woff");
  font-style: normal;
  font-weight: 400;
}
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
body {
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  font-size: 18px;
  line-height: 1.5;
  color: #222326;
}
h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 1em 0 0.25em;
  font-size: 48px;
  text-align: center;
  color: cornsilk;
}
p {
  margin: 0.5em 0 1em;
  text-align: justify;
  padding-left: 1rem;
}
.color {
  background-image: url("../assets/bk.png");
  height: 240vh;
}
h2 {
  text-align: center;
  margin: auto;
  font-size: 30px;
  margin-bottom: 25px;
  color: cornsilk;
}
</style>
