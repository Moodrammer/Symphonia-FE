<template>
  <div class="container">
    <div class="jumbotron">
      <div class="hidden-sm-only hidden-xl-only hidden-md-only hidden-lg-only">
        <v-menu
          :open-on-hover="true"
          :close-on-click="true"
          :close-on-content-click="true"
          :offset-y="true"
        >
          <template v-slot:activator="{ on }">
            <v-btn color="white" width="100%" v-on="on" height="2.5rem" large>
              <span style="font-size:16px;">MENU</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/account/" exact id="account"
                  ><i class="fas fa-home svg"></i> Account overview</router-link
                >
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/account/edit" exact id="edit"
                  ><i class="fas fa-pencil-alt svg"></i> Edit
                  profile</router-link
                >
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/account/changePassword" exact id="pass"
                  ><i class="fas fa-lock svg"></i> Change password</router-link
                >
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/account/notifications" exact id="notif"
                  ><i class="fas fa-bell svg"></i> Notification
                  settings</router-link
                >
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/account/recover-playlists" exact id="recover"
                  ><i class="fas fa-redo svg"></i> Recover playlists</router-link
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-7 col-lg-offset-1 content-ads col-lg-auto">
          <h1>Music without limits</h1>
          <p>
            Premium lets you play any song, anytime. You can even listen when
            you’re offline. No restrictions. No ads.
          </p>
          <button class="btn-theme hidden-xs-only" @click="direct">
            Get Premium
          </button>
        </div>
        <div class="col-sm-4">
          <!-- <a href="#" class="btn-theme-2 hidden-sm-and-up">Get Premium</a> -->
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
  },
  methods: {
    direct: function() {
      this.$router.push("/premium/?checkout=false");
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./style/PremiumAds.sass"
</style>
