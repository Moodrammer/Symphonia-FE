<template>
  <v-content class="pa-0 mr-5">
    <h1>Playlists</h1>
    <CardGrid
      :cardItems="cardItems"
      v-on:order="menuOrder"
      cardStyle="playlist"
    />
  </v-content>
</template>

<script>
import CardGrid from "../general/CardGrid";

export default {
  name: "Playlists",
  components: {
    CardGrid
  },

  data() {
    return {
      // Custom context menu data section
      // menuList: items of the menu to be displayed "set to likedSongsMenu or playlistsMenu"
      // disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
      cardItems: {
        menuList: null,
        disableMenu: false,
        showMenu: false,
        likedSongsMenu: [{ title: "Copy Link" }],
        playlistsMenu: [
          { title: "Start Radio" },
          { title: "Make Secret" },
          { title: "Delete" },
          { title: "Copy Playlist link" }
        ],

        // Liked Songs Cards data section
        // likedSongs: hardcoded data "placeholders"
        likedSongs: [
          { title: "Lose your self", artist: "Eminem" },
          { title: "Lose your self", artist: "Eminem" },
          { title: "Lose your self", artist: "Eminem" },
          { title: "Lose your self", artist: "Eminem" },
          { title: "Lose your self", artist: "Eminem" },
          { title: "Lose your self", artist: "Eminem" },
          { title: "Lose your self", artist: "Eminem" },
          { title: "Lose your self", artist: "Eminem" },
          { title: "Lose your self", artist: "Eminem" },
          { title: "Lose your self", artist: "Eminem" }
        ],

        // Playlists Cards data section
        // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered playlist visable - playlists: hardcoded data "placeholders"
        hoveredCardIndex: null,
        items: [
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist",
            url:"eejnwe1",
            id:"8"
          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist",
            url:"gmlkg1",
            id:"7"
          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist",
            url:"gregrelgpo[few1",
            id:"6"
          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist",
            url:"'hrl[t1",
            id:"5"
          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist",
            url:"1mkgreognre",
            id:"4"
          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist",
            url:"1jorewiorjrwer",
            id:"3"

          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist",
            url:"12mfnernkjfre1",
            id:"2"
          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist",
            url:"1glreoreo",
            id:"1"
          }
        ]
      },
      contextMenuChoice: null,
      contextMenuCardIndex: null
    };
  },
  created() {},
  methods: {
    // cardHover: called when card is hover to save its index, and close other context menus
    // note: the index of the liked songs card = -1
    menuOrder(menuItem, cardIndex) {
      this.contextMenuChoice = menuItem;
      this.contextMenuCardIndex = cardIndex;
    }
  },
  watch: {
    contextMenuChoice: function() {
      if (this.contextMenuChoice === null) return;
      console.log(this.contextMenuChoice);
      console.log(this.contextMenuCardIndex);


      this.contextMenuChoice = null;
    }
  }
};
</script>

<style></style>
