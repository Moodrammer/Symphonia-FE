<template>
  <v-app>
    <!--Sending a prop to the drawer to be updated after logout-->
    <NavDrawer :loggedIn="isLoggedIn()" :contextMenu="contextMenu" />
    <NavBar />
    <router-view
      :loggedIn="isLoggedIn()"
      :contextMenu="contextMenu"
    ></router-view>

    <!--Nesting the playlist's popups-->
    <DeletePlaylist v-if="deletePlaylist" />
    <AddTrackToPlaylist v-if="addTrack" />
    <CreatePlaylist v-if="createPlaylist" />
    <AdsPopup v-if="isAdsActive" />

    <!--Nesting the sound player component-->
    <SoundPlayer v-if="isLoggedIn()" />
    <SoundPlayerLogout v-if="!isLoggedIn()" />
    <ContextMenu ref="context" />
  </v-app>
</template>

<script>
import ContextMenu from "../components/general/ContextMenu";
import NavDrawer from "../components/WebplayerLayout/WebNavDrawer";
import NavBar from "../components/WebplayerLayout/WebNavBar";
import isLoggedIn from "../mixins/userService";
import SoundPlayer from "../components/TheSoundPlayer/TheSoundPlayer.vue";
import SoundPlayerLogout from "../components/TheSoundPlayer/TheSoundPlayerLogout.vue";
import DeletePlaylist from "../components/DeletePlaylist.vue";
import CreatePlaylist from "../components/CreatePlaylist.vue";
import AddTrackToPlaylist from "../components/AddTrackToPlaylist.vue";
import AdsPopup from "../components/Popups/AdsPopup.vue";

/**
 * The webplayer view it contains (the side bar - the navigation bar - the sound player)
 * @displayName Webplayer Home
 * @example [none]
 */
export default {
  data() {
    return { contextMenu: { event: null, type: null, id: null } };
  },
  components: {
    ContextMenu,
    NavDrawer,
    NavBar,
    SoundPlayer,
    SoundPlayerLogout,
    DeletePlaylist,
    CreatePlaylist,
    AddTrackToPlaylist,
    AdsPopup
  },
  watch: {
    contextID: function() {
      if (this.contextMenu.id != null) {
        this.$refs.context.openMenu(
          this.contextMenu.event,
          this.contextMenu.id,
          this.contextMenu.type
        );
        this.contextMenu.id = null;
      }
    },
    isLogoutUpdate: function() {
      if (this.isLogoutUpdate) {
        this.$store.commit("category/changeLogoutUpdate");
        this.$forceUpdate();
      }
    }
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
    },
    isAdsActive() {
      return this.$store.state.playlist.adsPopup;
    },
    isLogoutUpdate() {
      return this.$store.state.category.logoutUpdate;
    },
    contextID() {
      return this.contextMenu.id;
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
