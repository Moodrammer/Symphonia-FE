<template>
  <!-- App.vue -->
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <premiumAds></premiumAds>
      <v-container fluid>
        <div class="container">
          <div class="row" style="width: 1185px; margin:0px;">
            <side-bar />
            <router-view></router-view>
          </div>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PreAds from "../components/User Settings/PremiumAds.vue";
import sideBar from "../components/User Settings/sideBar.vue";
import overview from "../components/User Settings/overview.vue";
import editProfile from "../components/User Settings/editProfile.vue";
import recoverPlaylists from "../components/User Settings/recoverPlaylist.vue";
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
    recoverPlaylists: recoverPlaylists
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
