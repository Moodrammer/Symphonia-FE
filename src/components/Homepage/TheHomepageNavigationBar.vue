<template>
  <nav>
    <!-- for md and lg -->
    <v-app-bar
      flat
      app
      :color="navigationBarColor"
      height="80"
      class="hidden-sm-and-down"
      ref="navBar"
    >
      <v-toolbar
        flat
        color="rgba(0, 0, 0, 0)"
        class="toolbar"
        v-bind:class="{
          'toolbar-large-width': isLg(),
          'toolbar-medium-width': !isLg()
        }"
      >
        <router-link to="/" style="text-decoration: none;">
          <v-row>
            <v-img src="/s11.png" max-width="50px" style="float: left;"></v-img>
            <v-col align="center" class="px-0">
              <h1 style="display: inline;" display-4 class="white--text">
                Symphonia
              </h1>
            </v-col>
          </v-row>
        </router-link>

        <v-toolbar
          flat
          color="rgba(0, 0, 0, 0)"
          class="right"
          style="padding-right:0px;"
        >
          <router-link
            to="/premium"
            class="toolbar-link-1"
            v-bind:class="{ 'blue-hover': isLoggedIn() }"
            >Premium</router-link
          >
          <router-link
            to="/"
            class="toolbar-link-1"
            v-bind:class="{ 'blue-hover': isLoggedIn() }"
            >Help</router-link
          >
          <router-link
            to="/"
            class="toolbar-link-1"
            v-bind:class="{ 'blue-hover': isLoggedIn() }"
            >Download</router-link
          >

          <span class="bar-icon">|</span>

          <router-link
            v-if="!isLoggedIn()"
            to="/signup"
            class="toolbar-link-1 toolbar-link-2"
            >Sign up</router-link
          >
          <router-link
            to="/login"
            class="toolbar-link-1 toolbar-link-2"
            style="padding-right:0px;"
            v-if="!isLoggedIn()"
            >Log in</router-link
          >

          <v-menu offset-y v-if="isLoggedIn()">
            <template v-slot:activator="{ on }">
              <v-btn
                :ripple="false"
                id="no-background-hover"
                text
                v-on="on"
                class="toolbar-link-1 blue-hover"
              >
                <v-avatar width="40" height="40">
                  <img :src="currentUserImageUrl" alt="profile pic" />
                </v-avatar>

                <span style="text-transform: none; padding-left:15px;"
                  >Profile</span
                >
                <span class="mdi mdi-18px mdi-chevron-down"></span>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <router-link to="/account" style="text-decoration: none;">
                  <v-list-item-title class="account-button blue-hover"
                    >Account</v-list-item-title
                  >
                </router-link>
              </v-list-item>
              <v-list-item>
                <router-link to="/" style="text-decoration: none;">
                  <v-list-item-title
                    class="account-button logout-button blue-hover"
                  >
                    <span v-on:click="logOutAndRerender()"> Log Out</span>
                  </v-list-item-title>
                </router-link>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-toolbar>
    </v-app-bar>

    <!-- for sm and xs -->
    <v-app-bar flat app color="black" height="54" class="hidden-md-and-up">
      <v-toolbar flat color="rgba(0,0,0,0)" class="small-toolbar">
        <v-row>
          <v-col>
            <router-link to="/" style="text-decoration: none;">
              <v-img
                src="/s11.png"
                aspect-ratio="1"
                width="40"
                height="40"
                style="float: left;"
              ></v-img>
              <h2 v-if="!isXs()" style="display: inline;" class="white--text">
                Symphonia
              </h2>
            </router-link>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="1">
            <router-link to="/account">
              <v-avatar v-if="isLoggedIn()" width="34" height="34">
                <img :src="currentUserImageUrl" alt="profile pic" />
              </v-avatar>
            </router-link>
          </v-col>

          <v-col cols="1">
            <v-btn text v-on:click="drawer = !drawer">
              <v-icon large color="white">mdi-menu</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="1"></v-col>
        </v-row>
      </v-toolbar>
    </v-app-bar>

    <v-navigation-drawer
      v-if="isSm() || isXs()"
      v-model="drawer"
      app
      right
      class="drawer"
      color="black"
      width="447"
    >
      <v-btn text class="right" v-on:click="drawer = !drawer">
        <v-icon large color="white">mdi-close</v-icon>
      </v-btn>
      <ul style="padding:0px;">
        <li>
          <router-link
            to="/premium/?checkout=false"
            class="toolbar-link-1 small-toolbar-btn-1"
            >Premium</router-link
          >
        </li>
        <li>
          <router-link to="/help" class="toolbar-link-1 small-toolbar-btn-1"
            >Help</router-link
          >
        </li>
        <li>
          <router-link to="/download" class="toolbar-link-1 small-toolbar-btn-1"
            >Download</router-link
          >
        </li>
        <li>
          <span class="hyphen-icon">-</span>
        </li>
        <li>
          <router-link
            v-if="!isLoggedIn()"
            to="/signup"
            class="toolbar-link-1 small-toolbar-btn-1 small-toolbar-btn-2"
            >Sign up</router-link
          >
          <router-link
            v-if="isLoggedIn()"
            to="/account"
            class="toolbar-link-1 small-toolbar-btn-1 small-toolbar-btn-2"
            >Account</router-link
          >
        </li>
        <li>
          <router-link
            v-if="!isLoggedIn()"
            to="/login"
            class="toolbar-link-1 small-toolbar-btn-1 small-toolbar-btn-2"
            >Sign in</router-link
          >
          <a
            v-if="isLoggedIn()"
            v-on:click="logOutAndRerender()"
            class="toolbar-link-1 small-toolbar-btn-1 small-toolbar-btn-2"
            >Log Out</a
          >
        </li>
      </ul>
      <router-link
        to="/"
        class="small-symphonia-icon"
        style="text-decoration: none;"
      >
        <v-img src="/s11.png" max-width="50px" style="float: left;"> </v-img>
        <h1 style="display: inline;" display-4 class="white--text">
          Symphonia
        </h1>
      </router-link>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import isLoggedIn from "../../mixins/userService/isLoggedIn";
import getDeviceSize from "../../mixins/getDeviceSize";
import getimageUrl from "../../mixins/userService/getimageUrl";
import logOut from "../../mixins/userService/logOut";
import { mapState } from "vuex";

/**
 * The homepage navigation bar.
 * @version 1.0.0
 */

export default {
  name: "TheHomepageNavBar",

  computed: {
    ...mapState({
      homepageInstance: state => state.homepage.homepageInstance,
      navigationBarColor: state => state.homepage.navigationBarColor
    })
  },

  data() {
    return {
      drawer: false,
      //The current user profile image
      currentUserImageUrl: ""
    };
  },
  created() {
    this.currentUserImageUrl = this.getimageUrl();
  },
  methods: {
    /**
     * Gets called when the user logs out
     *
     * @public
     */
    logOutAndRerender() {
      this.logOut();
      this.$forceUpdate();

      this.homepageInstance.$forceUpdate();
    }
  },

  mixins: [isLoggedIn, getimageUrl, getDeviceSize, logOut]
};
</script>

<style scoped>
.toolbar-link-1 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  box-sizing: border-box;
  background-color: transparent;
  color: #fff;
  text-decoration: none;
  padding: 28px 17px;
  font: 700 15px Helvetica, Arial, sans-serif;
}

.bar-icon {
  color: white;
  padding-right: 1rem;
  padding-left: 1rem;
}

.toolbar-link-2 {
  color: #d9dadc;
}

.toolbar-link-1:hover {
  color: #1db954;
}

.right {
  position: absolute;
  right: 0px;
}

.toolbar {
  flex: none;
  margin: auto;
}

.toolbar-large-width {
  width: 1170px;
}

.toolbar-medium-width {
  width: 970px;
}

.small-toolbar {
  flex: none;
  margin: auto;
  width: 750px;
  padding-left: 0px;
}

.small-toolbar-btn-1 {
  display: block;
  line-height: 1;
  font-weight: 700;
  font-size: 36px;
  padding: 0 0 25px;
}

.hyphen-icon {
  color: white;
  font-weight: 700;
  font-size: 36px;
  padding: 0 0 25px;
}

.small-toolbar-btn-2 {
  font-weight: 400;
  font-size: 28px;
  color: #d9dadc;
}

.drawer {
  padding: 38px;
}

.small-symphonia-icon {
  position: absolute;
  bottom: 50px;
}

.blue-hover:hover {
  color: #2d46b9;
}

.account-button {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  background-color: transparent;
  text-decoration: none;
  line-height: 1.5;
  font-size: 16px;
  font-weight: 700;
  color: #000;
}

.logout-button {
  color: #919496;
}

#no-background-hover::before {
  background-color: transparent !important;
}
</style>
