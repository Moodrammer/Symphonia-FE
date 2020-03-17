<template>
  <v-app-bar color="#1a1a1a" class="bar" app flat>

    <!--To angle brackets to navigate with-->
    <v-btn fab x-small color="black" class="mr-4 ml-6" @click="prev" id="backward">
      <v-icon color="grey darken-1" large >mdi-chevron-left</v-icon>
    </v-btn>

    <v-btn fab x-small color="black" class="hidden-md-and-down" @click="next" id="forward">
      <v-icon color="grey darken-1" large >mdi-chevron-right</v-icon>
    </v-btn>

    <!--Spacer to make the next elements start from the end-->
    <v-spacer></v-spacer>

    <!--Button which routes to the preimum form-->
    <v-btn outlined  rounded class="upgarde white--text px-8 py-2 hidden-sm-and-down" id="upgarde">UPGARDE</v-btn>

    <!--A menu of account, upgarde to premium ,logout -->
    <v-menu  offset-y >
      <template v-slot:activator="{ on }" >
        <!--Button to activate the menu-->
        <v-btn rounded color="rgb(0,0,0,0.7)" class="profile white--text pa-0" v-on="on" id="dropMenu">
          <v-btn fab x-small color="rgb(0,0,0,0.7)" class="ml-1">
            <v-icon color="white" class="mx-2">mdi-account-outline</v-icon>
          </v-btn> 

          <span class="hidden-md-and-down"> UserName</span>
          <!--This to handle the icon changes when the menu is opened and closed-->
          <v-icon color="white" class="hidden-md-and-down" v-if="on">mdi-menu-down</v-icon>
          <v-icon color="white" class="hidden-md-and-down" v-else>mdi-menu-up</v-icon>
          
        </v-btn>
      </template>
      <!--Menu list-->
      <v-list color="#282828" dark class="mt-3">
        <v-list-item id="account">
          <v-list-item-title color="#b3b3b3" >Account</v-list-item-title>
        </v-list-item>
        
        <v-list-item class="hidden-md-and-up" id="upgardepremium" >
          <v-list-item-title>Upgarde to premium</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item id="logout">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>

export default {
  data: function() {
    return {
      hover: false,
      prevRoute:null
    }
  },
  methods: {
    //Some validations are needed 
    prev:function(){
      //the way to go backward             todo :Add the validation and change the buttons to disabled..
       this.$router.go(-1)
    },
    next:function(){
      //the way to go forward 
      this.$router.go(1)
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