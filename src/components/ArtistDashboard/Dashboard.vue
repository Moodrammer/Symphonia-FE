<template>

<v-app>
    

    <Drawer></Drawer>
    
    <v-content class="content-container">
        <!-- <Albums></Albums> -->
    <router-view></router-view>   

    </v-content>

</v-app>

</template>




<script>

import Drawer from "./Drawer.vue";
import getuserID from "../../mixins/userService/getuserID";
import getuserType from "../../mixins/userService/getuserType";

export default {
    mixins:[getuserType, getuserID],
    components :{
        Drawer,
    },
    created(){
        console.log('id',this.getuserID())
        console.log('pid',this.$route.params.id)
        console.log('type',this.getuserType())

        if(!this.getuserID() || this.getuserID() != this.$route.params.id || this.getuserType() != 'artist')
            this.$router.push("/webhome");
    }
}
</script>

<style>
.content-container {
  background: #1a1a1a;
  height: 100%;
}
</style>