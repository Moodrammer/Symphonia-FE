<template>
  <v-content class="pa-0 mr-5">
    <h1 v-for="(album,i) in albums" :key="i">{{album}}</h1>

    <h1>Albums</h1>
    <CardGrid :cardItems="cardItems" v-on:order="menuOrder" />
  </v-content>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CardGrid from "../general/CardGrid";

export default {
  name: "Albums",
  components: {
    CardGrid
  },
  data() {
    return {
      contextMenuChoice: null,
      contextMenuCardIndex: null,
      cardItems: {
        // Custom context menu data section
        // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
        menuList: [
          { title: "Start Radio" },
          { title: "Remove from your Library" },
          { title: "Add to Playlist" },
          { title: "Copy Album link" }
        ],
        showMenu: false,
        // Albums Cards data section
        // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered album visable - items: album details
        hoveredCardIndex: null,
        items: null
      }
    };
  },
  methods:{
    ...mapActions("album", ["getAlbums"]),
    ...mapActions("album", ["deleteAlbums"]),
    menuOrder(menuItem, cardIndex){
      this.contextMenuChoice = menuItem;
      this.contextMenuCardIndex = cardIndex;

    }
  },
  mounted(){
    this.getAlbums();
  },
  computed: mapState({
    //albums from the get request
    albums: function(state){
      var stateAlbums = state.album.albums
      var albums = []

      stateAlbums.forEach(element => {
        var k = {
          name: element.album.name,
          image: element.album.images[0].url,
          description: element.album.artists[0].name,
          id: element.album.id
        }
        albums.push(k);
      });      

      this.cardItems.items  = albums;
    }
  }),
  watch: {
    contextMenuChoice: function() {
      if (this.contextMenuChoice === null)
        return;
      console.log(this.contextMenuChoice);
      console.log(this.contextMenuCardIndex);
      if(this.contextMenuChoice === "Remove from your Library")
      {
          this.deleteAlbums([this.contextMenuCardIndex]);
      }
      this.contextMenuChoice = null
      }
  },
  created(){
  }
};
</script>
