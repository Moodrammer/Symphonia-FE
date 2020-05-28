<template>
  <CardGrid :cardItems="cardItems" />
</template>

<script>
import CardGrid from "../general/CardGrid";
import { mapGetters, mapActions } from "vuex";
import getuserToken from "../../mixins/userService/getUserToken";

export default {
  components: {
    CardGrid,
  },

  methods: {
    ...mapActions("artist", ["getArtistRelatedArtists"]),
    menuOrder(menuItem, cardIndex, name) {
      console.log(menuItem, cardIndex, name);
      this.albumsContextMenuChoice = menuItem;
      this.albumsContextMenuCardIndex = cardIndex;
    },
  },

  computed: mapGetters("artist", ["allArtistRelatedArtists"]),

  data: function() {
    return {
      cardItems: {
        items: [],
      },
    };
  },

  mixins: [getuserToken],
  props: ["artistID"],
  created() {
    this.getArtistRelatedArtists({
      id: this.$props.artistID,
      token: this.getuserToken(),
    });
  },

  watch: {
    allArtistRelatedArtists(newValue) {
      this.cardItems.items = newValue;
      console.log(newValue);
    },
  },
};
</script>

<style></style>
