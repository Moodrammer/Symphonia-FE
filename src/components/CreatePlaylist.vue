<template slot="activator">
  <v-dialog fullscreen v-model="dialog">

    <!--Slot to activate the popup it will be shown in the drawer-->
    <template v-slot:activator="{ on }">
      <v-btn color="white" fab x-small  v-on="on" style="border-radius: 0px; margin-right: 7%" id="openPopup">
        <v-icon color="black">mdi-plus</v-icon> 
      </v-btn>
      <p v-on="on" class="pt-4">Create Playlist</p>
    </template>

    <v-card align="center" color="rgb(0,0,0,0.9)" class="white--text justify-content-center">

      <!--A button for closing the popup-->
      <v-btn fab color="rgb(0,0,0,0)"  @click="dialog = false" id="closeIcon" depressed  class="ml-10 mb-10">
        <v-icon color="white" large>mdi-close</v-icon>
      </v-btn>

      <h1 class="font-weight-bold display-2" > Create new playlist</h1>
      <!--take the playlist name from here--> 
      <v-text-field
        height="150px"
        placeholder="New Playlist"
        full-width
        color="success"
        label="Playlist Name"
        background-color="#282828"
        id="playlistName" 
        class="playlist font-weight-bold"
        autofocus
        v-model="name"
        v-on:keyup.enter="create"
        >
        </v-text-field>
        <!--The actions of the popup cancel-create-->
        <v-btn color="white" outlined rounded  @click="dialog = false" class="popbutton px-8 mx-8" id="cancel">Cancel </v-btn>
        <v-btn color="success" class="white--text popbutton px-8" rounded @click="create" id="create">Create </v-btn>
    </v-card>
  </v-dialog>
</template>
  
<script>

export default {
  data: function() {
    return {
      dialog: false,
      name: ""
    }
  },
  methods: {
    create: function(){
      //if the input was empty the playlist name will be "New Playlist" (it allows duplicats)
      if(this.name=="")
        this.name="New Playlist"
        
      this.$store
      .dispatch("playlist/createPlaylist",this.name) 
      //Reset the input data and close the popup 
      this.name=""
      this.dialog= false;
    }
  }
}
</script>

<style scoped>
.popbutton{
border-radius: 500px;
border:2px solid;
}
.v-text-field
{ 
font-size: 32px;
}
</style>
