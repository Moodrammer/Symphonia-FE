  export default {
  methods: {
    /**
     * This function is used to check if the user is logged in or not where: 
     * The function returns true if there is a token stored either in the localStorage or in the sessionStorage 
     * The function returns false if there is no token stored in neither the localStoage nor the sessionStorage  
     */
    isLoggedIn() {
      if ((localStorage.getItem("userToken") == null) && (sessionStorage.getItem("userToken") == null)) {
        return false;
      }
      else {
        return true;
      }
    },
    /**
     * We clear both the localStorage and the sessionStorage using this function when the user logs out 
     */
    logOut() {
      localStorage.removeItem("userToken");
      sessionStorage.removeItem("userToken");
    },
    /**
     * This function returns the userToken whether from the localStorage or the sessionStorage to be user
     * the request headers
     * Before you use this function check first that the user is logged in
     */
    getuserToken() {
      //If the user checks rememberMe his token will be found in the localStorage
      if(localStorage.getItem("userToken") != null) {
        return localStorage.getItem("userToken")
      }
      //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
      else if (sessionStorage.getItem("userToken") != null){
        return sessionStorage.getItem("userToken")
      }
    }
  }
}