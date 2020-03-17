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
          <v-btn text color="white" class="mx-2" to="/library/playlists">
            <span class="text-capitalize white--text">Playlists</span>
          </v-btn>

          <v-menu offset-y dark>
            <template v-slot:activator="{ on }">
              <v-btn dark text v-on="on" class="hidden-lg-and-up">More..</v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in moreMenu" :key="index" :to="item.path">
                <v-list-item-title :id="item.title">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          
          <v-btn text color="white" class="mx-2 hidden-md-and-down" to="/library/artists">
            <span class="text-capitalize white--text">Artists</span>
          </v-btn>
          <v-btn text class="mx-2 hidden-md-and-down" to="/library/albums">
            <span class="text-capitalize white--text">Albums</span>
          </v-btn>
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
    return {
      moreMenu: [{ title: "Artists", path:'/library/artists' }, { title: "Albums", path:'/library/albums' }]
    };
  },
  methods: {}
};
</script>

<style>
.nav-bar-gradient {
  background: rgb(0, 0, 0);
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.7150210425967262) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>
