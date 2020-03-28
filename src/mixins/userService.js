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
      if(localStorage.getItem("userToken") != null){
        localStorage.removeItem("userToken");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("userID");
        localStorage.removeItem("type" );
      }
      else{
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("userID");
        sessionStorage.removeItem("type" );
      }
      
    },
    /**
     * This function returns the userToken whether from the localStorage or the sessionStorage to be used
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
    },
    /**
     * This function returns the current userID whether from the localStorage or the sessionStorage to be used
     * Before you use this function check first that the user is logged in
     */
    getuserID() {
      //If the user checks rememberMe his token will be found in the localStorage
      if(localStorage.getItem("userToken") != null) {
        return localStorage.getItem("userID")
      }
      //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
      else if (sessionStorage.getItem("userToken") != null){
        return sessionStorage.getItem("userID")
      }
    },

    /**
     * This function returns the current username whether from the localStorage or the sessionStorage to be used
     * Before you use this function check first that the user is logged in
     */
    getusername() {
      //If the user checks rememberMe his token will be found in the localStorage
      if(localStorage.getItem("userToken") != null) {
        return localStorage.getItem("username")
      }
      //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
      else if (sessionStorage.getItem("userToken") != null){
        return sessionStorage.getItem("username")
      }
    },
    /**
     * This function returns the current userType whether from the localStorage or the sessionStorage to be used
     * Before you use this function check first that the user is logged in
     */
    getuserType() {
      //If the user checks rememberMe his token will be found in the localStorage
      if(localStorage.getItem("userToken") != null) {
        return localStorage.getItem("type")
      }
      //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
      else if (sessionStorage.getItem("userToken") != null){
        return sessionStorage.getItem("type")
      }
    },
    /**
     * This function returns the current email whether from the localStorage or the sessionStorage to be used
     * Before you use this function check first that the user is logged in
     */
    getemail() {
      //If the user checks rememberMe his token will be found in the localStorage
      if(localStorage.getItem("userToken") != null) {
        return localStorage.getItem("email")
      }
      //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
      else if (sessionStorage.getItem("userToken") != null){
        return sessionStorage.getItem("email")
      }
    },
  }
}