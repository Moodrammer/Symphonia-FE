<template>
  <v-content class="pa-0 mr-5">
    <h1>Artists</h1>
    <CardGrid :cardItems="cardItems" cardStyle="artist" />
  </v-content>
</template>

<script>
import CardGrid from "../CardGrid";
export default {
  name: "Artists",
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
          { title: "Unfollow" },
          { title: "Copy Artist link" }
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
          }
        ]
      }
    };
  },
  watch: {
    "cardItems.showMenu": function() {
      if (this.cardItems.showMenu) console.log(this.cardItems.hoveredCardIndex);
    }
  }
};
</script>
