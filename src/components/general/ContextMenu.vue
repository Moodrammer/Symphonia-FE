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
                    this.copyToClipboard(`https://zasymphonia.ddns.net/webhome/${this.type}/${this.id}`)
                    break;
                    
            }
        },

        playlistAction(action) {
            //switch on all options and then execute the suitable action
            switch(action) {
                case "Copy Playlist Link": 
                    this.copyToClipboard(`https://zasymphonia.ddns.net/webhome/${this.type}/${this.id}`)
                    break;
            }
        },

        albumAction(action) {
            //switch on all options and then execute the suitable action
            switch(action) {
                case "Copy Album Link": 
                    this.copyToClipboard(`https://zasymphonia.ddns.net/webhome/${this.type}/${this.id}`)
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
    

        copyToClipboard(url){
            var el = document.createElement("textarea");
            // Set value (string to be copied)
            el.value = url;
            // Set non-editable to avoid focus and move outside of view
            el.setAttribute("readonly", "");
            el.style = { position: "absolute", left: "-9999px" };
            document.body.appendChild(el);
            // Select text inside element
            el.select();
            // Copy text to clipboard
            document.execCommand("copy");
            // Remove temporary element
            document.body.removeChild(el);
        }
    },

}
</script>

<style lang="scss">
@import '~vue-context/src/sass/vue-context';
.v-context {
    padding: .5rem 0rem !important;
    background-color: #282828 !important;
    &, & ul {
        > li {
            > a {
                color: grey !important;
                background-color: #282828 !important;
                &:hover,
                &:focus {
                    color: white !important;
                    background-color: #333333 !important;
               }
            }
        }
    }
}
</style>