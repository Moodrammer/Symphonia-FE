<template>
  <div class="home" style="background-color: #121212">
    <div class="collection-toolbar mb-12">
      <v-app-bar color="transparent" app class="px-10 nav-bar-gradient">
        <v-btn fab class="mx-2" text dark small>
          <v-icon color="grey" large>mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn fab class="mx-2" text dark small>
          <v-icon color="grey" large>mdi-chevron-right</v-icon>
        </v-btn>
        <v-container class="mx-3">
          <v-btn
            text
            color="white"
            class="mx-2"
            to="/library/playlists"
            ><span class="text-capitalize white--text">Playlists</span></v-btn
          >
          <v-btn
            text
            color="white"
            class="mx-2"
            to="/library/artists"
            ><span class="text-capitalize white--text">Artists</span></v-btn
          >
          <v-btn
            text
            color="white"
            class="mx-2"
            to="/library/albums"
            ><span class="text-capitalize white--text">Albums</span></v-btn
          >
        </v-container>
      </v-app-bar>
    </div>
        <router-view class="pt-10"></router-view>
  </div>
</template>

<script>
export default {
  name: "Library",
  components: {},

  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style>
  .nav-bar-gradient{
background: rgb(0,0,0);
background: radial-gradient(circle, rgba(0,0,0,0.7150210425967262) 0%, rgba(0,0,0,1) 100%);  }
</style>
