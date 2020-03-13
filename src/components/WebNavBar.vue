<template>
  <v-app-bar color="#1a1a1a" app >
       <v-btn fab x-small color="black" class="mr-4 ml-7">
        <v-icon color="grey darken-1" large>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn fab x-small color="black">
        <v-icon color="grey darken-1" large>mdi-chevron-right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn outlined  rounded class="upgarde white--text px-8 py-2">UPGARDE</v-btn>
      <v-btn rounded color="#282828" class="profile white--text pa-0">
        <v-btn fab x-small color="grey darken-4" class="ml-1">
        <v-icon color="white" class="mx-2">mdi-account-outline</v-icon>
        </v-btn> 
        UserName
        <v-icon color="white">mdi-menu-down</v-icon>
      </v-btn>

  </v-app-bar>
</template>

<script>
export default {
  
}
</script>

<style scoped>

.upgarde{
  border:2px solid #fff;
  font-size: 12px;
  border-radius: 500px;
  margin-right: 30px;
  transition: all ease-in;
  transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
}

.upgarde:hover{
  size: 150%

}

.profile{
  border-radius:23px; 
  font-size: 10px;
}
</style>