<template>
  <v-footer color="black">
    <div
      class="footer"
      v-bind:class="{ 'footer-small': isSm(), 'footer-small': isXs() }"
    >
      <v-container
        flat
        color="rgba(0, 0, 0, 0)"
        v-bind:class="{
          'toolbar-large-width': isLg(),
          'toolbar-medium-width': isMd(),
          'toolbar-small-width': isSm() || isXs()
        }"
        style="position: relative;"
      >
        <router-link v-if="isLg() || isMd()" to="/" class="links-column-1">
          <v-img src="/s11.png" max-width="50px" style="float: left;"></v-img>
          <h2 style="display: inline;" display-4 class="white--text">
            Symphonia
          </h2>
        </router-link>

        <router-link class="links-column-1" to="/" v-if="isSm() || isXs()">
          <v-img src="/s11.png" max-width="50px" style="float: left;"></v-img>
          <h2 style="display: inline;" display-4 class="white--text">
            Symphonia
          </h2>
        </router-link>

        <v-container
          class="links-column-1"
          v-bind:class="{
            'links-column-1-medium': isMd(),
            'small-symphonia-logo': isSm() || isXs(),
            'links-column-1-small': isSm()
          }"
        >
          <ul style="list-style-type:none;">
            <li class="links-column-title">
              company
            </li>
            <li class="links-column-item">
              About
            </li>
          </ul>
        </v-container>

        <v-container
          class="links-column-1"
          v-bind:class="{
            'links-column-1-medium': isMd(),
            'links-column-1-xsmall': isXs(),
            'links-column-1-small': isSm()
          }"
        >
          <ul style="list-style-type:none;">
            <li class="links-column-title">
              communities
            </li>
            <li class="links-column-item">
              For Artists
            </li>
          </ul>
        </v-container>

        <v-container
          class="links-column-1"
          v-bind:class="{
            'links-column-1-medium': isMd(),
            'links-column-1-xsmall': isXs(),
            'links-column-1-small': isSm()
          }"
        >
          <ul style="list-style-type:none;">
            <li class="links-column-title">
              useful links
            </li>
            <li class="links-column-item">
              Help
            </li>
            <router-link to="/webhome/home">
              <li class="links-column-item">
                Web Player
              </li>
            </router-link>
            <li class="links-column-item">
              For Mobile App
            </li>
          </ul>
        </v-container>

        <v-container
          class="links-column-3"
          v-bind:class="{ 'links-column-3-small': isSm() || isXs() }"
        >
          <router-link class="socialmedia-icon" to="/instagram">
            <v-icon medium class="socialmedia-icon-color">mdi-instagram</v-icon>
          </router-link>
          <router-link class="socialmedia-icon" to="/twitter">
            <v-icon medium class="socialmedia-icon-color">mdi-twitter</v-icon>
          </router-link>
          <router-link class="socialmedia-icon" to="/facebook">
            <v-icon medium class="socialmedia-icon-color">mdi-facebook</v-icon>
          </router-link>
        </v-container>
      </v-container>
    </div>
  </v-footer>
</template>

<script>
import getDeviceSize from "../../mixins/getDeviceSize";

/**
 * The homepage footer.
 * @version 1.0.0
 */

export default {
  mixins: [getDeviceSize]
};
</script>

<style scoped>
.small-symphonia-logo {
  clear: left;
}

.links-column-1 {
  width: 195px;
  float: left;
}

.links-column-1 ul {
  padding-left: 0px;
}

.links-column-1-medium {
  width: 162px;
}

.links-column-1-small {
  width: 230px;
}

.links-column-1-xsmall {
  clear: left;
}

.links-column-3 {
  width: auto;
  position: absolute;
  right: 0px;
  float: left;
}

.links-column-3-small {
  position: static;
  clear: left;
}

.links-column-item {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0;
  line-height: 1.5;
  text-decoration: none;
  padding: 3px 0 15px;
  color: white;
  font: 400 16px Helvetica, Arial, sans-serif;
}

.links-column-title {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-direction: normal;
  box-sizing: border-box;
  color: #919496;
  line-height: 1.4;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 20px 0;
  font: 900 12px Helvetica, Arial, sans-serif;
}

.links-column-item:hover {
  color: #1db954;
}

.toolbar-large-width {
  width: 1170px;
}

.toolbar-medium-width {
  max-width: 970px;
  width: 970px;
}

.toolbar-small-width {
  width: 750px;
}

.toolbar {
  flex: none;
  margin: auto;
}

.footer {
  width: 1519px;
  height: auto;
  padding: 80px 0px 50px 0px;
}

.footer-small {
  height: auto;
}

.socialmedia-icon {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  line-height: 1.5;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  text-decoration: none;
  color: #fff;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  overflow: hidden;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: #222326;
  margin-left: 15px;
  font: 400 16px Helvetica, Arial, sans-serif;
}

.socialmedia-icon-color {
  color: white;
}

.socialmedia-icon-color:hover {
  color: #1db954;
}

a {
  text-decoration: none;
}
</style>
