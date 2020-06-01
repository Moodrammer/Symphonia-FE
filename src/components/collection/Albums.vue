<template>
  <v-content class="pa-0 mr-5">
    <h1>Albums</h1>
    <CardGrid :cardItems="cardItems" :contextMenu="contextMenu" />
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardGrid from "../general/CardGrid";
import getuserToken from "../../mixins/userService/getUserToken";
/**
 * @displayName Library saved albums
 * @example [none]
 */
export default {
  name: "Albums",
  props: ["contextMenu"],
  components: {
    CardGrid
  },
  data() {
    return {
      cardItems: {
        items: null
      }
    };
  },
  mixins: [getuserToken],
  methods: {
    ...mapActions("album", ["getAlbums", "deleteAlbums"])
  },
  created() {
    this.getAlbums({ token: this.getuserToken() });
  },

  computed: mapGetters("album", ["allAlbums"]),

  watch: {
    allAlbums(newValue) {
      this.cardItems.items = newValue;
    }
  }
};
</script>
