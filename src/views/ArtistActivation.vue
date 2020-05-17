<template>
  <div class="mainContainer">
    <v-row
      justify="center"
      align-content="center"
      v-if="isLoading"
      class="centering"
    >
      <pulse-loader
        :loading="isLoading"
        color="black"
        size="20px"
      ></pulse-loader>
    </v-row>
    <v-container fluid v-if="!isLoading">
      <symphonia-header v-if="!isLoading"></symphonia-header>
      <v-divider></v-divider>
      <v-content style="max-width: 600px; margin: auto" class="my-5">
        <v-row
          v-if="isActivationTokenValid"
          justify="center"
          align-content="center"
          cols="12"
        >
          <h1 style="text-align: center;">Congratulations 🎉!</h1>
          <h2 style="text-align: center;">
            You have successfully joined the family of Symphonia artists
          </h2>
          <div style="text-align: center">
            you can now customize your profile, upload albums and songs and let
            the world hear you
          </div>
          <v-row justify="center" class="mt-2">
            <v-col cols="6">
              <v-row justify="center">
                <v-btn
                  id="goto-artist-profile"
                  block
                  rounded
                  color="#1db954"
                  large
                  class="white--text"
                  @click="navigateToArtistprofile"
                  >Go to artist profile</v-btn
                >
              </v-row>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="!isActivationTokenValid" justify="center">
          <v-col v-if="isActivationfailed">
            <h1 style="text-align: center;">
              The activation link you provided is invalid
            </h1>
            <h2 style="text-align: center;">
              Please re-check your email for the sent link and try again
            </h2>
          </v-col>
          <v-col v-if="isServerError">
            <h1 style="text-align: center">
              We're currently having some issues, Please try again later
            </h1>
          </v-col>
        </v-row>
      </v-content>
    </v-container>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import symphoniaHeader from "@/components/SymphoniaHeader.vue";
import axios from "axios";
export default {
  name: "ArtistActivation",
  data() {
    return {
      artistActivationToken: "",
      isLoading: false,
      isActivationTokenValid: true,
      isActivationfailed: false,
      isServerError: false
    };
  },
  components: {
    PulseLoader,
    symphoniaHeader
  },
  created() {
    this.isLoading = true;
    this.artistActivationToken = this.$route.params.activationToken;
  },
  async mounted() {
    try {
      let response = await axios.patch(
        `/v1/users/activate/${this.artistActivationToken}`
      );
      sessionStorage.setItem("userToken", response.data.token);
      //store the frequently used user data
      sessionStorage.setItem("username", response.data.user.name);
      sessionStorage.setItem("email", response.data.user.email);
      sessionStorage.setItem("userID", response.data.user._id);
      sessionStorage.setItem("type", response.data.user.type);
      sessionStorage.setItem("imageUrl", response.data.user.imageUrl);
      sessionStorage.setItem("authType", "symphonia");
      this.isLoading = false;
    } catch (error) {
      let errorResponseBody = error.response.data;
      this.isLoading = false;
      this.isActivationTokenValid = false;
      if (errorResponseBody.status == "fail") this.isActivationfailed = true;
      else {
        this.isServerError = true;
        console.log("I entered here");
      }
    }
  },
  methods: {
    /**
     * This function is used to simply navigate the artist to his profile after being activated
     * @public
     */
    navigateToArtistprofile() {
      this.$router.push("/webhome/home");
    }
  }
};
</script>

<style scoped>
.main {
  height: 100%;
}

.centering {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  height: 50%;
  width: 50%;
  margin: auto;
}
</style>
