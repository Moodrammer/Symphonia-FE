export default {
  methods: {
    isLoggedIn() {
      if (localStorage.getItem("userToken") == "") {
        return false;
      } else {
        return true;
      }
    },
    logOut() {
      localStorage.setItem("userToken", "");
    }
  }
};
