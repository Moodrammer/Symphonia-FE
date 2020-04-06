<template>
  <v-list-item
    class="my-2 songItem pa-3"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <v-icon
      class="mr-2 pb-9"
      v-if="hover && !disabled"
      v-bind:class="{ enabled: !playing, playing: playing }"
      >mdi-play</v-icon
    >
    <v-icon
      class="mr-2 pb-9"
      v-bind:class="{
        'disabled-1': disabled,
        enabled: !disabled && !playing,
        playing: playing
      }"
      v-else
    >
      mdi-music-note-eighth
    </v-icon>
    <v-list-item-title
      class="draweritem"
      v-bind:class="{
        'disabled-1': disabled,
        'white--text': !disabled && !playing,
        playing: playing
      }"
    >
      {{ songName }}
      <v-list-item-subtitle class="mt-3 pl-3 white--text">
        <!--Display the artist and the album/playlist name-->
        <v-row>
          <p class="subtitle mr-2" v-bind:class="{ 'disabled-2': disabled }">
            {{ artistName }}
          </p>
          <p>.</p>
          <p v-bind:class="{ 'disabled-2': disabled }" class="subtitle ml-2">
            {{ albumName }}
          </p>
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
    id: String,
    disabled: {
      type: Boolean,
      default: false
    },
    playing: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      menuItems: [
        this.convert,
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

.enabled {
  color: white !important;
}

.disabled-1 {
  color: #b3b3b3 !important;
}

.disabled-2 {
  color: #b3b3b3 !important;
  opacity: 0.6;
}

.playing {
  color: green !important;
}
</style>
