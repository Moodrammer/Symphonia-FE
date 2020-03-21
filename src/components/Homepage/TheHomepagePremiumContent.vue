<template>
  <div>
    <v-content
      app
      class="hero-home-bg-cover"
    >
    </v-content>
  </div>
</template>

<script>
export default {
  mounted: function() {
    this.hideNavBackground(); //hideNavBackground will execute at pageload
  },
  destroyed: function() {
    this.removeNavEventListener();
  },

  methods: {
    hideNavBackground: function() {
      var nav = document.getElementById("nav");
      nav.style.backgroundColor = "rgba(0, 0, 0, 0)";

    window.addEventListener("scroll", this.NavFunction);
    },

    NavFunction: function () {
      console.log("Scrolling");
      var nav = document.getElementById("nav");
      if (window.pageYOffset > 50) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
      } else {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0)";
      }
    },

    removeNavEventListener: function() {
      window.removeEventListener("scroll", this.NavFunction);
    }
  }
}
</script>

<style scoped>
.hero-home-bg-cover {
  background: url(http://localhost:8080/premium_hero.png) right bottom / 450px no-repeat rgb(80, 155, 245);
  min-height: 493px;
  background-position: right 3px top -27px;
  padding: 0px;
  direction: ltr;
}
</style>
