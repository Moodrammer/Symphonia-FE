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
import getuserToken from "../../mixins/userService/getUserToken";
import getuserID from "../../mixins/userService/getuserID";
import isLoggedIn from "../../mixins/userService/isLoggedIn";
/**
 * @displayName Context Menu
 * @example [none]
 */
export default {
  name: "ContextMenu",
  data() {
    return {
      id: null,
      type: null,
      menuList: null,
      //initial data to be manipulated after the user make a right click
      artistMenu: [],
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
        case "Follow":
          this.followArtist();
          break;
        case "Unfollow":
          this.unfollowArtist();
          break;
      }
    },

    playlistAction(action) {
      //switch on all options and then execute the suitable action
      switch (action) {
        case "Make secret":
          this.makePlaylistSecret();
          break;

        case "Make public":
          this.makePlaylistPublic();
          break;

        case "Delete":
          this.deleteUserPlaylist();
          break;

        case "Save to Your Library":
          this.followPlaylist();
          break;

        case "Remove from your Library":
          this.unfollowPlaylist();
          break;

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

        case "Copy Song Link":
          this.copyToClipboard(
            `https://zasymphonia.ddns.net/webhome/album/${this.id}`
          );
          break;
      }
    },

    async artist() {
      this.$store.dispatch("artist/isFollowingArtists", {
        artists: [this.id],
        token: this.getuserToken()
      });

      this.artistMenu = [];
      if (this.isFollowedArtist) {
        this.artistMenu.push("Unfollow");
      } else this.artistMenu.push("Follow");
      this.artistMenu.push("Copy Artist Link");
      this.menuList = this.artistMenu;
    },
    async playlist() {
      await this.$store.dispatch("playlist/getPlaylist", {
        playlistID: this.id,
        isMenu: true
      });
      await this.$store.dispatch("playlist/checkFollowed", {
        playlistId: this.id,
        usersID: [this.getuserID()],
        token: this.getuserToken()
      });
      this.playlistMenu = [];
      this.playlistMenu.push("Start Radio");

      if (this.isOwnedPlaylist) {
        if (this.isPublicPlaylist) this.playlistMenu.push("Make secret");
        else this.playlistMenu.push("Make public");
        this.playlistMenu.push("Delete");
      } else {
        if (this.isPlaylistSaved)
          this.playlistMenu.push("Remove from your Library");
        else this.playlistMenu.push("Save to Your Library");
      }
      this.playlistMenu.push("Copy Playlist Link");

      this.menuList = this.playlistMenu;
    },
    async album() {
      await this.$store.dispatch("album/checkFollowed", {
        albumID: [this.id],
        token: this.getuserToken()
      });

      this.albumMenu = [];
      this.albumMenu.push("Start Radio");

      if (this.isAlbumSaved) this.albumMenu.push("Remove from your Library");
      else this.albumMenu.push("Save to Your Library");

      this.albumMenu.push("Add to Playlist");

      this.albumMenu.push("Copy Album Link");

      this.menuList = this.albumMenu;
    },
    async track() {
      await this.$store.dispatch("track/checkSaved", {
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
    //                        Track's Function
    //-----------------------------------------------------------------
    /**
     * Function to save a track for user
     * @public This is a public method
     * @param {none}
     */
    saveTrack() {
      this.$store.dispatch("track/saveTrack", {
        id: [this.id],
        token: this.getuserToken()
      });
    },

    /**
     * Function to remove this song from user's the saved tracks
     * @public This is a public method
     * @param {none}
     */
    async removeTrackForUser() {
      await this.$store.dispatch("track/removeSavedTrack", {
        id: [this.id],
        token: this.getuserToken()
      });
      this.$store.commit("track/changeUpdateTracks");
    },

    /**
     * Function to add this track to a user's playlist(already existing playlist or new playlist)
     * @public This is a public method
     * @param {none}
     */
    addToPlaylist() {
      this.$store.commit("playlist/setAddedTracks", [this.id]);
      this.$store.commit("playlist/changeAddTrackModel");
    },

    /**
     * Function to remove this track from this playlist , get called only from user's playlists
     * @public This is a public method
     * @param {none}
     */
    async removeTrackFromPlaylist() {
      await this.$store.dispatch("playlist/removePlaylistTrack", {
        token: this.getuserToken(),
        playlistID: this.$route.params.id,
        ids: [this.id]
      });
    },
    //-----------------------------------------------------------------
    //                     Album Functions
    //-----------------------------------------------------------------
    followAlbum() {
      this.$store.dispatch("album/followAlbum", {
        albumID: this.id,
        token: this.getuserToken()
      });
    },
    async unfollowAlbum() {
      await this.$store.dispatch("album/unfollowAlbum", {
        id: this.id,
        token: this.getuserToken()
      });
    },
    async addAlbumTracksToPlaylist() {
      await this.$store.dispatch("album/getAlbum", this.id);
      this.$store.commit(
        "playlist/setAddedTracks",
        this.$store.state.album.singleAlbum.tracks
      );
      this.$store.commit("playlist/changeAddTrackModel");
    },
    //----------------------------------------------------------------
    //                       Playlist Functions
    //----------------------------------------------------------------
    /**
     * Function to make an owned playlist secret from the menu list
     * @public This is a public method
     * @param {none}
     */
    makePlaylistSecret() {
      this.$store.dispatch("playlist/changeDetails", {
        playlistID: this.id,
        public: false,
        token: this.getuserToken()
      });
    },

    /**
     * Function to make an owned playlist public from the menu list
     * @public This is a public method
     * @param {none}
     */
    makePlaylistPublic() {
      this.$store.dispatch("playlist/changeDetails", {
        playlistID: this.id,
        public: true,
        token: this.getuserToken()
      });
    },

    /**
     * Function to delete an owned playlist from the menu list
     * @public This is a public method
     * @param {none}
     */
    deleteUserPlaylist() {
      this.$store.commit("playlist/setPlaylistID", this.id);
      this.$store.commit("playlist/changeDeleteModel");
    },

    /**
     * Function to follow a playlist from the menu list
     * @public This is a public method
     * @param {none}
     */
    followPlaylist() {
      this.$store.dispatch("playlist/followPlaylist", {
        id: this.id,
        token: this.getuserToken()
      });
    },

    /**
     * Function to unfollow a playlist from the menu list
     * @public This is a public method
     * @param {none}
     */
    async unfollowPlaylist() {
      await this.$store.dispatch("playlist/unfollowPlaylist", {
        id: this.id,
        token: this.getuserToken()
      });
    },

    //----------------------------------------------------------------
    //                       Artist Functions
    //----------------------------------------------------------------

    /**
     * Function to follow artist from the menu list
     * @public This is a public method
     * @param {none}
     */
    followArtist() {
      this.$store.dispatch("artist/followArtist", {
        artists: [this.id],
        token: this.getuserToken()
      });
    },

    /**
     * Function to unfollow artist from the menu list
     * @public This is a public method
     * @param {none}
     */
    unfollowArtist() {
      this.$store.dispatch("artist/unfollowArtist", {
        artists: [this.id],
        token: this.getuserToken()
      });
    },

    /**
     * Function to check if the user follow the artist selected by the menu list
     * @public This is a public method
     * @param {none}
     */
    checkFollowingArtist() {
      this.$store.dispatch("artist/isFollowingArtists", {
        artists: [this.id],
        token: this.getuserToken()
      });
    }
  },

  computed: {
    /**
     * Function to check if the user saves this song or not , gets called at the menu click
     * @public This is a public method
     * @param {none}
     */
    isTrackSaved() {
      return this.$store.state.track.generalLiked;
    },
    inUserPlaylist() {
      if (this.$route.name == "playlist/:id") {
        return (
          this.$store.state.playlist.singlePlaylist.owner._id ==
          this.getuserID()
        );
      } else return false;
    },
    isAlbumSaved() {
      return this.$store.state.album.isFollowdAlbum;
    },
    isPublicPlaylist() {
      return this.$store.state.playlist.menuPlaylist.public;
    },
    isPlaylistSaved() {
      return this.$store.state.playlist.isFollowed;
    },
    isOwnedPlaylist() {
      return (
        this.$store.state.playlist.menuPlaylist.owner._id == this.getuserID()
      );
    },
    isFollowedArtist() {
      let followed =
        this.$store.state.artist.FollowingArtistsBool &&
        this.$store.state.artist.FollowingArtistsBool[0];
      return followed;
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
