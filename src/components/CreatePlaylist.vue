<template slot="activator" >
  <v-dialog fullscreen v-model="dialog" >
    <!--Slot to activate the popup it will be shown in the drawer-->
    <template v-slot:activator="{ on }">
      <v-btn
        color="white"
        fab
        x-small
        v-on="on"
       
        v-on:keyup.esc="close"
        style="border-radius: 0px; margin-right: 7%"
        id="openPopup"
      >
        <v-icon color="black">mdi-plus</v-icon>
      </v-btn>
      <p v-on="on" class="pt-4">Create Playlist</p>
    </template>

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
      >
    
      <!--The actions of the popup cancel-create-->
      <v-btn
        color="white"
        outlined
        rounded
        @click="close"
        class="popbutton px-8 mx-8"
        id="cancel"
        >Cancel</v-btn
      >
      <v-btn
        class="white--text popbutton px-8"
        rounded
        @click="create"
        id="create"
        >Create</v-btn
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      dialog: false,
      name: ""
    };
  },
  methods: {
    create: function() {
      //if the input was empty the playlist name will be "New Playlist" (it allows duplicats)
      if (this.name == "") this.name = "New Playlist";

      this.$store.dispatch("playlist/createPlaylist", this.name);
      //Reset the input data and close the popup
      this.name = "";
      this.dialog = false;
    },

    close: function(){
      this.name="";
      this.dialog=false;
    }
  }
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

#create{
  color: #fff;
  background-color: #1aa34a;
  border-width: 0;
}

#create:hover{
  background-color: #1ed760;
}
.v-text-field {
  font-size: 32px;
}

#closeIcon{
  padding-top: 180px
}

#playlistName{
  padding-left: 50px;
}

.input{
 background-color: #282828; 
 height: 90px;
 width:100%;
 margin-bottom: 40px;
 padding-bottom: 20px;
 outline: none;
 font-size: 44px;
 font-weight: bold;
 caret-color: #1db954;
 justify-content: center;
}

::placeholder{
  color: #666666;
  font-size: 44px;
  font-weight: bold;
}

.playlist{
  background-color: #282828; 
  font-size: 14px;
  margin-bottom: 0%;
  padding-top: 20px;
  text-align: start;
  padding-left: 50px;
}

</style>
