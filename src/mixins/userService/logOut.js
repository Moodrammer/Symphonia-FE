export default {
  methods: {
    /**
     * We clear both the localStorage and the sessionStorage using this function when the user logs out
     * @public
     */
    logOut() {
      // inform the server to unregister the user from notifications service
      this.$store.dispatch("notification/unsubscribeUser");
      if (localStorage.getItem("userToken") != null) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("userID");
        localStorage.removeItem("type");
        localStorage.removeItem("imageUrl");
        localStorage.removeItem("authType");
      } else {
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("userID");
        sessionStorage.removeItem("type");
        sessionStorage.removeItem("imageUrl");
        sessionStorage.removeItem("imageGoogleUrl");
        sessionStorage.removeItem("imageFacebookUrl");
        sessionStorage.removeItem("authType");
      }
    }
  }
};
