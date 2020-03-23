<template>
  <!--the webplayer navigation drawer-->
  <v-navigation-drawer app dark color="black" left fixed permanent>
    <v-list color="black" nav class="list">
      <!--logo and organization name (todo:change it to symphonia)-->
      <v-list-item>
        <router-link to="/webhome/home">
          <h1 class="ma-5 pl-4 white--text">Symphonia</h1>
        </router-link>
      </v-list-item>

      <!--Navigation drawer list of items -->
      <v-list-item
        v-for="item in items"
        :key="item.text"
        router
        :to="item.route"
        :id="item.text"
        class="listItem mainMenu"
        active-class="active"
      >
        <v-icon class="mr-2">{{ item.icon }}</v-icon>

        <v-list-item-title class="draweritem white--text">
          {{ item.text }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item-subtitle class="ml-2">PLAYLISTS</v-list-item-subtitle>

      <!--Nesting the popup-->
      <create-playlist></create-playlist>

      <v-list-item to="/webhome/collection/tracks" class="listItem" active-class="active" tag="p">
        <v-btn class="liked" fab x-small id="liked">
          <v-icon color="white">mdi-cards-heart</v-icon>
        </v-btn>
        <v-list-item-title>Liked Songs</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>
      <!--Playlist will be printed from here-->

      <v-list-item
        v-for="playlist in playlists"
        :key="playlist.id"
        class="listItem"
      >
        <v-list-item-title class="draweritem white--text">
          {{ playlist.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import CreatePlaylist from "./CreatePlaylist";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    CreatePlaylist
  },
  methods: {
    ...mapActions("playlist", ["getPlaylists"])
  },
  mounted() {
    this.getPlaylists();
  },
  computed: mapState({
    playlists: state => state.playlist.playlists
  }),
  data: function() {
    return {
      items: [
        {
          icon: "mdi-home-variant",
          text: "Home",
          route: "/webhome/home"
        },
        {
          icon: "mdi-magnify",
          text: "Search",
          route: "/webhome/search"
        },
        {
          icon: "mdi-bookshelf",
          text: "Your Library",
          route: "/webhome/collection"
        }
      ]
    };
  }
};
</script>

<style scoped>
.liked {
  background-image: linear-gradient(135deg, #450af5, #c4efd9);
  border-radius: 0%;
  margin-right: 7%;
}

.listItem {
  opacity: 0.6;
}

.listItem:hover {
  opacity: 1;
}

a{
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}
.active {
  opacity: 1;
}
</style>
