<template>

  <div class="home" style="background-color: #121212; min-height:768px ">
    <drawer class="mr-12"></drawer>
    <v-content>
    <div class="collection-toolbar mb-12">

      <v-app-bar color="transparent" app class="px-10 nav-bar-gradient">
        <v-btn fab class="mx-2" text dark small>
          <v-icon color="grey" large>mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn fab class="mx-2" text dark small>
          <v-icon color="grey" large>mdi-chevron-right</v-icon>
        </v-btn>
        <div class="mx-3" min-width="600">
          <v-btn text color="white" class="mx-2" :to="{name:'Playlists'} ">
            <span class="text-capitalize white--text">Playlists</span>
          </v-btn>

          <v-menu offset-y dark v-model="showMenu">
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                :text="selectedItem == 'More..' "
                width="100"
                v-on="on"
                class="hidden-lg-and-up"
              >
                <span class="text-capitalize white--text">{{ selectedItem }}</span>
                <v-icon v-if="showMenu" color="grey" right>mdi-menu-up</v-icon>
                <v-icon v-else color="grey" right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in moreMenu" :key="index" :to="{ name: item }">
                <v-list-item-title class="text-capitalize white--text">{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn text color="white" class="mx-2 hidden-md-and-down" :to="{name:'Artists'}">
            <span class="text-capitalize white--text">Artists</span>
          </v-btn>
          <v-btn text color="white" class="mx-2 hidden-md-and-down" :to="{name:'Albums'}">
            <span class="text-capitalize white--text">Albums</span>
          </v-btn>
        </div>
      </v-app-bar>

    </div>
    <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import  drawer from './WebNavDrawer'
export default {
  name: "Library",
  components: {
    drawer
  },

  data() {
    return {
      showMenu: false,
      selectedItem: "More..",
      moreMenu: ["More..", "Artists", "Albums"]
    };
  },
  created() {
    this.itemChosen(this.$route.name);
  },
  watch: {
    $route: function() {
      this.itemChosen(this.$route.name);
      console.log(this.$route.name);
    }
  },
  methods: {
    log(x) {
      console.log(x);
    },
    itemChosen(item) {
      if (item == "Artists") {
        this.selectedItem = "Artists";
        this.moreMenu = ["Albums"];
      } else if (item == "Albums") {
        this.selectedItem = "Albums";
        this.moreMenu = ["Artists"];
      } else {
        this.selectedItem = "More..";
        this.moreMenu = ["Artists", "Albums"];
      }
    }
  }
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
