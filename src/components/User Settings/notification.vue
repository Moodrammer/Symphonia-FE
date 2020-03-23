<template>
  <div class="col-sm-9">
    <div class="content">
      <div class="header-container">
        <h1>Notification settings</h1>
      </div>
      <div class="section">
        <form action="#" class="notification-form">
          <table class="table table-responsive">
            <thead>
              <tr>
                <th class="table-category">Symphonia Updates</th>
                <th><i class="fas fa-envelope svg"></i><span>Email</span></th>
                <th>
                  <i class="far fa-window-restore svg"></i><span>Push</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="form-group">
                <td>
                  Product News
                  <p class="description">
                    Getting started, new features and the latest product updates
                    on Symphonia
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
              <tr class="form-group">
                <td>
                  Symphonia News and Offers
                  <p class="description">
                    News, promos and events for you
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table table-responsive">
            <thead>
              <tr>
                <th class="table-category">Your Music</th>
                <th><span></span></th>
                <th>
                  <span></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="form-group">
                <td>
                  Recommended Music
                  <p class="description">
                    Music we find that we think you’ll like
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
              <tr class="form-group">
                <td>
                  New Music
                  <p class="description">
                    Fresh tracks from artists you follow or might like
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
              <tr class="form-group">
                <td>
                  Playlist Updates
                  <p class="description">
                    A playlist you follow is updated
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
              <tr class="form-group">
                <td>
                  Concert Notifications
                  <p class="description">
                    Updates about live shows by artists you like, in places near
                    you
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
              <tr class="form-group">
                <td>
                  Artist Updates
                  <p class="description">
                    Hear about artists you listen to and artists we think you’ll
                    like
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="button-col">
            <button>save profile</button>
            <a href="/" class="a-cancel">cancel</a>
          </div>
        </form>
      </div>
      <bottomContent />
    </div>
  </div>
</template>

<script>
import bottomContent from "./bottomContent.vue";
export default {
  data() {
    return {
      playlists: [
        {
          date: "3/18/20",
          title: "list",
          songs: 1,
          restored: false
        }
      ],
      count: -1
    };
  },
  components: {
    bottomContent: bottomContent
  },
  methods: {
    restore: function(index) {
      this.playlists[index].restored = true;
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Circular;
  src: url("https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff2")
      format("woff2"),
    url("https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff") format("woff"),
    url("https://open.scdn.co/fonts/CircularSpUIv3T-Book.ttf") format("ttf");
  font-style: normal;
  font-weight: 400;
}
* {
  box-sizing: border-box;
}
body {
  font-family: Circular, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #222326;
  box-sizing: border-box;
  font-weight: 400;
}
.col-sm-9 {
  width: 75%;
  position: relative;
  padding: 0 15px;
  background-color: white;
}
.content {
  padding: 60px;
  background-color: #f8f8f8;
  justify-content: space-between;
  margin-left: -15px;
  margin-right: -15px;
}
h1 {
  font-size: 26px;
  margin: 0.5em 0;
  color: #1db954;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
  font-family: Circular, Helvetica, Arial, sans-serif;
}
.header-container {
  padding-bottom: 0;
  margin-top: 0;
  margin-right: 0px;
  margin-bottom: 24px;
  margin-left: 0px;
  border-bottom: 1px solid #efefef;
}
.p {
  margin: 0.5em 0 1em;
  font-family: Circular, Helvetica, Arial, sans-serif;
}
.section {
  padding: 40px;
  margin-bottom: 10px;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  min-height: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  display: block;
}
.section::after,
.section::before {
  content: " ";
  display: table;
}
.section::after {
  clear: both;
}
.table-responsive {
  overflow-x: auto;
  min-height: 0.01%;
}
.table {
  margin-bottom: 0;
  width: 100%;
  max-width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
}

button {
  min-width: 0;
  padding: 0;
  border-radius: 0;
  max-width: 290px;
  font-size: 12px;
  line-height: 1;
  color: #1db954;
  font-weight: 700;
  transition-property: background-color, border-color, color, box-shadow, filter,
    -webkit-box-shadow, -webkit-filter;
  transition-duration: 0.3s;
  border-width: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  white-space: normal;
  border-color: transparent;
  background-color: transparent;
  box-shadow: none;
  display: inline-block;
  margin-bottom: 0;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border-style: solid;
  user-select: none;
  overflow: visible;
  margin-top: 0px;
  margin-right: 0px;
  margin-left: 0px;
}
.notification-form {
  margin-left: -8px;
  margin-right: -8px;
}
.table-category {
  border-top: 0px;
  color: black;
  font-weight: bold;
  text-align: left;
  text-transform: none;
  width: 68%;
  font-size: 18px;
  border-bottom-color: transparent;
}
thead > tr > th {
  padding: 0 16px 16px;
  border-bottom-width: 1px;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 4px;
  color: #c1c3c6;
  vertical-align: bottom;
  border-bottom: 2px solid #efefef;
  line-height: 1.5;
  font-family: Circular;
}
.svg {
  width: 18px;
  height: 18px;
  display: inline-block;
  fill: #c1c3c6;
  margin: 0 5px 5px;
  vertical-align: middle;
  overflow: hidden;
}
.notification-form table thead th {
  border-bottom-color: transparent;
  text-align: center;
}
.notification-form table thead th:first-child {
  color: black;
  font-weight: bold;
  text-align: left;
  text-transform: none;
  width: 68%;
  font-size: 18px;
  font-weight: 700;
}
.form-group {
  margin-bottom: 20px;
}
tbody > tr:nth-of-type(2n + 1) {
  background-color: rgba(0, 0, 0, 0.02);
}
.table > tbody > tr > td {
  padding: 16px;
  border: none;
  vertical-align: middle;
  line-height: 1.5;
}
.description {
  color: #919496;
  font-size: 14px;
  margin: 0;
}
.td-checkbox {
  text-align: center;
}
.checkbox {
  display: inline-block;
  margin-right: -0.25em;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  color: #919496;
  font-weight: 400;
  position: relative;
}
label {
  display: inline-block;
  max-width: 100%;
  padding-left: 1.75em;
  font-weight: 400;
  min-height: 24px;
  margin-bottom: 0;
  cursor: pointer;
}
[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  left: -9999px;
}
[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 1.95em;
  cursor: pointer;
}

/* checkbox aspect */
[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 1.25em;
  height: 1.25em;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}
/* checked mark aspect */
[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  content: "\2713\0020";
  position: absolute;
  top: 0.15em;
  left: 0.22em;
  font-size: 1.3em;
  line-height: 0.8;
  color: #09ad7e;
  transition: all 0.2s;
  font-family: "Lucida Sans Unicode", "Arial Unicode MS", Arial;
}
/* checked mark aspect changes */
[type="checkbox"]:not(:checked) + label:after {
  opacity: 0;
  transform: scale(0);
}
[type="checkbox"]:checked + label:after {
  opacity: 1;
  transform: scale(1);
}
/* disabled checkbox */
[type="checkbox"]:disabled:not(:checked) + label:before,
[type="checkbox"]:disabled:checked + label:before {
  box-shadow: none;
  border-color: #bbb;
  background-color: #ddd;
}
[type="checkbox"]:disabled:checked + label:after {
  color: #999;
}
[type="checkbox"]:disabled + label {
  color: #aaa;
}
/* accessibility */
[type="checkbox"]:checked:focus + label:before,
[type="checkbox"]:not(:checked):focus + label:before {
  border: 2px dotted blue;
}

/* hover style just for information */
label:hover:before {
  border: 2px solid #4778d9 !important;
}
.button-col {
  border-top: 1px solid #efefef;
  margin-top: 40px;
  margin-bottom: -10px;
  padding: 30px 0 0;
}
.button-col::before {
  content: " ";
  display: table;
}
button {
  float: right !important;
  max-width: 290px;
  font-size: 12px;
  line-height: 1;
  border-radius: 500px;
  padding: 10px 32px;
  color: #fff;
  background-color: #1db954;
  transition-property: background-color, border-color, color, box-shadow, filter,
    -webkit-box-shadow, -webkit-filter;
  transition-duration: 0.3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  border-color: #1aa34a;
  display: inline-block;
  margin-bottom: 0;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-style: solid;
  user-select: none;
  -webkit-appearance: button;
  overflow: visible;
  margin-top: 0px;
  margin-right: 0px;
  margin-left: 0px;
}
.a-cancel {
  margin-right: 20px;
  float: right !important;
  color: #000;
  max-width: 290px;
  font-size: 12px;
  line-height: 1;
  border-radius: 500px;
  padding: 10px 32px;
  transition-property: background-color, border-color, color, box-shadow, filter,
    -webkit-box-shadow, -webkit-filter;
  transition-duration: 0.3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  margin-bottom: 0;
  font-weight: 700;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-color: transparent;
  border-style: solid;
  user-select: none;
  text-decoration: none;
  background-color: transparent;
}
</style>
