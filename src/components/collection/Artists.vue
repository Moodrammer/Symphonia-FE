<template>
  <v-content class="pa-0 mr-5">
    <h1>Artists</h1>
    <CardGrid
      v-if="cardItems.items"
      :cardItems="cardItems"
      :contextMenu="contextMenu"
    />
  </v-content>
</template>

<script>
import CardGrid from "../general/CardGrid";
import { mapGetters, mapActions } from "vuex";
import getuserToken from "../../mixins/userService/getUserToken";
/**
 * @displayName Library followed artists
 * @example [none]
 */
export default {
  name: "Artists",
  props: ["contextMenu"],
  components: {
    CardGrid
  },
  data() {
    return {
      contextMenuChoice: null,
      contextMenuCardIndex: null,

      cardItems: {
        items: null
      }
    };
  },
  methods: {
    ...mapActions("artist", ["getFollowedArtists", "unfollowArtist"])
  },
  mixins: [getuserToken],
  created() {
    this.getFollowedArtists({
      token: this.getuserToken(),
      offset: 0,
      after: null
    });
  },

  computed: mapGetters("artist", ["allFollowedArtists"]),

  watch: {
    allFollowedArtists(newValue) {
      this.cardItems.items = newValue;
    }
  }
};
</script>
