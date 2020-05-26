export default {
    methods: {
     /**
     * This function is used to get the userimageUrl from the local or session Storage
     * @public
     */
    getimageUrl() {
        //If the user checks rememberMe his token will be found in the localStorage
        if (localStorage.getItem("userToken") != null) {
          return localStorage.getItem("imageUrl");
        }
        //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
        else if (sessionStorage.getItem("userToken") != null) {
          //If the user is logged in with google get his google image
          let gglImg = sessionStorage.getItem("imageGoogleUrl");
          let fbImg = sessionStorage.getItem("imageFacebookUrl");
          if (gglImg != null) return gglImg;
          else if (fbImg != null) return fbImg;
          else return sessionStorage.getItem("imageUrl");
        }
      }
    }
}