export default {
    methods: {
     /**
     * returns the user authentication type which is either: facebook | google | Symphonia
     * @public
     */
    getauthType() {
        if (localStorage.userToken != null)
          return localStorage.getItem("authType");
        else if (sessionStorage.userToken != null)
          return sessionStorage.getItem("authType");
      }
    }
}