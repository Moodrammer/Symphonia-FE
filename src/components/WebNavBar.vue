<template>
  <v-app-bar color="#1a1a1a" class="bar" app flat>
    <v-btn fab x-small color="black" class="mr-4 ml-6">
      <v-icon color="grey darken-1" large>mdi-chevron-left</v-icon>
    </v-btn>

    <v-btn fab x-small color="black" class="hidden-md-and-down">
      <v-icon color="grey darken-1" large>mdi-chevron-right</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn outlined  rounded class="upgarde white--text px-8 py-2 hidden-sm-and-down">UPGARDE</v-btn>

    <v-btn rounded color="#282828" class="profile white--text pa-0">
      <v-btn fab x-small color="grey darken-4" class="ml-1">
        <v-icon color="white" class="mx-2">mdi-account-outline</v-icon>
      </v-btn> 

      <span class="hidden-md-and-down"> UserName</span>
      
      <v-icon color="white" class="hidden-md-and-down">mdi-menu-down</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
export default {
  data: function() {
    return {
      hover: false
    }
  },
  methods: {
    transparency: function(){
     
    }
  }
}
</script>

<style scoped>

.upgarde{
  border:2px solid #fff;
  font-size: 12px;
  border-radius: 500px;
  margin-right: 30px;
}

.upgarde:hover{
transform: scale(1.1, 1.1); 
}

.profile{
  border-radius:23px; 
  font-size: 10px;
}

</style>