<template>
  <!--the webplayer navigation drawer-->
  <v-navigation-drawer
    app
    dark
    color="black"
    :mini-variant="$vuetify.breakpoint.mdAndDown"
    left
    fixed
    permanent
  >
    <v-list color="black" nav class="list">
      <!--logo and organization name-->
      <v-list-item>
        <router-link to="/webhome/home">
          <v-row class="pa-3">
            <v-img src="../../assets/s11 .png" max-width="50px"></v-img>
            <h2
              display-4
              class="white--text"
              v-show="$vuetify.breakpoint.lgAndUp"
            >
              Symphonia
            </h2>
          </v-row>
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

      <!--This will be showed only if the user is logged in -->
      <v-list-item-subtitle
        class="ml-2"
        v-if="loggedIn"
        v-show="$vuetify.breakpoint.lgAndUp"
      >
        PLAYLISTS
      </v-list-item-subtitle>

      <!--Nesting the popup-->
      <!-- <create-playlist v-if="loggedIn"></create-playlist> -->
      <v-list-item
        class="listItem"
        @click="changeCreateModel"
        inactive
        v-if="loggedIn"
      >
        <v-btn
          fab
          x-small
          color="white"
          id="openPopup"
          style="border-radius: 0px; margin-right: 7%"
        >
          <v-icon color="black">mdi-plus</v-icon>
        </v-btn>
        <v-list-item-title v-show="$vuetify.breakpoint.lgAndUp"
          >Create Playlist</v-list-item-title
        >
      </v-list-item>

      <!--Liked Songs button-->
      <v-list-item
        to="/webhome/collection/tracks"
        class="listItem"
        active-class="active"
        v-if="loggedIn"
        id="likedItem"
      >
        <v-btn class="liked" fab x-small id="liked">
          <v-icon color="white">mdi-cards-heart</v-icon>
        </v-btn>
        <v-list-item-title v-show="$vuetify.breakpoint.lgAndUp">
          Liked Songs
        </v-list-item-title>
      </v-list-item>

      <v-divider v-if="loggedIn"></v-divider>

      <!--Playlist will be printed from here-->
      <div v-if="loggedIn">
        <v-list-item
          v-for="playlist in playlists"
          :key="playlist.id"
          class="listItem"
          :to="'/webhome/playlist/' + playlist.id"
          @contextmenu.prevent="menuClick($event, playlist.id)"
        >
          <v-list-item-title
            class="draweritem white--text"
            v-show="$vuetify.breakpoint.lgAndUp"
          >
            {{ playlist.name }}
          </v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import getuserToken from "../../mixins/userService/getUserToken";
import getuserType from "../../mixins/userService/getuserType";
import getuserID from "../../mixins/userService/getuserID";
/**
 * @displayName Webplayer Navigation Drawer
 * @example [none]
 */
export default {
  props: {
    loggedIn: Boolean,
    contextMenu: {
      event: null,
      type: null,
      id: null
    }
  },
  methods: {
    changeCreateModel: function() {
      this.$store.commit("playlist/changeCreateModel");
    },
    menuClick(event, playlistID) {
      this.$props.contextMenu.event = event;
      this.$props.contextMenu.id = playlistID;
      this.$props.contextMenu.type = "playlist";
    }
  },
  mounted() {
    this.$store.dispatch("playlist/getPlaylists", this.getuserToken());
  },
  computed: {
    playlists: function() {
      return this.$store.state.playlist.userSavedPlaylists;
    }
  },
  created() {
    if(this.getuserType() == 'artist')
      this.items.push({
        icon: "mdi-account-music",
        text: "Go to Symphonia Artist",
        route: `/SymphoniaArtist/${this.getuserID()}`
      })
  },
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
  },
  mixins: [getuserToken, getuserType, getuserID]
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
  cursor: pointer;
}

a {
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}
.active {
  opacity: 1;
}
.likedItem:before {
  background-color: rgba(0, 0, 0, 0);
}
</style>
