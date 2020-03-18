<template>
  <div class="col-sm-3 hidden-xs-only" style=" padding: 0px;">
    <div class="sidebar">
      <img
        src="https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png"
        class="user-img img-circle"
      />
      <ul class="nav-inverse nav-tabs nav-stacked" style="padding: 0px">
        <li>
          <router-link to="/" exact
            ><i class="fas fa-home svg"></i>Account overview</router-link
          >
        </li>
        <li>
          <router-link to="/edit" exact
            ><i class="fas fa-pencil-alt svg"></i>Edit profile</router-link
          >
        </li>
        <!-- <li>
          <router-link to="#" exact
            ><i class="fas fa-lock svg"></i>Set device password</router-link
          >
        </li> -->
        <li>
          <router-link to="#" exact
            ><i class="fas fa-bell svg"></i>Notification settings</router-link
          >
        </li>
        <!-- <li>
          <router-link to="#" exact
            ><i class="fas fa-lock svg"></i>Privacy settings</router-link
          >
        </li> -->
        <li>
          <router-link to="/recover-playlists" exact
            ><i class="fas fa-redo svg"></i>Recover playlists</router-link
          >
        </li>
        <!-- <li>
          <router-link to="#" exact
            ><i class="far fa-clock svg"></i>Receipts</router-link
          >
        </li> -->
        <!-- <li>
          <router-link to="#" exact
            ><i class="fas fa-puzzle-piece svg"></i>Apps</router-link
          >
        </li>
        <li>
          <router-link to="#" exact
            ><i class="far fa-clipboard svg"></i>Redeem</router-link
          >
        </li> -->
      </ul>
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

<style scoiped>
.sidebar {
  font-family: Circular, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #222326;
}
.user-img {
  display: block;
  width: 64px;
  height: 64px;
  margin: 30px auto;
  border-radius: 50%;
}
.sidebar .nav-tabs .nav-stacked {
  font-size: 16px;
  list-style: none;
  position: relative;
  border-bottom-color: hsla(0, 0%, 100%, 0.05);
  border-top-color: rgba(0, 0, 0, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
}
.nac-tabs .nav-stacked {
  margin: 0 -15px;
}
.col-sm-3 {
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: -webkit-box;
  display: flex;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  width: 25%;
  float: left;
  position: relative;
  min-height: 1px;
  background: rgb(28, 28, 28);
  background: linear-gradient(
    90deg,
    rgba(28, 28, 28, 1) 0%,
    rgba(27, 27, 27, 1) 100%
  );
}
* {
  box-sizing: border-box;
}
.sidebar .nav-tabs.nav-stacked > li {
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  margin: 0;
  padding: 0;
  position: relative;
}
li.active::before {
  background-color: #1ed760;
}
li::before {
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 5px;
  background-color: transparent;
}
.nav-inverse.nav-stacked > li.active > a {
  fill: #fff;
  fill: var(--white);
  color: #f8f8f8;
  color: var(--gray-95);
}
.nav-inverse.nav-stacked > li > a {
  padding-left: 75px;
  padding-right: 15px;
  position: relative;
  text-decoration: none;
  display: block;
  fill: #c1c3c6;
  padding-top: 15px;
  padding-bottom: 15px;
  color: #919496;
  border: none;
  border-radius: 0;
  letter-spacing: 0;
  text-transform: none;
}
.nav-tabs.nav-stacked .svg {
  display: block;
  width: 1.3em;
  height: 1.3em;
  position: absolute;
  top: 15px;
  left: 30px;
  float: left;
}
.sidebar .nav-tabs.nav-stacked > li.active::before,
.sidebar .nav-tabs.nav-stacked > li:hover::before {
  background-color: #1ed760;
}
</style>
