<template>
    <CardGrid :cardItems="cardItems" v-on:order="menuOrder" cardStyle="artist" />
</template>

<script>
import CardGrid from "../general/CardGrid"
import { mapGetters, mapActions } from "vuex";
import getuserToken from "../../mixins/userService";

export default {
components:{
    CardGrid
},

methods:{
    ...mapActions(["getArtistRelatedArtists"]),
    menuOrder(menuItem, cardIndex, name){
        console.log(menuItem, cardIndex, name)
        this.albumsContextMenuChoice = menuItem;
        this.albumsContextMenuCardIndex = cardIndex;
    }

},

computed:mapGetters(["allArtistRelatedArtists"]),

data: function(){
    return{
        
        ContextMenuChoice: null,
        ContextMenuCardID: null,

        cardItems: {
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
    }
},

mixins: [getuserToken],

created(){
    console.log(this.$route.params.id);
    try{
      this.getArtistRelatedArtists({id:this.$route.params.id, token: this.getuserToken()});
    }
    catch (error) {
        console.log("error" + error);
    }
  },

watch: {
    allArtistRelatedArtists(newValue){
      this.cardItems.items = newValue
      console.log(newValue)
      },
  },

  
}
</script>

<style>

</style>