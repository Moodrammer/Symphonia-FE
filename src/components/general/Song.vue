<template>
  <v-list-item
    class="my-2 songItem pa-3"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <v-icon class="mr-2 pb-9" color="white" v-if="hover">mdi-play</v-icon>
    <v-icon class="mr-2 pb-9" color="white" v-else>
      mdi-music-note-eighth
    </v-icon>
    <v-list-item-title class="draweritem white--text">
      {{ songName }}
      <v-list-item-subtitle class="mt-3 pl-3 white--text">
        <!--Display the artist and the album/playlist name-->
        <v-row>
          <p class="subtitle mr-2">{{ artistName }}</p>
          <p>.</p>
          <p class="subtitle ml-2">{{ albumName }}</p>
        </v-row>
      </v-list-item-subtitle>
      <!--To make the next elements start from the end-->
      <v-spacer></v-spacer>
    </v-list-item-title>

    <v-menu offset-x>
      <template v-slot:activator="{ on }">
        <!--Icon to activate the menu-->
        <div v-on="on">
          <v-icon color="white" class="mx-2" v-if="hover">
            mdi-dots-horizontal
          </v-icon>
        </div>
      </template>

      <!--Menu list-->
      <v-list color="#282828" dark class="mt-3">
        <v-list-item v-for="item in menuItems" :key="item.text">
          <v-list-item-title class="draweritem white--text">
            {{ item }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <p class="white--text ml-12">{{ min }}:{{ sec }}</p>
  </v-list-item>
</template>

<script>
/**
 * @example [none]
 */
export default {
  props: {
    songName: String,
    artistName: String,
    albumName: String,
    duration: Number,
    id: String
  },
  data: function() {
    return {
      menuItems: [
        "Start Radio",
        "Remove from your Liked Songs",
        "Add to Queue",
        "Add to Playlist",
        "Copy Song Link"
      ],
      hover: "false",
      min: 0,
      sec: 0
    };
  },
  created() {
    this.hover = false;
    this.convert(this.$props.duration);
  },
  methods: {
    /**
     * Convert the duration from ms to minutes and seconds
     * @public This is a public method
     * @param {Number} val the duration in ms
     */
    convert: function(val) {
      this.min = Math.floor((val / 1000 / 60) << 0);
      this.sec = Math.floor((val / 1000) % 60);
    }
  }
};
</script>

<style>
.subtitle {
  opacity: 0.6;
}

.subtitle:hover {
  opacity: 1;
  cursor: pointer;
  text-decoration: underline;
}

.songItem:hover {
  background-color: #282828;
}
</style>
