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
import { mapGetters, mapActions } from "vuex";
import getuserToken from "../../mixins/userService";

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
        likedSongs: [],

        // Playlists Cards data section
        // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered playlist visable - playlists: hardcoded data "placeholders"
        hoveredCardIndex: null,
        items: []
      },
      contextMenuChoice: null,
      contextMenuCardIndex: null
    };
  },
  mixins: [getuserToken],
  created() {
    try {
      this.getPlaylists(this.getuserToken());
      this.getTracks(this.getuserToken());
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    ...mapGetters("playlist", ["likedPlaylists"]),
    ...mapGetters("category", ["tracksGetter"])
  },
  methods: {
    ...mapActions("playlist", ["getPlaylists"]),
    ...mapActions("category", ["getTracks"]),
    /**
     * called when the user clicks on an aption from the context menu
     * @param {string} menuItem the option chosen by user
     * @param {string} cardID the id of the card which user clicked on it
     * @param {string} name the name of the grid that containg the card
     */

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
    },
    likedPlaylists: function(newValue) {
      this.cardItems.items = newValue;
    },
    tracksGetter: function(newValue) {
      this.cardItems.likedSongs = newValue;
    }
  }
};
</script>

<style></style>
