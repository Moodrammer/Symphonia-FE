export default {
    methods: {
        /**
         * This function returns the current email whether from the localStorage or the sessionStorage to be used
         * Before you use this function check first that the user is logged in
         * @public
         */
        getemail() {
            //If the user checks rememberMe his token will be found in the localStorage
            if (localStorage.getItem("userToken") != null) {
            return localStorage.getItem("email");
            }
            //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
            else if (sessionStorage.getItem("userToken") != null) {
            return sessionStorage.getItem("email");
            }
        }
    }
}