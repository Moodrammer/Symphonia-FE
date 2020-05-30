<template>
  <v-content
    v-if="currentArtistGetter"
    :style="{
      backgroundImage: 'url(' + currentArtistGetter.imageUrl + ')',
      backgroundSize: '100% Auto'
    }"
  >
    <div class="pl-10 pt-12 mt-12 gradient-body py-7">
      <p class="caption white--text">
        {{ currentArtistGetter.followedUsers.length }} Followers
      </p>
      <h1 class="display-3 font-weight-bold white--text my-5">
        {{ currentArtistGetter.name }}
      </h1>
      <v-btn rounded color="success" min-width="110" min-height="40" dark
        >Play</v-btn
      >
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
    </div>
    <div class="pl-3 content-container">
      <div class="pl-9 mb-10">
        <v-btn text color="white" class="mx-2" :to="{ name: 'Overview' }">
          <span class="text-capitalize white--text">Overview</span>
        </v-btn>

        <v-btn text color="white" class="mx-2" :to="{ name: 'RelatedArtists' }">
          <span class="text-capitalize white--text">Related Artists</span>
        </v-btn>
      </div>

      <router-view
        :artistID="artistID"
        :artistName="currentArtistGetter.name"
        :contextMenu="contextMenu"
      />
    </div>
  </v-content>
</template>

<script>
import getuserToken from "../../mixins/userService/getUserToken";
import getuserID from "../../mixins/userService/getuserID";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["contextMenu"],
  methods: {
    ...mapActions("artist", [
      "getCurrentArtist",
      "isFollowingArtists",
      "followArtist",
      "unfollowArtist"
    ]),
    updateArtist() {
      this.getCurrentArtist({
        token: this.getuserToken(),
        id: this.artistID
      });

      this.isFollowingArtists({
        token: this.getuserToken(),
        artists: [this.artistID]
      });
    },
    follow() {
      console.log("FOLLOW", this.artistID);
      this.followArtist({
        token: this.getuserToken(),
        artists: [this.artistID]
      });
    },
    unfollow() {
      this.unfollowArtist({
        token: this.getuserToken(),
        artists: [this.artistID]
      });
    }
  },
  created() {
    this.updateArtist();
  },
  computed: {
    ...mapGetters("artist", ["currentArtistGetter", "isFollowed"]),
    artistID() {
      return this.$route.params.id;
    },
    isVisitor() {
      return this.artistID != this.getuserID();
    }
  },
  watch: {
    isFollowed: function(newValue) {
      console.log("ISFOLO", newValue);
    },
    currentArtistGetter: function(newValue) {
      console.log(newValue);
    },
    artistID: function() {
      this.updateArtist();
    }
  },
  data: function() {
    return {};
  },
  mixins: [getuserToken, getuserID]
};
</script>

<style>
.gradient-body {
  /* background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%); */
  background: rgb(26, 26, 26);
  background: linear-gradient(
    0deg,
    rgba(26, 26, 26, 1) 0%,
    rgba(26, 26, 26, 0) 100%
  );
}
.content-container {
  background: #1a1a1a;
  height: 100%;
}
</style>
