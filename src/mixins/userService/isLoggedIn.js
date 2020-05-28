export default {
  methods: {
    /**
     * This function is used to check if the user is logged in or not where:
     * The function returns true if there is a token stored either in the localStorage or in the sessionStorage
     * The function returns false if there is no token stored in neither the localStoage nor the sessionStorage
     * @public
     */
    isLoggedIn() {
      if (
        localStorage.getItem("userToken") == null &&
        sessionStorage.getItem("userToken") == null
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
