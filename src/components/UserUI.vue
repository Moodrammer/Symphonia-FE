<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-row align="center" justify="center">
      <v-avatar size="200" class="my-8"
        ><v-img :src="user.image"></v-img
      ></v-avatar>
    </v-row>

    <v-row align="center" justify="center">
      <h1>{{ user.name }}</h1>
    </v-row>

    <v-row align="center" justify="center" class="my-3">
      <template v-if="isVisitor">
        <v-btn
          rounded
          outlined
          color="success"
          min-width="160"
          min-height="40"
          dark
          class="mx-3"
          v-if="!isFollowed || !isFollowed[0]"
          @click="follow()"
          success
          >Follow</v-btn
        >
        <v-btn
          rounded
          outlined
          color="error"
          min-width="160"
          min-height="40"
          dark
          class="mx-3"
          v-else
          @click="unfollow()"
          alert
          >Unfollow</v-btn
        >
      </template>
    </v-row>

    <v-container align="center" justify="center">
      <CardGrid
        v-if="cardItems.items"
        :cardItems="cardItems"
        :contextMenu="contextMenu"
      />
    </v-container>
  </v-content>
</template>

<script>
import CardGrid from "./general/CardGrid";
import getuserToken from "../mixins/userService/getUserToken";
import getuserID from "../mixins/userService/getuserID";
import isLoggedIn from "../mixins/userService/isLoggedIn";
import { mapGetters, mapActions } from "vuex";
/**
 * @displayName User Interface
 * @example [none]
 */
export default {
  name: "UserUI",
  props: ["contextMenu"],
  components: {
    CardGrid
  },
  mixins: [getuserToken, getuserID, isLoggedIn],
  data() {
    return {
      user: {
        name: "",
        image: ""
      },
      cardItems: {
        items: null
      }
    };
  },
  created() {
    this.updateUser();
  },

  methods: {
    ...mapActions("userPublicProfile", ["getUserInfo", "getPublicPlaylists"]),
    ...mapActions("artist", [
      "isFollowingArtists",
      "followArtist",
      "unfollowArtist"
    ]),
    /**
     * Function updates the user interface info
     * @public This is a public method
     * @param {none}
     */

    updateUser() {
      this.getUserInfo({
        token: this.getuserToken(),
        id: this.$route.params.id
      });
      this.getPublicPlaylists({
        token: this.getuserToken(),
        id: this.$route.params.id,
        offset: 0
      });
    },
    /**
     * Function to follow the user of this interface
     * @public This is a public method
     * @param {none}
     */

    follow() {
      this.followArtist({
        token: this.getuserToken(),
        artists: [this.$route.params.id],
        type: "user"
      });
    },
    /**
     * Function to unfollow the user of this interface
     * @public This is a public method
     * @param {none}
     */

    unfollow() {
      this.unfollowArtist({
        token: this.getuserToken(),
        artists: [this.$route.params.id],
        type: "user"
      });
    }
  },
  computed: {
    ...mapGetters("userPublicProfile", ["allInfo", "allPublicPlaylists"]),
    ...mapGetters("artist", ["isFollowed"]),

    /**
     * Function to know if the current user isn't the user of this interface
     * @public This is a public method
     * @param {none}
     */

    isVisitor() {
      return this.isLoggedIn() && this.$route.params.id != this.getuserID();
    }
  },
  watch: {
    allInfo(newValue) {
      this.user = newValue;
      if (newValue && newValue.type === "artist")
        this.$router.push(`/webhome/artist/${this.$route.params.id}`);
    },
    allPublicPlaylists(newValue) {
      this.cardItems.items = newValue;
    },
    "$route.params.id"() {
      this.updateUser();
    }
  }
};
</script>

<style></style>
