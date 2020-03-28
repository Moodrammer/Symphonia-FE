<template>
  <v-content class="pa-0 mr-5">
    <h1 v-for="(album,i) in albums" :key="i">{{album}}</h1>

    <h1>Albums</h1>
    <CardGrid :cardItems="cardItems" />
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
        // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered album visable - albums: hardcoded data "placeholders"
        hoveredCardIndex: null,
        items: [
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist"
          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist"
          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist"
          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist"
          },
          {
            name: "Amr Diab Collection",
            image:
              "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
            description: "1 new playlist"
          },
        ]
      }
    };
  },
  methods:{
    ...mapActions("album", ["getAlbums"])
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
          description: element.album.artists[0].name
        }
        albums.push(k);
        console.log(k);
      });      

      this.cardItems.items  = albums;
    }
  }),
  watch: {
    "cardItems.showMenu": function() {
      if (this.cardItems.showMenu) console.log(this.cardItems.hoveredCardIndex);
    }
  },
  created(){
  }
};
</script>
