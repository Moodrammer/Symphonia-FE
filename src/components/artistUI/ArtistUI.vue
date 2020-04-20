<template>
  <v-content
    :style="{
      backgroundImage: 'url(' + artist.imageUrl + ')',
      backgroundSize: '100% Auto'
    }"
  >
    <div class="pl-10 pt-12 mt-12 gradient-body py-7">
      <p class="caption grey--text">{{artist.followedUsers.length}} MONTHLY LISTENERS</p>
      <h1 class="display-3 font-weight-bold white--text my-5">{{artist.name}}</h1>
      <v-btn rounded color="success" min-width="110" min-height="40" dark
        >Play</v-btn
      >
      <v-btn rounded outlined min-width="160" min-height="40" dark class="mx-3"
        >Unfollow</v-btn
      >
      <span class="display-2 white--text">...</span>
    </div>
    <div class="pl-3 content-container" >
      <div class="pl-9 mb-10">
        <v-btn text color="white" class="mx-2" :to="{ name: 'Overview' }">
          <span class="text-capitalize white--text">Overview</span>
        </v-btn>

        <v-btn text color="white" class="mx-2" :to="{ name: 'RelatedArtists' }">
          <span class="text-capitalize white--text">Related Artists</span>
        </v-btn>
      </div>

      <router-view />
    </div>
  </v-content>
</template>

<script>
import getuserToken from "../../mixins/userService";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: mapGetters(["currentArtistGetter"]),
  methods: {
    ...mapActions(["getCurrentArtist"]),
    updateArtist(){
          try {
      this.getCurrentArtist({
        token: this.getuserToken(),
        id: this.$route.params.id
      });
    } catch (error) {
      console.log(error);
    }

    }
  },
  created() {
    this.updateArtist();
  },
  watch: {
    currentArtistGetter: function(newValue) {
      console.log(newValue);
      this.artist = newValue;
    },
    '$route.params.id':function(){
      this.updateArtist();
    }
  },
  data: function() {
    return {
      artist: null
    };
  },
  mixins: [getuserToken]
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
  .content-container{
    background:#1a1a1a;
    height: 100%
  }

</style>
