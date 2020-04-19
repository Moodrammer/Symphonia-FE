<template>
 
    <vue-context ref="menu">
        <li v-for="(option,index) in menuList" :key="index">
            <a href="#" @click.prevent="onClick($event.target.innerText)">{{option}}</a>
        </li>
    </vue-context>
    
</template>

<script>
import { VueContext } from 'vue-context';

export default {
    name: "ContextMenu",
    data(){
        return{
            id: null,
            type: null,
            menuList: null,
            //initial data to be manipulated after the user make a right click
            artistMenu:["Follow", "Copy Artist Link"],
            playlistMenu:["Save to Your Library", "Copy Playlist Link"],
            albumMenu:["Remove from Your Library", "Add to Playlist", "Copy Album Link"]
        }
    },

    components: {
        VueContext
    },
    
    methods: {

        openMenu($event, id, type){
            this.id = id;
            this.type = type;
            console.log(id, type);
            switch(type) {
                case "artist":
                    this.artist();
                    break;
                case "playlist":
                    this.playlist();
                    break;
                case "album":
                    this.album();
                    break;
            }
            this.$refs.menu.open($event);
        },


        onClick (option) {
            
            switch(this.type) {
                case "artist":
                    this.artistAction(option);
                    break;
                case "playlist":
                    this.playlistAction(option);
                    break;
                case "album":
                    this.albumAction(option);
                    break;
            }


        },
        
        artistAction(action) {
            //switch on all options and then execute the suitable action
            switch(action) {
                case "Copy Artist Link": 
                    alert("copy" + this.id + this.type);
                    break;
            }
        },

        playlistAction(action) {
            //switch on all options and then execute the suitable action
            switch(action) {
                case "Copy Playlist Link": 
                    alert("copy" + this.id + this.type);
                    break;
            }
        },

        albumAction(action) {
            //switch on all options and then execute the suitable action
            switch(action) {
                case "Copy Album Link": 
                    alert("copy" + this.id + this.type);
                    break;
            }
        },


        artist(){
            this.menuList = this.artistMenu;
            //add checks like follow/unfollow and modify menuList
        },
        playlist(){
            this.menuList = this.playlistMenu;
            //checks
        },
        album(){
            this.menuList = this.albumMenu;
            //checks
        },

    },

}
</script>

<style lang="scss">
@import '~vue-context/src/sass/vue-context';

</style>