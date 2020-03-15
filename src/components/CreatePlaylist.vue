  <template>
    <v-dialog fullscreen slot="activator">
        <v-card color="rgb(0, 0, 0, 0.9)" class="white--text" >
          <v-container class=" align-center" fluid>
            <v-row    >
            <v-col class="pa-0 align-content-center">
          <v-btn fab color="transparent" @click="pop=false">
            <v-icon color="white" large>mdi-close</v-icon></v-btn>
          <v-card-title>
          <h1> Create new playlist</h1>
          
          </v-card-title>
   
           <p>Playlist Name</p>
             <v-text-field
           height="150px"
            placeholder="New Playlist"
            full-width
            color="#282828"
            label="Playlist Name"
            background-color="#282828"
             id="newPlaylist"
            ></v-text-field>
           
            
        
          <v-btn color="white" outlined rounded @click="pop=false" class="popbutton px-8" >Cancel </v-btn>
          <v-btn color="success" class="white--text popbutton px-8" rounded>Create </v-btn>

            </v-col>
            </v-row>
          </v-container>
               </v-card>   
      </v-dialog>
  </template>
  
  <script>
export default {
    data: function() {
      return {
        hover: false
      }
    }
}
</script>


  <style>
  
  </style>