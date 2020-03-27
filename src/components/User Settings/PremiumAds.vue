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
          <button class="btn-theme hidden-xs-only">
            Get Premium
          </button>
        </div>
        <div class="col-sm-4">
          <a href="#" class="btn-theme-2 hidden-sm-and-up">Get Premium</a>
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
  }
};
</script>

<style scoped>
body {
  font-family: Circular, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #222326;
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0;
  padding-bottom: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  background-image: linear-gradient(to bottom, #121e3d 0%, #000 100%);
  background-repeat: repeat-x;
}
.row {
  margin-right: -15px;
  margin-left: -15px;
  text-align: left;
  color: #f8f8f8;
  box-sizing: border-box;
}
h1 {
  color: #f8f8f8;
  font-weight: 700;
  padding: 0;
  font-size: 72px;
  margin-top: 24px;
  margin-bottom: 12px;
  line-height: 1;
  letter-spacing: -0.05rem;
  text-align: left;
  box-sizing: border-box;
  font-family: Circular, Helvetica, Arial, sans-serif;
}
p {
  font-size: var(--body-1-font);
  font-weight: 400;
  letter-spacing: -0.01em;
  margin: 1em 0;
  box-sizing: border-box;
  color: #f8f8f8;
}
.col-sm-4 {
  position: static;
  width: 33.33333333%;
  float: left;
  min-height: 1;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  text-align: left;
}
.jumbotron-image {
  max-width: 27%;
  position: absolute;
  bottom: 0;
  height: auto;
  display: block;
  box-sizing: border-box;
}
.jumbotron {
  padding: 48px 60px;
  text-align: left;
  min-height: 400px;
  background: none;
  margin-bottom: 0;
  position: relative;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: none;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
}
.btn-theme {
  width: auto;
  display: inline-block;
  background-color: #1db954;
  color: white;
  border-radius: 100px;
  min-height: 48px;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  padding: 1em 3em;
  border: none;
  transition-duration: 33ms;
  transition-property: background-color, border-color, color, box-shadow, filter,
    transform, -webkit-box-shadow, -webkit-filter, -webkit-transform;
  user-select: none;
  text-decoration: none;
  cursor: pointer;
  max-width: none;
  box-sizing: border-box;
}
.btn-theme:hover {
  transform: scale(1.04);
}
.content-ads {
  width: 58.333333333%;
  float: left;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0;
  padding-bottom: 0;
  box-sizing: border-box;
}
.btn-theme-2 {
  -webkit-transform: translate(-50%, 50%) scale(1.04) !important;
  transform: translate(-50%, 50%) scale(1.04) !important;
  background-color: #1db954;
  color: #fff;
  border-radius: 100px;
  min-height: 48px;
  display: block;
  width: 100%;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  padding: 1em 3em;
  border: none;
  -webkit-transition-duration: 33ms;
  transition-duration: 33ms;
  -webkit-transition-property: background-color, border-color, color,
    -webkit-box-shadow, -webkit-filter, -webkit-transform;
  transition-property: background-color, border-color, color, -webkit-box-shadow,
    -webkit-filter, -webkit-transform;
  transition-property: background-color, border-color, color, box-shadow, filter,
    transform;
  transition-property: background-color, border-color, color, box-shadow, filter,
    transform, -webkit-box-shadow, -webkit-filter, -webkit-transform;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: none;
  cursor: pointer;
  max-width: none;
  position: absolute;
  bottom: 0;
  left: 50%;
  right: -50%;
  z-index: 1;
  display: block !important;
}
</style>
