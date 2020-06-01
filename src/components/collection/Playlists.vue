<template>
  <v-content class="pa-0 mr-5">
    <h1>Playlists</h1>
    <CardGrid
      :cardItems="cardItems"
      :contextMenu="contextMenu"
      cardStyle="playlist"
    />
  </v-content>
</template>

<script>
import CardGrid from "../general/CardGrid";
import { mapGetters, mapActions } from "vuex";
import getuserToken from "../../mixins/userService/getUserToken";
/**
 * @displayName Library playlists
 * @example [none]
 */
export default {
  name: "Playlists",
  components: {
    CardGrid
  },
  props: ["contextMenu"],
  data() {
    return {
      cardItems: {
        likedSongs: [],
        items: []
      },
      contextMenuChoice: null,
      contextMenuCardIndex: null
    };
  },
  mixins: [getuserToken],
  created() {
    this.getPlaylists(this.getuserToken());
    this.getTracks(this.getuserToken());
  },
  computed: {
    ...mapGetters("playlist", ["likedPlaylists"]),
    ...mapGetters("track", ["tracksGetter"])
  },
  methods: {
    ...mapActions("playlist", ["getPlaylists"]),
    ...mapActions("track", ["getTracks"])
  },
  watch: {
    likedPlaylists: function(newValue) {
      this.cardItems.items = newValue;
    },
    tracksGetter: function(newValue) {
      this.cardItems.likedSongs = newValue;
    }
  }
};
</script>

<style></style>
