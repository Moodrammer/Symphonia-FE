<template>
  <v-dialog fullscreen v-model="dialog" @keydown.esc="close">
    <v-card
      align="center"
      color="rgb(0,0,0,0.9)"
      class="white--text justify-content-center"
    >
      <!--A button for closing the popup-->
      <v-btn
        fab
        color="rgb(0,0,0,0)"
        @click="close"
        id="closeIcon"
        depressed
        class="ml-10 mb-12"
      >
        <v-icon color="white" large>mdi-close</v-icon>
      </v-btn>

      <h1 class="font-weight-bold display-2 mb-9">Create new playlist</h1>

      <!--take the playlist name from here-->
      <p class="playlist">Playlist Name</p>
      <input
        class="input"
        id="playlistName"
        type="text"
        v-model="name"
        name="Playlist Name"
        placeholder="New Playlist"
        v-on:keyup.enter="create"
      />

      <!--The actions of the popup cancel-create-->
      <div id="createPlaylistActions">
        <v-btn
          color="white"
          outlined
          rounded
          @click="close"
          class="popbutton px-8 mx-8"
          id="cancel"
          >Cancel
        </v-btn>
        <v-btn
          class="white--text popbutton px-8"
          rounded
          @click="create"
          id="create"
          >Create
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import getDeviceSize from "../mixins/getDeviceSize";
import getuserToken from "../mixins/userService/getUserToken";
import getuserID from "../mixins/userService/getuserID";

/**
 * @displayName Create Playlist
 * @example [none]
 */
export default {
  data: function() {
    return {
      dialog: false,
      name: ""
    };
  },
  created() {
    this.dialog = this.$store.state.playlist.createPlaylist;
  },
  methods: {
    /**
     * Gets called when the user clicks on the create button or press enter
     * @public This is a public method
     * @param {none}
     */
    create: function() {
      //if the input was empty the playlist name will be "New Playlist" (it allows duplicats)
      if (this.name == "") this.name = "New Playlist";
      this.$store.dispatch("playlist/createPlaylist", {
        name: this.name,
        token: this.getuserToken(),
        id: this.getuserID()
      });
      //Reset the input data and close the popup
      this.name = "";
      this.$store.commit("playlist/changeCreateModel");
      this.dialog = false;
    },
    /**
     * Gets called when the user clicks on the cancel button or the close icon or press esc
     * @public This is a public method
     * @param {none}
     */
    close: function() {
      this.name = "";
      this.$store.commit("playlist/changeCreateModel");
      this.dialog = false;
    }
  },
  mixins: [getDeviceSize, getuserToken, getuserID]
};
</script>

<style scoped>
.popbutton {
  border-radius: 500px;
  border: 2px solid;
}

.popbutton:hover {
  transform: scale(1.05, 1.05);
}

#create {
  color: #fff;
  background-color: #1aa34a;
  border-width: 0;
}

#create:hover {
  background-color: #1ed760;
}

#closeIcon {
  padding-top: 180px;
}

#playlistName {
  padding-left: 50px;
}

.input {
  background-color: #282828;
  height: 90px;
  width: 100%;
  margin-bottom: 40px;
  padding-bottom: 20px;
  outline: none;
  font-size: 44px;
  font-weight: bold;
  caret-color: #1db954;
  justify-content: center;
}

::placeholder {
  color: #666666;
  font-size: 44px;
  font-weight: bold;
}

.playlist {
  background-color: #282828;
  font-size: 14px;
  margin-bottom: 0%;
  padding-top: 20px;
  text-align: start;
  padding-left: 50px;
}
</style>
