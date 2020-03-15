<template slot="activator">
  <v-dialog fullscreen v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="white" fab x-small  v-on="on" style="border-radius: 0px; margin-right: 7%" >
        <v-icon color="black">mdi-plus</v-icon> 
      </v-btn>
    </template>

    <v-card align="center" color="rgb(0,0,0,0.9)" class="white--text justify-content-center">
      <v-btn fab color="rgb(0,0,0,0)"  @click="dialog = false" depressed  class="ml-10 mb-10">
        <v-icon color="white" large>mdi-close</v-icon>
      </v-btn>

      <h1 class="font-weight-bold display-2" > Create new playlist</h1>

      <v-text-field
        height="150px"
        placeholder="New Playlist"
        full-width
        color="success"
        label="Playlist Name"
        background-color="#282828"
        id="newPlaylist" 
        class="playlist font-weight-bold"
        autofocus
        >
        </v-text-field>

        <v-btn color="white" outlined rounded  @click="dialog = false" class="popbutton px-8 mx-8" >Cancel </v-btn>
        <v-btn color="success" class="white--text popbutton px-8" rounded>Create </v-btn>
    </v-card>
  </v-dialog>
</template>
  
<script>
export default {
    data: function() {
      return {
        dialog: false
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
{ min-height: 100px; 
 font-size: 32px;
 caret-color: red;
 text-align: center;
}
#newPlaylist .v-input input{
  max-height: 60px !important;
}


</style>
