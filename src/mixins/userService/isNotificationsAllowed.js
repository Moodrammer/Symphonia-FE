export default {
  methods: {
    /**
     * @public
     * This functions checks if the user allows sending push notifications or not from settings
     */
    isNotificationsAllowed() {
      if (localStorage.getItem("allowNotifications") == "true") return true;
      else return false;
    }
  }
};
