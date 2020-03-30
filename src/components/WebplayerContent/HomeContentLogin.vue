<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <h1 v-for="(playlist,i) in playlists" :key="i">{{playlist}}</h1>
      <h1 v-for="(playlist,i) in popularPlaylists" :key="i">{{playlist}}</h1>
      <h1 v-for="(artist,i) in popularArtists" :key="i">{{artist}}</h1>
      <h1 v-for="(playlist,i) in popPlaylists" :key="i">{{playlist}}</h1>
      <h1 v-for="(playlist,i) in folkPlaylists" :key="i">{{playlist}}</h1>
      <h1 v-for="(playlist,i) in rockPlaylists" :key="i">{{playlist}}</h1>
      <h1 v-for="(playlist,i) in jazzPlaylists" :key="i">{{playlist}}</h1>


      <category
        v-for="section in sections"
        :key="section.categoryName"
        :name="section.categoryName"
        :subtitle="section.categorySubtitle"
        :seeAll="section.showSeeAll"
        :griditems="section.list"
        :gridStyle="section.style"
      ></category>
    </v-container>
  </v-content>
</template>

<script>
import Category from "../general/Category";
import { mapState } from "vuex";
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
      sections: [
        {
          categoryName: "Recently Played",
          categorySubtitle: "",
          showSeeAll: false,
          list: {
            menuList: [],
            showMenu: false,
            hoveredCardIndex: null,
            items: []
          },
          style: null
        },
        {
          categoryName: "Your heavy rotation",
          categorySubtitle: "",
          showSeeAll: false,
          list: {
            menuList: [],
            showMenu: false,
            // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
            hoveredCardIndex: null,
            items: []
          },
          style: null
        },
        {
          categoryName: "Your playlists",
          categorySubtitle: "",
          showSeeAll: false,
          list: {
            // Custom context menu data section
            // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
            menuList: [],
            showMenu: false,
            // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
            hoveredCardIndex: null,
            items: []
          },
          style: null
        },
        {
          categoryName: "Popular playlists",
          categorySubtitle: "",
          showSeeAll: true,
          list: {
            // Custom context menu data section
            // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
            menuList: [],
            showMenu: false,
            // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
            hoveredCardIndex: null,
            items: []
          },
          style: null
        },
        {
          categoryName: "Popular Artists",
          categorySubtitle: "",
          showSeeAll: true,
          list: {
            // Custom context menu data section
            // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
            menuList: [],
            showMenu: false,
            // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
            hoveredCardIndex: null,
            items: []
          },
          style: "artist"
        },
        {
          categoryName: "Pop",
          categorySubtitle: "",
          showSeeAll: true,
          list: {
            // Custom context menu data section
            // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
            menuList: [],
            showMenu: false,
            // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
            hoveredCardIndex: null,
            items: []
          },
          style: null
        },
        {
          categoryName: "Folk",
          categorySubtitle: "",
          showSeeAll: true,
          list: {
            // Custom context menu data section
            // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
            menuList: [],
            showMenu: false,
            // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
            hoveredCardIndex: null,
            items: []
          },
          style: null
        },
        {
          categoryName: "Rock",
          categorySubtitle: "",
          showSeeAll: true,
          list: {
            // Custom context menu data section
            // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
            menuList: [],
            showMenu: false,
            // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
            hoveredCardIndex: null,
            items: []
          },
          style: null
        },
                {
          categoryName: "Jazz",
          categorySubtitle: "",
          showSeeAll: true,
          list: {
            // Custom context menu data section
            // menuList: items of the menu - disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
            menuList: [],
            showMenu: false,
            // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered item visable
            hoveredCardIndex: null,
            items: []
          },
          style: null
        },
      ],
      artistMenu: [
        { title: "Start Radio" },
        { title: "Follow" },
        { title: "Copy Artist Link" }
      ],
      albumMenu: [
        { title: "Start Radio" },
        { title: "Save to Your Library" },
        { title: "Add to Playlist" },
        { title: "Copy Album Link" }
      ],
      playlistMenu: [
        { title: "Start Radio" },
        { title: "Save to Your Library" },
        { title: "Copy Playlist Link" }
      ]
    };
  },
  created: function(){
    this.$store.dispatch("playlist/getPlaylists");
    this.$store.dispatch("webplayerHome/getPopularPlaylists");
    this.$store.dispatch("webplayerHome/getPopularArtists");
    this.$store.dispatch("webplayerHome/getGenrePlaylists","pop");
    this.$store.dispatch("webplayerHome/getGenrePlaylists","rock");
    this.$store.dispatch("webplayerHome/getGenrePlaylists","jazz");
    this.$store.dispatch("webplayerHome/getGenrePlaylists","folk");
  },
  computed: mapState({
    //the playlists from the get request
    playlists: function(state) {
      var statePlaylists = state.playlist.likedPlaylists;
      var play = [];
      statePlaylists.forEach(element => {
        var k = {
          name: element.name,
          image: element.images[0].url,
          description: element.description
        };
        play.push(k);
      });
      this.sections[0].list.items = play;
      this.sections[0].list.menuList = this.playlistMenu;

      this.sections[1].list.items = play;
      this.sections[1].list.menuList = this.playlistMenu;

      this.sections[2].list.items = play;
      this.sections[2].list.menuList = this.playlistMenu;
    },
    popularPlaylists: function(state) {
      var statePlaylists = state.webplayerHome.popularPlaylists;
      var play = [];
      statePlaylists.forEach(element => {
        var k = {
          name: element.name,
          image: element.images[0].url,
          description: element.description
        };
        play.push(k);
      });
      this.sections[3].list.items = play;
      this.sections[3].list.menuList = this.playlistMenu;
    },
    popularArtists: function(state) {
      var artists = state.webplayerHome.popularArtists;
      var artistsList = [];
      artists.forEach(element => {
        var k = {
          name: element.name,
          image: element.images[0].url,
          description: "Artist"
        };
        artistsList.push(k);
      });
      this.sections[4].list.items = artistsList;
      this.sections[4].list.menuList = this.artistMenu;
    },
  
  popPlaylists: function(state) {
    var playlists = state.webplayerHome.popPlaylists;
    var popList = [];
    playlists.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0].url,
        description: element.description
      };
      popList.push(k);
      this.sections[5].list.items = popList;
      this.sections[5].list.menuList = this.playlistMenu;
    });
  },
    folkPlaylists: function(state) {
    var playlists = state.webplayerHome.folkPlaylists;
    var folkList = [];
    playlists.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0].url,
        description: element.description
      };
      folkList.push(k);
      this.sections[6].list.items = folkList;
      this.sections[6].list.menuList = this.playlistMenu;
    });
  },
    rockPlaylists: function(state) {
    var playlists = state.webplayerHome.rockPlaylists;
    var rockList = [];
    playlists.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0].url,
        description: element.description
      };
      rockList.push(k);
      this.sections[7].list.items = rockList;
      this.sections[7].list.menuList = this.playlistMenu;
    });
  },
    jazzPlaylists: function(state) {
    var playlists = state.webplayerHome.jazzPlaylists;
    var jazzList = [];
    playlists.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0].url,
        description: element.description
      };
      jazzList.push(k);
      this.sections[8].list.items = jazzList;
      this.sections[8].list.menuList = this.playlistMenu;
    });
  },
  })
};
</script>
