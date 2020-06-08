<template>
  <div class="col-sm-9">
    <div class="content">
      <div class="header-container">
        <h1>Notification settings</h1>
      </div>
      <div class="section">
        <table class="table table-responsive">
          <thead>
            <tr>
              <th class="table-category">Push notifications Settings</th>
            </tr>
          </thead>
          <tbody>
            <tr class="form-group">
              <td>
                Allow Push Notifications
                <p v-if="getuserType() == 'user'" class="description">
                  Push Notifications are sent on multiple events either. An
                  Artist you follow adds a new track or album, or a user follows
                  one of your amazing playlists
                </p>
                <p v-if="getuserType() == 'artist'" class="description">
                  Push Notifications are sent on multiple events either. An
                  Artist you follow adds a new track or album, a user follows
                  one of your amazing playlists, or a user starts to follow your
                  artist account
                </p>
              </td>
              <td>
                <div>
                  <v-switch 
                  v-model="IsPushNotificationsAllowed"
                  color="green"
                  id="notification-permission-switch"
                  >
                  </v-switch>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <bottom-content></bottom-content>
    </div>
  </div>
</template>

<script>
import BottomContent from "./BottomContent.vue";
import getuserType from "../../mixins/userService/getuserType";
import getuserToken from "../../mixins/userService/getUserToken";
import isNotificationsAllowed from "../../mixins/userService/isNotificationsAllowed";

export default {
  created() {
    if (this.isNotificationsAllowed() == true) {
      this.$store.commit("notification/setPushNotificationsPermission", true);
    } else {
      this.$store.commit("notification/setPushNotificationsPermission", false);
    }
  },
  computed: {
    IsPushNotificationsAllowed: {
      get: function() {
        return this.$store.state.notification.isPushNotificationsAllowed;
      },
      set: function(newValue) {
        if (newValue) {
          let userToken = this.getuserToken();
          this.$store.dispatch("notification/getRegistrationToken", userToken);
          localStorage.setItem("allowNotifications", true);
        } else {
          this.$store.dispatch("notification/unsubscribeUser");
          localStorage.setItem("allowNotifications", false);
        }
        this.$store.commit(
          "notification/setPushNotificationsPermission",
          newValue
        );
      }
    }
  },
  components: {
    "bottom-content": BottomContent
  },
  mixins: [getuserType, getuserToken, isNotificationsAllowed]
};
</script>

<style lang="sass" scoped>
@import "./style/notification.sass"
</style>
