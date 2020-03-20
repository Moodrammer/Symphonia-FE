<template>
  <div class="wrap">
    <v-content
      app
      v-bind:class="{
        'hero-home-sm-cover': isXs(),
        'hero-home-bg-cover': !isXs()
      }"
    >
      <v-container style="padding-top:130px;">
        <v-row>
          <v-col md="10" offset-md="1" xs="12">
            <h1
              class="premium-header"
              v-bind:class="{
                'premium-header-sm': isSm(),
                'premium-header-xs': isXs()
              }"
            >
              Go Premium. Be happy.
            </h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="10" offset-md="1" xs="12" align="center">
            <router-link to="/download" class="download-button-large">
              start free trial
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <!--<v-content app class="hero-home-sm-cover hidden-md-and-up"></v-content>-->

    <v-container class="large-content">
      <v-row justify="center">
        <h2
          v-bind:class="{
            'looking-for-music-sm': isSm(),
            'looking-for-music-md': isMd() || isLg(),
            'looking-for-music-xs': isXs()
          }"
        >
          Looking for music?
        </h2>
      </v-row>
      <v-row
        justify="center"
      >
        <p class="lead">
          Pick up your recently played right where you left off.
        </p>
      </v-row>
      <v-row justify="center">
        <router-link to="/" class="listen-button">
          Listen on Spotify
        </router-link>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomepageContent",

  components: {},

  methods: {
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
.hero-home-sm-cover {
  background: url(http://localhost:8080/hero-hanging-man.png) no-repeat;
  margin-right: auto;
  margin-left: auto;
  width: 1170px;
  background-position: 140px -160px;
}

.hero-home-bg-cover {
  background: url(http://localhost:8080/hero-hanging-man.png) no-repeat;
  margin-right: auto;
  margin-left: auto;
  width: 1170px;
  min-height: 640px;
  background-position: right 3px top -55px;
}

.wrap {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  -webkit-box-direction: normal;
  color: #fff;
  box-sizing: border-box;
  background: radial-gradient(
    ellipse at center,
    #f6cb6c 0%,
    #f3c65d 0%,
    #f2ae54 100%
  );
}

.premium-header {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  text-align: center;
  box-sizing: border-box;
  margin: 0.5em 0 0.25em;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.15;
  font-size: 80px;
}

.premium-header-sm {
  font-size: 64px;
}

.premium-header-xs {
  font-size: 48px;
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
  transition-duration: .3s;
}

.download-button-large:hover {
  background-color: #1ed760;
}

.download-button-large:active {
  background-color: #1aa34a;
}

.large-content {
  min-width: 100%;
  min-height: 1096px;
  background-color: white;
  color: black;
}

.large-content h2 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  text-align: center;
  box-sizing: border-box;
  margin: 0.5em 0 0.25em;
  font-family: inherit;
  color: inherit;
  margin-top: 24px;
  margin-bottom: 12px;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.looking-for-music-md {
  font-size: 48px;
}

.looking-for-music-sm {
  font-size: 40px;
}

.looking-for-music-xs {
  font-size: 32px;
}

.large-content p {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  -webkit-box-direction: normal;
  text-align: center;
  color: #000;
  box-sizing: border-box;
  margin: 0.5em 0 1em;
  margin-bottom: 24px;
  line-height: 1.4;
  font-size: 18px;
  font-weight: 400;
  padding-left: 15px;
  padding-right: 15px;
}

.listen-button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  display: inline-block;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  user-select: none;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  padding: 16px 48px 18px;
  transition-property: background-color, border-color, color, box-shadow, filter, -webkit-box-shadow, -webkit-filter;
  transition-duration: .3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  box-shadow: 0 0 0 2px #616467 inset;
  outline: 0;
  text-decoration: none;
  color: #616467;
  margin-bottom: 70px;
}

.listen-button:hover {
  background-color: #616467;
  color: white;
}

.listen-button:active {
  background-color: black;
  border-color: black;
  box-shadow: 0 0 0 2px black inset;
}
</style>
