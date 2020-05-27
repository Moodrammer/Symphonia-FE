export default {
  methods: {
    /**
     * This function is used to replace the already existing token in either the localStorage or the sessionStorage with
     * the new token sent from the server
     * @param {string} newUserToken
     * @public
     */
    setuserToken(newUserToken) {
      //If the old token is present in the localStorage
      if (localStorage.getItem("userToken") != null)
        localStorage.setItem("userToken", newUserToken);
      //If the old token is present in the sessionStorage
      else {
        sessionStorage.setItem("userToken", newUserToken);
      }
    }
  }
};
