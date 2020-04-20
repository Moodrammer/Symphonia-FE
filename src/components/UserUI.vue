<template>
    <div class="pl-3 content-container" >
    </div>
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
  },
  watch: {
  },
  data: function() {
  },
  mixins: [getuserToken]
};
</script>

<style>
  .content-container{
    background:#1a1a1a;
    height: 100%
  }

</style>
