<template>
  <CardGrid :cardItems="cardItems" />
</template>

<script>
import CardGrid from "../general/CardGrid";
import { mapGetters, mapActions } from "vuex";
import getuserToken from "../../mixins/userService/getUserToken";
/**
 * @displayName Artist Interface related artists
 * @example [none]
 */
export default {
  components: {
    CardGrid
  },
  methods: {
    ...mapActions("artist", ["getArtistRelatedArtists"])
  },

  computed: mapGetters("artist", ["allArtistRelatedArtists"]),

  data: function() {
    return {
      cardItems: {
        items: []
      }
    };
  },

  mixins: [getuserToken],
  props: ["artistID", "contextMenu"],
  created() {
    this.getArtistRelatedArtists({
      id: this.$props.artistID,
      token: this.getuserToken()
    });
  },

  watch: {
    allArtistRelatedArtists(newValue) {
      this.cardItems.items = newValue;
    }
  }
};
</script>

<style></style>
