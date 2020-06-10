<template>
  <div>
    <v-snackbar
      v-model="notificationData.isNotificationShown"
      :timeout="notificationData.timeout"
      top
      right
      :color="notificationData.color"
      multi-line
    >
      <v-img
        :src="notificationData.notificationIcon"
        max-height="50"
        max-width="50"
      ></v-img>
      <v-col class="mr-1">
        <v-row>
          {{ notificationData.notificationTitle }}
        </v-row>
        <v-row>
          {{ notificationData.notificationBody }}
        </v-row>
      </v-col>
      <v-btn color="rgba(0,0,0,0)" icon depressed @click="goToPage">
        <v-icon color="white">mdi-arrow-right</v-icon>
      </v-btn>
      <v-btn @click="closeSnackbar" color="rgba(0,0,0,0)" icon depressed>
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
/**
 * The Notification Popup displays the user's recieved Push Notifications
 * @displayName Notification PopUp
 * @example [none]
 */
export default {
  name: "NotificationPopup",
  methods: {
    /**
     * @public
     * A function used to hide the notification pop-up by closing the snackbar
     */
    closeSnackbar() {
      const resetNotificationData = {
        notificationState: false,
        notificationTitle: "",
        notificationBody: "",
        notificationIcon: "/s11.png",
        timeout: 0,
        pushUrl: ""
      };
      this.$store.dispatch(
        "notification/setNotification",
        resetNotificationData
      );
    },
    /**
     * @public
     * A function used to push the user to a certain url according to the recieved notification
     */
    goToPage() {
      let pushUrl = this.notificationData.pushUrl;
      this.closeSnackbar();
      console.log(pushUrl);
      this.$router.push(pushUrl);
    }
  },
  computed: {
    notificationData() {
      return this.$store.state.notification.notificationData;
    }
  }
};
</script>

<style lang="scss" scoped></style>
