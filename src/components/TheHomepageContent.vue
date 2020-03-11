<template>
  <div class="wrap">
    <v-content app class="hero-home-bg-cover hidden-sm-and-down"></v-content>
    <v-content app class="hero-home-sm-cover hidden-md-and-up"></v-content>

    <v-container width="1170" style="padding:0px;">
      <v-container
        class="lgContent"
        v-bind:class="{ smContent: isSm(), xsContent: isXs() }"
      >
        <h1
          class="lgHeader1"
          v-bind:class="{ smHeader1: isSm(), xsHeader1: isXs() }"
        >
          Music for everyone.
        </h1>
        <h4 class="lgHeader4">Millions of songs. No credit card needed.</h4>

        <router-link to="/download" class="lgDownloadBtn">
          get spotify free
        </router-link>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomepageContent",

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
  background: url("http://localhost:8080/hero-burst-mobile.svg") no-repeat
    scroll;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  font-family: Circular, Helvetica, Arial, sans-serif;
  -webkit-box-direction: normal;
  color: #fff;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  width: 878px;
  min-width: 878px;
  height: 676px;
  transform: translate(-50%, 10%);
}

.hero-home-bg-cover {
  background: url("http://localhost:8080/hero-burst.svg") no-repeat;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  font-family: Circular, Helvetica, Arial, sans-serif, Ruble;
  -webkit-box-direction: normal;
  color: #fff;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  width: 1610px;
  min-width: 1610px;
  height: 1523px;
  background-position: top -410px center;
  transform: translate(-50%, 0%);
}

.wrap {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  line-height: 1.5;
  color: #222326;
  font-weight: 400;
  font-family: Circular, Helvetica, Arial, sans-serif, Ruble;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  flex: 1;
  background-color: #f037a5;
  background: linear-gradient(#f037a5 -60%, #fae62d 140%);
}

.lgContent {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  font-family: Circular, Helvetica, Arial, sans-serif, Ruble;
  color: #fff;
  box-sizing: border-box;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 1170px;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  min-height: 100vh;
  padding-top: 250px;
  padding-bottom: 250px;
  position: relative;
}

.smContent {
  width: 750px;
  min-height: 100vh;
  padding-top: 75px;
  padding-bottom: 75px;
}

.xsContent {
  width: auto;
  min-height: 100vh;
  padding-top: 75px;
  padding-bottom: 75px;
}

.lgHeader1 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  text-align: center;
  box-sizing: border-box;
  font-family: inherit;
  color: inherit;
  margin: 0.5em 0 0.25em;
  letter-spacing: -0.04em;
  line-height: 1.15;
  margin-top: 0;
  font-size: 80px;
}

.smHeader1 {
  font-size: 64px;
}

.xsHeader1 {
  width: auto;
  display: block;
  font-size: 48px;
}

.lgHeader4 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  text-align: center;
  box-sizing: border-box;
  font-family: inherit;
  line-height: 1.1;
  color: inherit;
  margin: 0.5em 0 1em;
  font-size: 18px;
  font-weight: 400;
}

.lgDownloadBtn {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: Helvetica, Arial, sans-serif;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  display: inline-block;
  margin-bottom: 0;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  padding: 16px 48px 18px;
  transition-duration: 0.3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  text-decoration: none;
  outline: 0;
  background-image: none;
  color: #fff;
  background-color: #1aa34a;
  box-shadow: none;
  margin-top: 16px;
}

.lgDownloadBtn:hover {
  background-color: #1ed760;
}
</style>
