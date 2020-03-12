<template>
  <v-navigation-drawer app dark color="black" left fixed permanent > 
    <v-list color="black" nav>
      <v-list-item >
        <router-link to="/webhome">
         <v-img src="../assets/spotify.png" max-width="130" max-height="45" class="ma-4" ></v-img>
        </router-link>
      </v-list-item>

      <v-list-item
        v-for="item in items"
        :key="item.text"
        router
        :to="item.route"
        > 
          <v-icon class="mr-2">{{ item.icon }}</v-icon>
          <v-list-item-title  >{{ item.text }}</v-list-item-title>
      </v-list-item>

      <v-list-item-subtitle class="ml-2" >
        PLAYLISTS
      </v-list-item-subtitle>

        <v-list-item>
          <v-btn color="white" fab x-small>
            <v-icon color="black">mdi-plus</v-icon>
          </v-btn>
          <v-list-item-title>Create Playlist</v-list-item-title>
        </v-list-item>

         <v-list-item>
          <v-btn class="liked" fab x-small>
            <v-icon color="white">mdi-cards-heart</v-icon>
          </v-btn>
          <v-list-item-title>Liked Songs</v-list-item-title>
        </v-list-item>

    
      <v-divider></v-divider>

    </v-list>
  </v-navigation-drawer> 
</template>

<script>
export default {
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

        ],
      playlists: [
        {
          icon: "mdi-plus",
          text: "Create Playlist",
          color: "white",
          iconcolor: "black"
        },
        {
          icon: "mdi-cards-heart",
          text: "Liked Songs",
          route: "/likedsongs",
          color: "red",
          iconcolor: "white"
        }
      ]  
      }
    }
}
</script>

<style  scoped>
button{
  border-radius: 0%;
  margin-right: 7%
}
.liked{

  background-image: linear-gradient(135deg, #450af5,#c4efd9);
}
</style>