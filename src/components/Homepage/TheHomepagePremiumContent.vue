<template>
  <div>
    <!-- md and lg only-->
    <v-content
      app
      v-bind:class="{
        'hero-home-bg-cover': isLg(),
        'hero-home-md-cover': isMd(),
        'hero-home-sm-cover': isSm() || isXs()
      }"
    >
      <v-container style="">
        <v-row>
          <v-col sm="1" v-if="isSm()"></v-col>
          <v-col sm="10" md="12" lg="12" xs="12">
            <h1 class="premium-header"
            v-bind:class="{'premium-header-xs': isXs()}"
            >
              Get Premium free for 1 month
            </h1>
          </v-col>
          <v-col sm="1" v-if="isSm()"></v-col>
        </v-row>

        <v-row>
          <v-col sm="1" v-if="isSm()"></v-col>
          <v-col sm="10" md="12" lg="12" xs="12">
            <p class="price"
            v-bind:class="{'price-xs': isXs()}"
            >Just EGP 49.99/month after. Cancel anytime.</p>
          </v-col>
          <v-col sm="1" v-if="isSm()"></v-col>
        </v-row>

        <v-row>
          <v-col sm="1" v-if="isSm()"></v-col>
          <v-col sm="10" md="12" lg="12" xs="12">
            <router-link to="/trial" class="download-button-large"
            v-bind:class="{'download-button-xs': isXs()}"
            >
              get premium
            </router-link>
          </v-col>
          <v-col sm="1" v-if="isSm()"></v-col>
        </v-row>
      </v-container>
    </v-content>

    <!-- sm and xs only-->
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

    NavFunction: function() {
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
    },
    isLg() {
      const { lg } = this.$vuetify.breakpoint;
      return lg ? true : false;
    },
    isMd() {
      const { md } = this.$vuetify.breakpoint;
      return md ? true : false;
    },
    isSm() {
      const { sm } = this.$vuetify.breakpoint;
      return sm ? true : false;
    },
    isXs() {
      const { xs } = this.$vuetify.breakpoint;
      return xs ? true : false;
    }
  }
};
</script>

<style scoped>
.hero-home-bg-cover {
  background: url(http://localhost:8080/premium_hero.png) right bottom / 450px
    no-repeat rgb(80, 155, 245);
  min-height: 493px;
  background-position: right 3px top -27px;
  padding: 0px;
  direction: ltr;
}

.hero-home-md-cover {
  background: url(http://localhost:8080/premium_hero.png) right bottom / 450px
    no-repeat rgb(80, 155, 245);
  min-height: 493px;
  background-position: right 3px top 40px;
  padding: 0px;
  direction: ltr;
}

.hero-home-sm-cover {
  background-color: rgb(80, 155, 245);
}

.premium-header {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  text-align: left;
  box-sizing: border-box;
  font-family: Helvetica, Arial, sans-serif;
  letter-spacing: -0.02em;
  line-height: 1.2;
  font-weight: 900;
  font-size: 70px;
  color: white;

  padding-top:70px;
}

.premium-header-xs {
  padding-top:30px;
  font-size: 43px;
}

.price {
  font-family: Helvetica, Arial, sans-serif;
  color: white;
  letter-spacing: -0.015em;
  line-height: 1.5;
  font-weight: 600;
  padding: 0px;
  font-size: 30px;
  margin-bottom: 0px;
}

.price-xs {
  font-size: 24px;
}

.download-button-large {
  line-height: 1.5;
  margin: 0;
  display: inline-block;
  border-radius: 500px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;
  background-color: #1aa34a;
  padding: 16px 48px 18px;
  margin-top: 16px;
  margin-bottom: 0;
  font: 700 14px Helvetica, Arial, sans-serif;
  transition-duration: 0.3s;
}

.download-button-xs {
  width: 100%;
  text-align: center;
}

.download-button-large:hover {
  background-color: #1ed760;
}

.download-button-large:active {
  background-color: #1aa34a;
}
</style>
