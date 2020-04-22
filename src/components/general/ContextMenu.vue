<template>
  <vue-context ref="menu">
    <li v-for="(option, index) in menuList" :key="index">
      <a href="#" @click.prevent="onClick($event.target.innerText)">{{
        option
      }}</a>
    </li>
  </vue-context>
</template>

<script>
import { VueContext } from "vue-context";
import getuserToken from "../../mixins/userService";
import getuserID from "../../mixins/userService";
import isLoggedIn from "../../mixins/userService";

export default {
  name: "ContextMenu",
  data() {
    return {
      id: null,
      type: null,
      menuList: null,
      //initial data to be manipulated after the user make a right click
      artistMenu: ["Follow", "Copy Artist Link"],
      playlistMenu: [],
      albumMenu: [],
      trackMenu: []
    };
  },
  mixins: [getuserToken, isLoggedIn, getuserID],
  components: {
    VueContext
  },

  methods: {
    openMenu($event, id, type) {
      this.id = id;
      this.type = type;
      console.log(id, type);
      switch (type) {
        case "artist":
          this.artist();
          break;
        case "playlist":
          this.playlist();
          break;
        case "album":
          this.album();
          break;
        case "track":
          this.track();
          break;
      }
      this.$refs.menu.open($event);
    },

    onClick(option) {
      switch (this.type) {
        case "artist":
          this.artistAction(option);
          break;
        case "playlist":
          this.playlistAction(option);
          break;
        case "album":
          this.albumAction(option);
          break;
        case "track":
          this.trackAction(option);
          break;
      }
    },

    artistAction(action) {
      //switch on all options and then execute the suitable action
      switch (action) {
        case "Copy Artist Link":
          this.copyToClipboard(
            `https://zasymphonia.ddns.net/webhome/${this.type}/${this.id}`
          );
          break;
      }
    },

    playlistAction(action) {
      //switch on all options and then execute the suitable action
      switch (action) {
        case "Copy Playlist Link":
          this.copyToClipboard(
            `https://zasymphonia.ddns.net/webhome/${this.type}/${this.id}`
          );
          break;
      }
    },

    albumAction(action) {
      //switch on all options and then execute the suitable action
      switch (action) {
        case "Save to Your Library":
          this.followAlbum();
          break;

        case "Remove from your Library":
          this.unfollowAlbum();
          break;

        case "Add to Playlist":
          this.addAlbumTracksToPlaylist();
          break;

        case "Copy Album Link":
          this.copyToClipboard(
            `https://zasymphonia.ddns.net/webhome/album/${this.id}`
          );
          break;
      }
    },
    trackAction(action) {
      switch (action) {
        case "Save to your Liked Songs":
          this.saveTrack();
          break;

        case "Remove from your Liked Songs":
          this.removeTrackForUser();
          break;

        case "Add to Playlist":
          this.addToPlaylist();
          break;

        case "Remove from this Playlist":
          this.removeTrackFromPlaylist();
          break;

        case "Copy Album Link":
          this.copyToClipboard(
            `https://zasymphonia.ddns.net/webhome/album/${this.id}`
          );
          break;
      }
    },

    artist() {
      this.menuList = this.artistMenu;
      //add checks like follow/unfollow and modify menuList
    },
    playlist() {
      this.menuList = this.playlistMenu;
      //checks
    },
    album() {
      this.$store.dispatch("album/checkFollowed", {
        albumID: [this.id],
        token: this.getuserToken()
      });

      this.albumMenu=[];
      this.albumMenu.push("Start Radio");

      if(this.isAlbumSaved)
        this.albumMenu.push("Remove from your Library");
      else
        this.albumMenu.push("Save to Your Library");

      this.albumMenu.push("Add to Playlist");

      this.albumMenu.push("Copy Album Link");

      this.menuList = this.albumMenu;
    },
    track() {
      this.$store.dispatch("track/checkSaved", {
        id: this.id,
        token: this.getuserToken()
      });
      this.trackMenu = [];

      this.trackMenu.push("Start Radio");

      if (this.isTrackSaved)
        this.trackMenu.push("Remove from your Liked Songs");
      else this.trackMenu.push("Save to your Liked Songs");

      this.trackMenu.push("Add to Queue");
      this.trackMenu.push("Add to Playlist");

      if (this.inUserPlaylist) this.trackMenu.push("Remove from this Playlist");

      this.trackMenu.push("Copy Song Link");

      this.menuList = this.trackMenu;
    },
    copyToClipboard(url) {
      var el = document.createElement("textarea");
      // Set value (string to be copied)
      el.value = url;
      // Set non-editable to avoid focus and move outside of view
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(el);
      // Select text inside element
      el.select();
      // Copy text to clipboard
      document.execCommand("copy");
      // Remove temporary element
      document.body.removeChild(el);
    },
    //-----------------------------------------------------------------
    //                        Track's FUnction
    //-----------------------------------------------------------------
    //Save a track to the current user's saved tracks
    saveTrack() {
      this.$store.dispatch("track/saveTrack", {
        id: [this.id],
        token: this.getuserToken()
      });
    },
    //Remove track from user's saved tracks
    removeTrackForUser() {
      this.$store.dispatch("track/removeSavedTrack", {
        id: [this.id],
        token: this.getuserToken()
      });
    },
    //Add this track to a playlist
    addToPlaylist() {
      this.$store.commit("playlist/setAddedTracks", [this.id]);
      this.$store.commit("playlist/changeAddTrackModel");
    },
    //Remove this track from this playlist (for owned playlists only)
    removeTrackFromPlaylist() {
      this.$store.dispatch("playlist/removePlaylistTrack", {
        token: this.getuserToken(),
        playlistID: this.$route.params.id,
        ids: [this.id]
      });
      this.$root.$emit("update");
    },
    //-----------------------------------------------------------------
    //                     Album Functions
    //-----------------------------------------------------------------
    followAlbum() {
      this.$store.dispatch("album/followAlbum", {
        id: this.id,
        token: this.getuserToken()
      });
    },
    async unfollowAlbum() {
      await this.$store.dispatch("album/unfollowAlbum", {
        id: this.id,
        token: this.getuserToken()
      });
    },
    addAlbumTracksToPlaylist() {
      this.$store.commit("playlist/setAddedTracks", this.$store.state.album.singleAlbum.tracks);
      this.$store.commit("playlist/changeAddTrackModel");
    }
  },
  computed: {
    isTrackSaved() {
      return this.$store.state.track.generalLiked;
    },
    inUserPlaylist() {
      if (this.$route.name == "playlist/:id") {
        return this.$store.state.playlist.playlistOwner == this.getuserID();
      } else return false;
    },
    isAlbumSaved() {
      return this.$store.state.album.followed;
    }
  }
};
</script>

<style lang="scss">
@import "~vue-context/src/sass/vue-context";
.v-context {
  padding: 0.5rem 0rem !important;
  background-color: #282828 !important;
  &,
  & ul {
    > li {
      > a {
        color: grey !important;
        background-color: #282828 !important;
        &:hover,
        &:focus {
          color: white !important;
          background-color: #333333 !important;
        }
      }
    }
  }
}
</style>
