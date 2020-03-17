<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>


export default {
  name: "App",
  data: () => ({}),
  
  created(){
    //if the user has no token stored initialize an empty user token
    if(localStorage.getItem('userToken') == null){
      localStorage.setItem('userToken' , '')
    }
  }

};
</script>

<style scoped></style>
