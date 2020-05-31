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
      <CardGrid :cardItems="cardItems" :contextMenu="contextMenu" />
    </v-container>
  </v-content>
</template>

<script>
import CardGrid from "./general/CardGrid";
import getuserToken from "../mixins/userService/getUserToken";
import getuserID from "../mixins/userService/getuserID";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserUI",
  props: ["contextMenu"],
  components: {
    CardGrid
  },
  mixins: [getuserToken, getuserID],
  data() {
    return {
      user: {
        name: "",
        image: ""
      },
      cardItems: {
        items: []
      }
    };
  },
  created() {
      this.getUserInfo({
        token: this.getuserToken(),
        id: this.$route.params.id
      });
      this.getPublicPlaylists({
        token: this.getuserToken(),
        id: this.$route.params.id
      });
  },

  methods: {
    ...mapActions("userPublicProfile", ["getUserInfo", "getPublicPlaylists"]),
    ...mapActions("artist", [
      "isFollowingArtists",
      "followArtist",
      "unfollowArtist"
    ]),
    follow() {
      this.followArtist({
        token: this.getuserToken(),
        artists: [this.$route.params.id],
        type: "user"
      });
    },
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

    isVisitor() {
      return this.$route.params.id != this.getuserID();
    }
  },
  watch: {
    allInfo(newValue) {
      this.user = newValue;
    },
    allPublicPlaylists(newValue) {
      this.cardItems.items = newValue;
    }
  }
};
</script>

<style></style>
