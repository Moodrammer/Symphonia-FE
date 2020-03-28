<template>
  <!-- App.vue -->
  <v-app>
    <!-- Sizes your content based upon application components -->
    <navBar />
    <v-content>
      <!-- Provides the application the proper gutter -->
      <premiumAds></premiumAds>
      <v-container fluid>
        <div class="container">
          <!-- the main container to the side bad & view router -->
          <div class="row" style="width: 1185px; margin:0px;">
            <!-- Side bar content -->
            <side-bar />
            <!-- Views go here from side bar -->
            <router-view></router-view>
          </div>
        </div>
      </v-container>
    </v-content>
    <appFooter />
  </v-app>
</template>

<script>
import PreAds from "../components/User Settings/PremiumAds.vue";
import sideBar from "../components/User Settings/sideBar.vue";
import overview from "../components/User Settings/overview.vue";
import editProfile from "../components/User Settings/editProfile.vue";
import recoverPlaylists from "../components/User Settings/recoverPlaylist.vue";
import navBar from "../components/Homepage/TheHomepageNavigationBar.vue";
import appFooter from "../components/Homepage/TheHomepageFooter.vue";
import changePassword from "../components/User Settings/changePass.vue";
import isLoggedIn from "@/mixins/userService";

export default {
  data() {
    return {};
  },
  components: {
    premiumAds: PreAds,
    sideBar: sideBar,
    // eslint-disable-next-line vue/no-unused-components
    overview: overview,
    // eslint-disable-next-line vue/no-unused-components
    editProfile: editProfile,
    // eslint-disable-next-line vue/no-unused-components
    recoverPlaylists: recoverPlaylists,
    // eslint-disable-next-line vue/no-unused-components
    changePassword: changePassword,
    navBar: navBar,
    appFooter: appFooter
  },
  mixins: [isLoggedIn],
  created() {
    //check if the user is logged in ?
    if (!this.isLoggedIn()) {
      this.$router.push("/login");
    }
  },
  beforeUpdate() {
    //check if the user is logged in ?
    if (!this.isLoggedIn()) {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Circular;
  src: url("https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff2")
      format("woff2"),
    url("https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff") format("woff"),
    url("https://open.scdn.co/fonts/CircularSpUIv3T-Book.ttf") format("ttf");
  font-style: normal;
  font-weight: 400;
}
.v-content {
  display: block;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: -webkit-box;
  display: flex;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -moz-flex: 1;
  -ms-flex: 1;
  -webkit-box-flex: 1;
  flex: 1;
  background-image: linear-gradient(#212c39, #121e3d 50%, #000);
  background-repeat: no-repeat;
}
.container {
  padding: 0;
}
.row {
  width: 1185px;
  margin: 0;
}
</style>
