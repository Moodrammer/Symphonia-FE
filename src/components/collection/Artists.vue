<template>
  <v-content class="pa-0 mr-5">
    <h1>Artists</h1>
    <CardGrid :cardItems="cardItems" v-on:order="menuOrder" cardStyle="artist" />
  </v-content>
</template>

<script>
import CardGrid from "../general/CardGrid";
import { mapGetters, mapActions } from "vuex";
import getuserToken from "../../mixins/userService";

export default {
  name: "Artists",
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
          { title: "Unfollow" },
          { title: "Copy Artist link" }
        ],
        showMenu: false,
        // Albums Cards data section
        // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered album visable - albums: hardcoded data "placeholders"
        hoveredCardIndex: null,
        items: []
      }
    };
  },
  methods:{
    ...mapActions(["getFollowedArtists", "unfollowArtist"]),
    menuOrder(menuItem, cardIndex){
      this.contextMenuChoice = menuItem;
      this.contextMenuCardIndex = cardIndex;
    },

  },
  mixins: [getuserToken],
  async created(){
    try {
        this.getFollowedArtists({token:await this.getuserToken()});
    }
    catch (error) {
        console.log("error" + error);
    }
  },

  computed: mapGetters(['allFollowedArtists']),

  watch: {
    contextMenuChoice: async function() {
      if (this.contextMenuChoice === null)
        return;
      console.log(this.contextMenuChoice);
      console.log(this.contextMenuCardIndex);
      if(this.contextMenuChoice === "Unfollow")
      {
        try{
            this.unfollowArtist({artists:[this.contextMenuCardIndex],token: await this.getuserToken()});
        }
        catch (error) {
        console.log("error" + error);
        }
      }
      this.contextMenuChoice = null
      },
      allFollowedArtists(newValue){
        this.cardItems.items = newValue
      }
  },
};
</script>
