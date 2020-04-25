<template>
  <div></div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params.userToken);
    sessionStorage.setItem("userToken", this.$route.params.userToken);
    //extract the user object
    const user = JSON.parse(this.$route.query.user, this.replacer);
    //Store the frequently used user data in the session storage
    sessionStorage.setItem("username", user.name);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("userID", user._id);
    sessionStorage.setItem("type", user.type);
    sessionStorage.setItem("imageUrl", user.imageUrl);
    sessionStorage.setItem("imageFacebookUrl", user.imageFacebookUrl);
    sessionStorage.setItem("authType", "facebook");
    //redirect the user to the player home page
    this.$router.push("/webhome/home");
  },
  methods: {
    replacer(key, value) {
      var maskedValue = value;
      if (key == "imageFacebookUrl") {
        maskedValue = decodeURIComponent(maskedValue);
      }
      return maskedValue;
    }
  }
};
</script>

<style lang="scss" scoped></style>
