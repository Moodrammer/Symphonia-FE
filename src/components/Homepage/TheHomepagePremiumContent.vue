<template>
  <div>
    <v-content
      v-bind:class="{
        'hero-home-bg-cover': isLg(),
        'hero-home-md-cover': isMd(),
        'hero-home-sm-cover': isSm() || isXs()
      }"
    >
      <v-container>
        <v-row>
          <v-col sm="1" v-if="isSm()"></v-col>
          <v-col sm="10" md="12" lg="12" xs="12">
            <h1
              class="premium-header"
              v-bind:class="{ 'premium-header-xs': isXs() }"
            >
              Get Premium free for 1 month
            </h1>
          </v-col>
          <v-col sm="1" v-if="isSm()"></v-col>
        </v-row>

        <v-row>
          <v-col sm="1" v-if="isSm()"></v-col>
          <v-col sm="10" md="12" lg="12" xs="12">
            <p class="price" v-bind:class="{ 'price-xs': isXs() }">
              Just EGP 49.99/month after. Cancel anytime.
            </p>
          </v-col>
          <v-col sm="1" v-if="isSm()"></v-col>
        </v-row>

        <v-row>
          <v-col sm="1" v-if="isSm()"></v-col>
          <v-col sm="10" md="12" lg="12" xs="12">
            <router-link
              to="/trial"
              class="download-button-large"
              v-bind:class="{ 'download-button-xs': isXs() }"
            >
              get premium
            </router-link>
          </v-col>
          <v-col sm="1" v-if="isSm()"></v-col>
        </v-row>
      </v-container>
    </v-content>

    <!-- Benefits -->
    <v-content>
      <v-row>
        <v-col>
          <h1 class="why-premium">Why go Premium?</h1>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col lg="2" md="6" sm="6" cols="12" v-for="n in benefits" :key="n.no">
          <v-card class="mx-auto" max-width="400" flat>
            <v-img
              aspect-ratio="1"
              v-bind:src="
                'http://localhost:8080/benefits/benefit-' + n.no + '.png'
              "
              style="
              display: block;
              margin-left: auto;
              margin-right: auto;
              "
              v-bind:class="{
                'benefits-img-sm': isSm() || isXs(),
                'benefits-img-lg': !isSm()
              }"
            >
            </v-img>

            <v-card-title style="padding-bottom: 0px;">
              <v-row justify="center">
                <h2 class="benefit-title">
                  {{ n.text1 }}
                </h2>
              </v-row>
            </v-card-title>

            <v-card-title style="padding-top: 0px;">
              <v-row justify="center">
                <p class="benefit-title2">
                  {{ n.text2 }}
                </p>
              </v-row>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-content>

    <v-content>
      <v-card class="mx-auto my-12" max-width="374">
        <v-card-title style="font-size 32px; color: black;"
          >Spotify Premium</v-card-title
        >

        <v-card-text>
          <h1 style="font-size: 32px; color: black; float: left;">
            EGP 49.99
          </h1>
          <p style="color: black;">/ month</p>
          <h5 style="color: grey;">1 month free</h5>

          <v-divider class="mx-4"></v-divider>

          <h4><v-icon>mdi-check</v-icon> Play any song.</h4>
          <h4><v-icon>mdi-check</v-icon> Listen offline.</h4>
          <h4><v-icon>mdi-check</v-icon> No ad interruptions.</h4>
          <h4><v-icon>mdi-check</v-icon> Unlimited skips</h4>
          <h4><v-icon>mdi-check</v-icon> High audio quality</h4>

          <v-divider class="mx-4"></v-divider>

          <router-link
            to="/trial"
            class="download-button-large download-button-xs"
          >
            get premium
          </router-link>
        </v-card-text>
      </v-card>
    </v-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      benefits: {
        benefit1: {
          no: 1,
          text1: "Download music.",
          text2: "Listen anywhere."
        },
        benefit2: {
          no: 2,
          text1: "No ad interruptions.",
          text2: "Enjoy nonstop music."
        },
        benefit3: {
          no: 3,
          text1: "Play any song.",
          text2: "Even on mobile."
        },
        benefit4: {
          no: 4,
          text1: "Unlimited skips.",
          text2: "Just hit next."
        }
      }
    };
  },

  methods: {
    hideNavBackground() {
      var nav = document.getElementById("nav");
      nav.style.backgroundColor = "rgba(0, 0, 0, 0)";

      window.addEventListener("scroll", this.NavFunction);
    },

    NavFunction() {
      var nav = document.getElementById("nav");
      if (window.pageYOffset > 50) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
      } else {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0)";
      }
    },

    removeNavEventListener() {
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
  },

  mounted: function() {
    this.hideNavBackground(); //hideNavBackground will execute at pageload
  },

  destroyed: function() {
    this.removeNavEventListener();
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

  padding-top: 70px;
}

.premium-header-xs {
  padding-top: 30px;
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

.why-premium {
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  color: black;
  margin: 0.5em 0 0.25em;
  margin-block-start: 0px;
  margin-block-end: 0px;
  line-height: 1.3;
  letter-spacing: -0.015em;
  font-weight: 900;
  font-size: 48px;
}

.benefit-title {
  color: #222326;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  display: block;
  font-weight: bold;
  font-size: 21px;
}

.benefit-title2 {
  color: #222326;
  font-weight: 400;
  font-family: Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-size: 16px;
}

.benefits-img-lg {
  height: 142px;
  width: 142px;
}

.benefits-img-sm {
  float: left;
  width: 100px;
}
</style>
