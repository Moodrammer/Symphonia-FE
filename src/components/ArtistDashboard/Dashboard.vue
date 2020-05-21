<template>

<v-app>
    

    <Drawer></Drawer>
    
    <v-content class="content-container">
        <Albums></Albums>
    </v-content>

    <router-view></router-view>   
</v-app>

</template>




<script>

import Drawer from "./Drawer.vue";
import Albums from "./Albums.vue";
import getuserType from "../../mixins/userService";
import getuserID from "../../mixins/userService";


export default {
    mixins:[getuserType, getuserID],
    components :{
        Drawer,
        Albums
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