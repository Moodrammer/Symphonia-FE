<template>
  <div class="wrap">
    <v-content app class="hero-home-bg-cover hidden-sm-and-down"> </v-content>
    <div app class="hero-home-sm-cover hidden-md-and-up"> </div>
  </div>
</template>

<script>
export default {
  name: "HomepageContent"
};
</script>

<style scoped>
.hero-home-sm-cover {
  background: url("http://localhost:8080/hero-burst-mobile.svg") no-repeat scroll;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  font-family: Circular, Helvetica, Arial, sans-serif;
  -webkit-box-direction: normal;
  color: #FFF;
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
</style>
