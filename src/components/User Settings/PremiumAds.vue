<template>
  <div class="container">
    <div class="jumbotron">
      <div class="row">
        <div class="col-lg-6 col-sm-7 col-lg-offset-1 content-ads col-lg-auto">
          <h1>Music without limits</h1>
          <p>
            Premium lets you play any song, anytime. You can even listen when
            you’re offline. No restrictions. No ads.
          </p>
          <button class="btn-theme hidden-xs-only" @click="direct">
            Get Premium
          </button>
        </div>
        <div class="col-sm-4">
          <!-- <a href="#" class="btn-theme-2 hidden-sm-and-up">Get Premium</a> -->
          <img
            src="//www.scdn.co/i/account/overview/iphone-ddd9e69.png"
            class="jumbotron-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    direct: function() {
      this.$router.push("/premium/?checkout=false");
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./style/PremiumAds.sass"
</style>
