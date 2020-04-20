<template>
  <v-app>
    <!--Sending a prop to the drawer to be updated after logout-->
    <nav-drawer :loggedIn="isLoggedIn()"></nav-drawer>
    <nav-bar></nav-bar>
    <router-view :loggedIn="isLoggedIn()" :contextMenu=contextMenu></router-view>
    <delete-playlist v-if="deletePlaylist" />
    <add-track-to-playlist v-if="addTrack" />
    <create-playlist v-if="createPlaylist" />
    <sound-player v-if="isLoggedIn()" />
    <sound-player-logout v-if="!isLoggedIn()" />
    <ContextMenu ref="context"/>
  </v-app>
</template>

<script>
import ContextMenu from "../components/general/ContextMenu"
import NavDrawer from "../components/WebplayerLayout/WebNavDrawer";
import NavBar from "../components/WebplayerLayout/WebNavBar";
import isLoggedIn from "../mixins/userService";
import SoundPlayer from "../components/TheSoundPlayer/TheSoundPlayer.vue";
import SoundPlayerLogout from "../components/TheSoundPlayer/TheSoundPlayerLogout.vue";
import DeletePlaylist from "../components/DeletePlaylist.vue";
import CreatePlaylist from "../components/CreatePlaylist.vue";
import AddTrackToPlaylist from "../components/AddTrackToPlaylist.vue";

/**
 * The webplayer view it contains (the side bar - the navigation bar - the sound player)
 * @displayName Webplayer Home
 * @example [none]
 */
export default {
  data(){
    return{contextMenu:{event:null,type:null,id:null}}
  },
  components: {
    ContextMenu,
    NavDrawer,
    NavBar,
    SoundPlayer,
    SoundPlayerLogout,
    DeletePlaylist,
    CreatePlaylist,
    AddTrackToPlaylist
  },
  watch:{
    "contextMenu.id":function(){
      if(this.contextMenu.id != null)
      {
        this.$refs.context.openMenu(this.contextMenu.event, this.contextMenu.id, this.contextMenu.type);
        this.contextMenu.id = null
      }
    }
  },
  mounted: function() {
    //Handle the updateContent event by force the component to update
    this.$root.$on("updateContent", () => {
      this.$forceUpdate();
    });
  },
  computed: {
    deletePlaylist() {
      return this.$store.state.playlist.deletePlaylist;
    },
    createPlaylist() {
      return this.$store.state.playlist.createPlaylist;
    },
    addTrack() {
      return this.$store.state.playlist.addTrack;
    }
  },
  mixins: [isLoggedIn]
};
</script>

<style scoped>
.root {
  background-color: #1a1a1a;
}
.main {
  grid-area: main-view;
  width: 100%;
  position: relative;
}
</style>
