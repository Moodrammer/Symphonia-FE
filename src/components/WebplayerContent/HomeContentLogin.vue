<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <h1 v-for="(playlist,i) in playlists" :key="i">{{playlist}}</h1>
      <h1 v-for="(playlist,i) in popularPlaylists" :key="i">{{playlist}}</h1>

      <category v-for="section in sections" :key="section.categoryName"
        :name="section.categoryName"
        :subtitle="section.categorySubtitle"
        :seeAll="section.showSeeAll"
        :griditems ="section.list"
      ></category>
    </v-container>
  </v-content>
</template>

<script>
import Category from "../general/Category"
import { mapState, mapActions } from "vuex";
/**
 * The webplayer home content if the user is logged in
 * @example [none]
 */
export default {
  components: {
    Category
  },
  data() {
    return {
      sections:[
        {
         categoryName: "Recently Played",
         categorySubtitle:"",
         showSeeAll: false,
         list: {
          menuList: [],
          showMenu: false,
          hoveredCardIndex: null,
          items: []
          }
        },
        {
         categoryName: "Your heavy rotation",
         categorySubtitle:"",
         showSeeAll: false,
         list: {
          menuList: [],
          showMenu: false,
          // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
          hoveredCardIndex: null,
          items: []
          }
        },
        {
         categoryName: "Your playlists",
         categorySubtitle:"",
         showSeeAll: false,
         list: {
          // Custom context menu data section
          // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
          menuList: [],
          showMenu: false,
          // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
          hoveredCardIndex: null,
          items: []
          }
        },
        {
         categoryName: "Popular playlists",
         categorySubtitle:"",
         showSeeAll: true,
         list: {
          // Custom context menu data section
          // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
          menuList: [],
          showMenu: false,
          // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
          hoveredCardIndex: null,
          items: []
          }
        },
        {
         categoryName: "Popular Artists",
         categorySubtitle:"",
         showSeeAll: true,
         list: {
          // Custom context menu data section
          // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
          menuList: [],
          showMenu: false,
          // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
          hoveredCardIndex: null,
          items: []
          }
        }
      ],
      artistMenu: [
        {title: "Start Radio"},
        {title: "Follow"},
        {title: "Copy Artist Link"}
      ],
      albumMenu: [
        {title: "Start Radio"},
        {title: "Save to Your Library"},
        {title: "Add to Playlist"},
        {title: "Copy Album Link"}
      ],
      playlistMenu: [
        {title: "Start Radio"},
        {title: "Save to Your Library"},
        {title: "Copy Playlist Link"}
      ],
    };
  },
  methods: {
    ...mapActions("playlist", ["getPlaylists"]),
    ...mapActions("webplayerHome",["getPopularPlaylists"])
  },
  mounted() {
    this.getPlaylists();
    this.getPopularPlaylists();
  },
  computed: mapState({
    //the playlists from the get request
    playlists: function(state){
      var statePlaylists = state.playlist.likedPlaylists
      var play = []
            console.log(this.sections[0]);
      statePlaylists.forEach(element => {
        var k = {
          name: element.name,
          image: element.images[0].url,
          description: element.description
        }
        play.push(k);
      });         
      this.sections[0].list.items  = play;
      this.sections[0].list.menuList= this.playlistMenu;

            this.sections[1].list.items  = play;
      this.sections[1].list.menuList= this.playlistMenu;

            this.sections[2].list.items  = play;
      this.sections[2].list.menuList= this.playlistMenu;

                  this.sections[4].list.items  = play;
      this.sections[4].list.menuList= this.playlistMenu;
    },
    popularPlaylists: function(state){
      var statePlaylists = state.webplayerHome.popularPlaylists;
      console.log("state playlists")
      console.log(statePlaylists);
      var play = []
      statePlaylists.forEach(element => {
        var k = {
          name: element.name,
          image: element.images[0].url,
          description: element.description
        }
        play.push(k);
      });         
      this.sections[3].list.items  = play;
      this.sections[3].list.menuList= this.playlistMenu;
    }
  }),
};
</script>
