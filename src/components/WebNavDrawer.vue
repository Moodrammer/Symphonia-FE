<template>
  <v-navigation-drawer app dark color="black" left fixed permanent > 
    <v-list color="black" nav class="list">
      <v-list-item >
        <router-link to="/webhome">
         <v-img src="../assets/spotify.png" max-width="130" max-height="45" class="ma-3" ></v-img>
        </router-link>
      </v-list-item>


      <v-list-item
        v-for="item in items"
        :key="item.text"
        router
        :to="item.route"
        > 
          <v-icon class="mr-2">{{ item.icon }}</v-icon>
          <v-list-item-title class="draweritem white--text" >{{ item.text }}</v-list-item-title>
      </v-list-item>

      <v-list-item-subtitle class="ml-2" >
        PLAYLISTS
      </v-list-item-subtitle>

      <v-list-item>
        <create-playlist ></create-playlist>
        <v-list-item-title>Create Playlist</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-btn class="liked" fab x-small>
          <v-icon color="white">mdi-cards-heart</v-icon>
        </v-btn>
        <v-list-item-title>Liked Songs</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>
       <!--Playlist will be printed from here-->
  
       <v-list-item
        v-for="playlist in playlists"
        :key="playlist.id"
        > 
          <v-list-item-title class="draweritem white--text" >{{ playlist.name }}</v-list-item-title>
      </v-list-item> 
    </v-list>
  </v-navigation-drawer> 
</template>

<script>
import CreatePlaylist from "./CreatePlaylist"
import { mapState } from 'vuex'
export default {
    components: {
      CreatePlaylist
    },
    mounted() {
      this.$store.dispatch("getPlaylists");
      },
    computed: mapState([
      'playlists'
      ]),
    data: function() {
      return {
        items: [
          {
            icon: "mdi-home-variant",
            text: "Home",
            route: "/webhome"
          },
          {
            icon: "mdi-magnify",
            text: "Search",
            route: "/search"
          },
          {
            icon: "mdi-bookshelf",
            text: "Your Library",
            route: "/Library"
          }

        ]
      }
    }
}
</script>

<style  scoped>

.liked{
  background-image: linear-gradient(135deg, #450af5,#c4efd9);
   border-radius: 0%;
  margin-right: 7%
}
.draweritem:hover v-list-item-title{
  color:white;
}

#newPlaylist{
  border: 0px;
  font-size: 48px;
}

input{
  font-size: 48px
}

</style>