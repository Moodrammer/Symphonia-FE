<template>
  <v-content
    :style="{
      backgroundImage: 'url(' + image + ')',
      backgroundSize: '100% Auto',
    }"
  >
    <div class="pl-10 pt-12 mt-12 gradient-body py-7">
      <p class="caption grey--text">638,490 MONTHLY LISTENERS</p>
      <h1 class="display-3 font-weight-bold white--text my-5">Amr Diab</h1>
      <v-btn rounded color="success" min-width="110" min-height="40" dark
        >Play</v-btn
      >
      <v-btn rounded outlined min-width="160" min-height="40" dark class="mx-3"
        >Unfollow</v-btn
      >
      <span class="display-2 white--text">...</span>
    </div>
    <v-content style="background:#1a1a1a" class="pt-10" fill-height>
      <!--  -->
      <h1 class="white--text ml-10" v-if="popularCardItems.items.length > 0">Popular</h1>
      <CardGrid
        :cardItems="popularCardItems"
        v-on:order="menuOrder"
        cardStyle="artistUIList"
        name="popular"
      />
      <!--  -->

      <h1 class="white--text ml-10" v-if="albumsCardItems.items.length > 0">Albums</h1>
      <CardGrid
        :cardItems="albumsCardItems"
        v-on:order="menuOrder"
        cardStyle="artistUICard"
        name="albums"
      />

      <!-- <h1 class="white--text ml-10" v-if="singlesCardItems.items.length > 0">Singles and EPs</h1> -->
      <CardGrid
        :cardItems="singlesCardItems"
        v-on:order="menuOrder"
        cardStyle="artistUICard"
      />

      <!-- <h1 class="white--text ml-10" v-if="appearsOnCardItems.items.length">Appears On</h1> -->
      <CardGrid
        :cardItems="appearsOnCardItems"
        v-on:order="menuOrder"
        cardStyle="artistUICard"
      />
    </v-content>
  </v-content>
</template>

<script>
import CardGrid from "../components/general/CardGrid";
import { mapGetters, mapActions } from "vuex";
import getuserToken from "../mixins/userService";

export default {
  components: {
    CardGrid,
  },
  computed: mapGetters(["allArtistAlbums", "allArtistTopTracks", "allArtistSingles", "allArtistAppearsOn"]),
  methods:{
    ...mapActions(["getArtistAlbums", "getArtistTopTracks", "getArtistSingles", "getArtistAppearsOn"]),
    menuOrder(menuItem, cardIndex, name){
      console.log(menuItem, cardIndex, name)
      if(name === "albums")
      {
        this.albumsContextMenuChoice = menuItem;
        this.albumsContextMenuCardIndex = cardIndex;
      }else if(name === "singles")
      {
        this.singlesContextMenuChoice = menuItem;
        this.singlesContextMenuCardIndex = cardIndex;
      }else if(name === "combilations")
      {
        this.combilationsContextMenuChoice = menuItem;
        this.combilationsContextMenuCardIndex = cardIndex;
      }else if(name === "appearsOn")
      {
        this.appearsOnContextMenuChoice = menuItem;
        this.appearsOnContextMenuCardIndex = cardIndex;
      }

    }
  },
  data: function() {
    return {
      image: "https://amrdiab.net/wp-content/uploads/2016/04/AhlaWAhla-2News.jpg",
      
      albumsContextMenuChoice: null,
      albumsContextMenuCardID: null,

      popularContextMenuChoice: null,
      popularContextMenuCardID: null,


      singlesContextMenuChoice: null,
      singlesContextMenuCardID: null,

      appearsOnContextMenuChoice: null,
      appearsOnContextMenuCardID: null,

      popularCardItems: {
        // Custom context menu data section
        // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
        menuList: [
          { title: "Start Radio" },
          { title: "Unfollow" },
          { title: "Copy Artist link" },
        ],
        showMenu: false,
        // Albums Cards data section
        // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered album visable - albums: hardcoded data "placeholders"
        hoveredCardIndex: null,
        items: [],
      },

      singlesCardItems: {
        // Custom context menu data section
        // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
        menuList: [
          { title: "Start Radio" },
          { title: "Unfollow" },
          { title: "Copy Artist link" },
        ],
        showMenu: false,
        // Albums Cards data section
        // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered album visable - albums: hardcoded data "placeholders"
        hoveredCardIndex: null,
        items: [],
      },
      albumsCardItems: {
        // Custom context menu data section
        // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
        menuList: [
          { title: "Start Radio" },
          { title: "Unfollow" },
          { title: "Copy Artist link" },
        ],
        showMenu: false,
        // Albums Cards data section
        // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered album visable - albums: hardcoded data "placeholders"
        hoveredCardIndex: null,
        items: [],
      },

      appearsOnCardItems: {
        // Custom context menu data section
        // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
        menuList: [
          { title: "Start Radio" },
          { title: "Unfollow" },
          { title: "Copy Artist link" },
        ],
        showMenu: false,
        // Albums Cards data section
        // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered album visable - albums: hardcoded data "placeholders"
        hoveredCardIndex: null,
        items: [],
      },

    };
  },
  mixins: [getuserToken],
  created(){
    console.log(this.$route.params.id);
    try{
      this.getArtistTopTracks({id:this.$route.params.id, token: this.getuserToken()});
      this.getArtistAlbums({id:this.$route.params.id, token: this.getuserToken()});
      this.getArtistSingles({id:this.$route.params.id, token: this.getuserToken()});
      this.getArtistAppearsOn({id:this.$route.params.id, token: this.getuserToken()});
    }
    catch (error) {
        console.log("error" + error);
    }
    finally{
      //allArtistAlbums", "allArtistTopTracks", "allArtistSingles", "allArtistAppearsOn
      console.log(this.allArtistAlbums)
      console.log(this.allArtistTopTracks)
    }
  },
  watch: {
    allArtistAlbums(newValue){
      this.albumsCardItems.items = newValue
      console.log(newValue)
      },

    allArtistTopTracks(newValue){
      this.popularCardItems.items = newValue
      console.log("oh",newValue)
      },


  },
};
</script>

<style>
.item {
  color: white;
}

.gradient-body {
  /* background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%); */
  background: rgb(26, 26, 26);
  background: linear-gradient(
    0deg,
    rgba(26, 26, 26, 1) 0%,
    rgba(26, 26, 26, 0) 100%
  );
}
</style>
