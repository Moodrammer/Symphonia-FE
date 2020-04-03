<template>
  <v-content
    :style="{
      backgroundImage: 'url(' + image + ')',
      backgroundSize: '100% Auto'
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
        <div style="width:1835px; background:grey">
        <v-row mb-0 pb-0>
        <v-icon color="white" class="ml-12 mr-4">mdi-play</v-icon>
        <img :src="cardItems.items[0].image" width="50" height="50">  
        <p class="subtitle-2 my-auto ml-4 white--text">{{cardItems.items[0].name}}</p>
        <v-spacer></v-spacer>
        <p class="subtitle-2 my-auto mr-12 white--text">...</p>
        <p class="subtitle-2 my-auto mr-12 white--text">44:44</p>
        </v-row> 
    </div>
   
    <h1 class="white--text ml-10">Albums</h1>
        <CardGrid :cardItems="cardItems" v-on:order="menuOrder" cardStyle="artistui" />


    <h1 class="white--text ml-10">Singles and EPs</h1>
        <CardGrid :cardItems="cardItems" v-on:order="menuOrder" cardStyle="artistui" />


    <h1 class="white--text ml-10">Compilations</h1>
        <CardGrid :cardItems="cardItems" v-on:order="menuOrder" cardStyle="artistui" />


    <h1 class="white--text ml-10">Appears On</h1>
        <CardGrid :cardItems="cardItems" v-on:order="menuOrder" cardStyle="artistui" />

    </v-content>
  </v-content>
</template>

<script>
import CardGrid from '../components/general/CardGrid';
export default {

components:{
    CardGrid
},
data: function(){
    return{
      image : "https://amrdiab.net/wp-content/uploads/2016/04/AhlaWAhla-2News.jpg",
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
        items:
        [
         {
            name: "Ame Diab Awi", 
            image: "https://amrdiab.net/wp-content/uploads/2016/04/AhlaWAhla-2News.jpg",
            id: "11111",
            url: "url to be added"
         },
         {
            name: "Ame Diab Awi",
            image: "https://amrdiab.net/wp-content/uploads/2016/04/AhlaWAhla-2News.jpg",
            id: "11222111",
            url: "url to be added"
         },
         {
            name: "Ame Diab Awi",
            image: "https://amrdiab.net/wp-content/uploads/2016/04/AhlaWAhla-2News.jpg",
            id: "11333111",
            url: "url to be added"
         },
         {
            name: "Ame Diab Awi",
            image: "https://amrdiab.net/wp-content/uploads/2016/04/AhlaWAhla-2News.jpg",
            id: "14441111",
            url: "url to be added"
         }


        ]
      }
    };


}


}
</script>

<style>
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
