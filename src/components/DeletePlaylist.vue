<template>
  <v-dialog fullscreen v-model="dialog">
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
        class="ml-10 "
      >
        <v-icon color="white" large>mdi-close</v-icon>
      </v-btn>

      <h1 class="font-weight-bold display-2 my-12">
        Do you really want to delete this playlist?
      </h1>

      <!--The actions of the popup cancel-create-->
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
        @click="deleted"
        id="deleted"
        >Delete
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import getDeviceSize from "../mixins/getDeviceSize";
import getuserToken from "../mixins/userService";
import getuserID from "../mixins/userService";

/**
 * @displayName Create Playlist
 * @example [none]
 */
export default {
  data: function() {
    return {
      dialog: null
    };
  },
  created() {
    this.dialog = this.$store.state.playlist.deletePlaylist;
  },
  methods: {
    /**
     * Gets called when the user clicks on the delete button or press enter
     * @public This is a public method
     * @param {none}
     */
    deleted: function() {
      this.$store.dispatch("playlist/deletePlaylist", this.getuserToken());
      this.$store.commit("playlist/changeDeleteModel");
      this.$router.push(`/webhome/collection/playlists`);
      this.dialog = false;
    },
    /**
     * Gets called when the user clicks on the cancel button or the close icon or press esc
     * @public This is a public method
     * @param {none}
     */
    close: function() {
      this.$store.commit("playlist/changeDeleteModel");
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

#deleted {
  color: #fff;
  background-color: #1aa34a;
  border-width: 0;
}

#deleted:hover {
  background-color: #1ed760;
}

#closeIcon {
  padding-top: 250px;
}
</style>
