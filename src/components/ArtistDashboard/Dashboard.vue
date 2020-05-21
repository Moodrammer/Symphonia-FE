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


export default {
    components :{
        Drawer,
        Albums
    },
}
</script>

<style>
.content-container {
  background: #1a1a1a;
  height: 100%;
}
</style>