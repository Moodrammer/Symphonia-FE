<template>
  <div class="col-sm-9">
    <div class="content">
      <div class="header-container">
        <h1>Recover playlists</h1>
      </div>
      <p class="p" v-if="count > 0">
        Accidentally deleted a playlist? No worries, find the deleted playlist
        you'd like to recover below then click RESTORE to recover it.
      </p>
      <p class="alert-info" v-if="(count = 0)">
        You haven't deleted any playlists
      </p>
      <p class="alert-danger" v-if="(count = -1)">
        Sorry please try this later in another time or reload the page
      </p>
      <section class="section" v-if="count > 0">
        <div class="table-responsive hidden-xs-only">
          <table class="table">
            <thead>
              <tr>
                <th class="table-header">Deleted</th>
                <th class="table-header">Title</th>
                <th class="table-header">Songs</th>
                <th class="table-header">Restore</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(playlist, index) in playlists"
                :key="(playlist, index)"
              >
                <td class="table-data">{{ playlist.date }}</td>
                <td class="table-data">{{ playlist.title }}</td>
                <td class="table-data">{{ playlist.songs }}</td>
                <td class="table-data">
                  <button v-show="!playlist.restored" @click="restore(index)">
                    Restore</button
                  ><b class="restored" v-show="playlist.restored">Restored</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
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
.table-header {
  border-top: 0;
  padding: 0 16px 16px;
  border-bottom-width: 1px;
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #c1c3c6;
  vertical-align: bottom;
  border-bottom-color: rgb(239, 239, 239);
  border-bottom-style: solid;
  line-height: 1.5;
  text-align: left;
}
tbody > tr:nth-of-type(2n + 1) {
  background-color: rgba(0, 0, 0, 0.02);
}
.table-data {
  padding: 16px;
  border: none;
  vertical-align: middle;
  line-height: 1.5;
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
.restored {
  font-weight: 400;
  text-transform: uppercase;
}
.alert-info {
  border-width: 0;
  font-size: 12px;
  padding: 14px 14px 12px 14px;
  font-weight: 400;
  background-color: #509bf5;
  border-color: #509bf5;
  color: #fff;
  margin-bottom: 24px;
  border-style: solid;
  border-radius: 0px;
  margin-top: 0.5em;
  margin-right: 0px;
  margin-left: 0px;
}
.alert-danger {
  border-width: 0;
  font-size: 12px;
  padding: 14px 14px 12px 14px;
  font-weight: 400;
  background-color: #ff6b6b;
  border-color: #ff6b6b;
  color: #fff;
  margin-bottom: 24px;
  border-style: solid;
  border-radius: 0px;
  margin-top: 0.5em;
  margin-right: 0px;
  margin-left: 0px;
}
</style>
