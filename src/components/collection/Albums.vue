<template>
  <v-content class="pa-0 mr-5">
    <h1>Albums</h1>
    <CardGrid :cardItems="cardItems" :contextMenu="contextMenu" />
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardGrid from "../general/CardGrid";
import getuserToken from "../../mixins/userService/getUserToken";

export default {
  name: "Albums",
  props: ["contextMenu"],
  components: {
    CardGrid
  },
  data() {
    return {
      // contextMenuChoice: null,
      // contextMenuCardIndex: null,
      cardItems: {
        // Custom context menu data section
        // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
        // menuList: [
        //   { title: "Start Radio" },
        //   { title: "Remove from your Library" },
        //   { title: "Add to Playlist" },
        //   { title: "Copy Album link" }
        // ],
        // showMenu: false,
        // // Albums Cards data section
        // // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered album visable - items: album details
        // hoveredCardIndex: null,
        items: null
      }
    };
  },
  mixins: [getuserToken],
  methods: {
    ...mapActions("album", ["getAlbums", "deleteAlbums"])
    /**
     * called when the user clicks on an aption from the context menu
     * @param {string} menuItem the option chosen by user
     * @param {string} cardID the id of the card which user clicked on it
     * @param {string} name the name of the grid that containg the card
     */
    // menuOrder(menuItem, cardIndex) {
    //   this.contextMenuChoice = menuItem;
    //   this.contextMenuCardIndex = cardIndex;
    // }
  },
  created() {
    try {
      this.getAlbums({ token: this.getuserToken() });
    } catch (error) {
      console.log(error);
    }
  },

  computed: mapGetters("album", ["allAlbums"]),

  watch: {
    // contextMenuChoice: function() {
    //   if (this.contextMenuChoice === null) return;
    //   console.log(this.contextMenuChoice);
    //   console.log(this.contextMenuCardIndex);
    //   if (this.contextMenuChoice === "Remove from your Library") {
    //     try {
    //       this.deleteAlbums({
    //         token: this.getuserToken(),
    //         albums: [this.contextMenuCardIndex]
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   this.contextMenuChoice = null;
    // },
    allAlbums(newValue) {
      this.cardItems.items = newValue;
    }
  }
};
</script>
