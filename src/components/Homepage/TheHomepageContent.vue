<template>
  <div class="wrap">
    <v-content app class="hero-home-bg-cover hidden-sm-and-down"></v-content>
    <v-content app class="hero-home-sm-cover hidden-md-and-up"></v-content>

    <v-container width="1170" style="padding:0px;">
      <v-container
        class="large-content"
        v-bind:class="{ 'small-content': isSm(), 'xsmall-content': isXs() }"
      >
        <h1
          class="header-1-large"
          v-bind:class="{ 'header-1-small': isSm(), 'header-1-xsmall': isXs() }"
        >
          Music for everyone.
        </h1>
        <h4 class="header-4-large">
          Millions of songs. No credit card needed.
        </h4>

        <router-link to="/" class="download-button-large">
          get symphonia free
        </router-link>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import getDeviceSize from "../../mixins/getDeviceSize";

/**
 * The Home page body content before logging in.
 * @version 1.0.0
 */

export default {
  name: "HomepageContent",

  components: {},

  mixins: [getDeviceSize]
};
</script>

<style scoped>
.hero-home-sm-cover {
  background: url(/hero-burst-mobile.svg) no-repeat scroll;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  line-height: 1.5;
  -webkit-box-direction: normal;
  color: #fff;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  width: 878px;
  min-width: 878px;
  height: 676px;
  transform: translate(-50%, 10%);
  font: 400 16px Helvetica, Arial, sans-serif;
}

.hero-home-bg-cover {
  background: url(/hero-burst.svg) no-repeat;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  line-height: 1.5;
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
  font: 400 16px Helvetica, Arial, sans-serif;
}

.wrap {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  line-height: 1.5;
  color: #222326;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  flex: 1;
  background-color: #f037a5;
  background: linear-gradient(#f037a5 -60%, #fae62d 140%);
  font: 400 16px Helvetica, Arial, sans-serif;
}

.large-content {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  line-height: 1.5;
  color: #fff;
  box-sizing: border-box;
  margin-right: auto;
  margin-left: auto;
  width: 1170px;
  height: 755px;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  min-height: 100vh;
  padding: 250px 15px 250px 15px;
  position: relative;
  font: 400 16px Helvetica, Arial, sans-serif;
}

.small-content {
  width: 750px;
  min-height: 100vh;
  padding: 75px 15px 75px 15px;
}

.xsmall-content {
  width: auto;
}

.header-1-large {
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

.header-1-small {
  font-size: 64px;
}

.header-1-xsmall {
  width: auto;
  display: block;
  font-size: 48px;
}

.header-4-large {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  text-align: center;
  box-sizing: border-box;
  line-height: 1.1;
  color: inherit;
  margin: 0.5em 0 1em;
  font: 400 18px inherit;
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

.download-button-large:hover {
  background-color: #1ed760;
}

.download-button-large:active {
  background-color: #1aa34a;
}
</style>
