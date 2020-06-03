<template>
  <div @keyup="checkEnterKey">
    <symphonia-header></symphonia-header>
    <v-divider></v-divider>
    <!-- container for login section -->
    <v-container fluid id="loginSection">
      <v-content style="margin: auto; max-width: 450px;">
        <v-row>
          <v-col cols="12" class="pb-1">
            <v-row justify="center">
              <h4>To continue, log in to Symphonia.</h4>
            </v-row>
          </v-col>
        </v-row>
        <!-- alert that shows on false login -->
        <v-row v-if="errorState">
          <v-col cols="12" class="py-1">
            <v-alert color="#e22134" style="font-size: 12px" dense>
              <v-row justify="center">
                <div class="white--text px-3 py-2">
                  {{ errorMessage }}
                </div>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- Facebook button  -->
        <v-row>
          <v-col cols="12" class="py-0 pb-1">
              <v-btn
                block
                large
                rounded
                color="#3B5998"
                class="white--text"
                id="fb-login"
                @click="loginWithFacebook"
                >CONTINUE WITH FACEBOOK</v-btn
              >
          </v-col>
        </v-row>
        <!-- Google button -->
        <v-row>
          <v-col cols="12" class="pt-1">
            <a href="https://thesymphonia.ddns.net/api/v1/users/auth/google">
              <v-btn
                block
                large
                rounded
                color="#dd4b39"
                class="white--text"
                id="ggl-login"
              >
                CONTINUE WITH GOOGLE
              </v-btn>
            </a>
          </v-col>
        </v-row>
        <!-- Divider row -->
        <v-row justify="center">
          <v-col cols="12">
            <v-row>
              <v-col cols="5" class="pa-0">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="2" class="pa-0">
                <v-row justify="center">
                  <div style="font-size: 12px;">
                    <strong>OR</strong>
                  </div>
                </v-row>
              </v-col>
              <v-col cols="5" class="pa-0">
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- Login form -->
        <v-form ref="loginForm">
          <v-row justify="center">
            <v-col cols="11" class="pa-0 pb-3">
              <v-text-field
                id="login-username"
                name="username"
                type="text"
                placeholder="Email adderss"
                outlined
                dense
                v-model="formData.email"
                style="height: 40px;"
                maxlength="200"
                :rules="emailRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="11" class="pa-0 pt-3 pb-2">
              <v-text-field
                id="login-password"
                name="password"
                type="password"
                placeholder="Password"
                outlined
                dense
                v-model="formData.password"
                style="height: 40px;"
                maxlength="30"
                :rules="passwordRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="6" class="pa-0 pl-3" align-self="center">
              <v-checkbox
                label="Remember me"
                v-model="formData.rememberMe"
                color="green"
                id="rm-chkbx"
              ></v-checkbox>
            </v-col>
            <!-- Log in button -->
            <v-col cols="11" sm="6" class="pa-0" align-self="center">
              <v-btn
                id="login-button"
                color="#1db954"
                class="white--text"
                rounded
                large
                block
                @click="login"
                >LOG IN</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
        <!-- Forgot your password ? -->
        <v-row>
          <v-col cols="12">
            <v-row justify="center">
              <router-link to="/password-reset/reset"
                >Forgot your password?</router-link
              >
            </v-row>
          </v-col>
        </v-row>
        <!-- Divider for sign up section -->
        <v-row justify="center">
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <!-- Route to Sign up section -->
        <v-row>
          <v-col cols="12">
            <v-row justify="center">
              <h3>Don't have an account?</h3>
            </v-row>
            <v-btn
              id="signup-button"
              color="white"
              class="grey--text"
              block
              rounded
              large
              style="border: solid 3px grey !important"
              :to="{path: '/signup', query:{redirect: this.$route.query.redirect}}"
              >SIGN UP FOR SYMPHONIA</v-btn
            >
          </v-col>
        </v-row>
        <!-- Simple tip for facebook sign -->
        <!-- Divider -->
        <v-row justify="center">
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <!-- Simple tip -->
        <v-row>
          <v-col cols="12">
            <v-row justify="center">
              <div
                style="font-size: 10px; text-align: center;"
                class="grey--text"
              >
                If you click "Log in with Facebook" and are not a Symphonia
                user, you will be registered
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-content>
    </v-container>
  </div>
</template>

<script>
import symphoniaHeader from "@/components/SymphoniaHeader.vue";
import axios from 'axios'

export default {
  name: "login",
  components: {
    symphoniaHeader
  },
  data() {
    return {
      //The user data
      formData: {
        email: "",
        password: "",
        rememberMe: false
      },
      //Back end data error handling
      errorMessage: "",
      errorState: false,
      //validation rules for input data
      emailRules: [
        v => !!v || "Please enter your Symphonia email address.",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Please enter your password."],
      //Facebook login handling data
      FBObject: {}
    };
  },
  created(){
    //Initialize the facebook SDK
    this.initializeFacebookSDk();
  },
  methods: {
    /**
     * This method checks on any keyup event if the user has pressed the Enter key to submit the Login form
     * @public
     */
    checkEnterKey(e) {
      if (e.keyCode == "13") this.login();
    },
    /**
     * This is the login method to validate and submit the user credentials to the server then redirect the user to
     * the application if the user enters valid data
     * @public
     */
    login() {
      //clear the back error messages & alert
      this.errorMessage = "";
      this.errorState = false;
      //if the form validates and had no restrictions
      if (this.$refs.loginForm.validate()) {
        this.$store
          .dispatch("loginuser", {
            email: this.formData.email,
            password: this.formData.password,
            rm: this.formData.rememberMe
          })
          .then(() => {
              this.$router.push(this.$route.query.redirect || "/webhome/home");
          })
          .catch(err => {
            if (err.status == "fail") {
              this.errorMessage = err.msg;
              this.errorState = true;
            } else if (err.status == "error") {
              this.errorMessage = "Please try again later";
              this.errorState = true;
            }
          });
      }
    },
    async initializeFacebookSDk(){
      let response = await this.initSdk({
      appId      : '820827945085597',
      xfbml      : true,                     // Parse social plugins on this webpage.
      version    : 'v7.0'           // Use this Graph API version for this call.
      })
      console.log(response)
      this.FBObject = response
    },
    //funtion taken from https://github.com/adi518/vue-facebook-login-component/blob/master/packages/vue-facebook-login-component/src/Sdk.js
    initSdk(options){
      return new Promise((resolve) => {
        // prettier-ignore
        window.fbAsyncInit = function() {
          window.FB.init(options)
          resolve(window.FB)
        }; // eslint-disable-line
        /* eslint-disable */
        // prettier-ignore
        (function (d, s, id) {
          const fjs = d.getElementsByTagName(s)[0]
          if (d.getElementById(id)) { return; }
          const js = d.createElement(s); js.id = id
          js.src = '//connect.facebook.net/en_US/sdk.js'
          fjs.parentNode.insertBefore(js, fjs)
        }(document, 'script', 'facebook-jssdk'))
        /* eslint-enable */
      })
    },
    loginWithFacebook(){
      this.FBObject.login((response) => {
        console.log(response)
        if(response.status == 'connected')
          axios.post("https://thesymphonia.ddns.net/users/auth/facebook/Symphonia",{
            access_token: response.authResponse.accessToken
          }).then(response => {
            sessionStorage.setItem("userToken", response.data.token);
            //store the frequently used user data
            sessionStorage.setItem("username", response.data.user.name);
            sessionStorage.setItem("email", response.data.user.email);
            sessionStorage.setItem("userID", response.data.user._id);
            sessionStorage.setItem("type", response.data.user.type);
            sessionStorage.setItem("imageUrl", response.data.user.imageUrl);
            sessionStorage.setItem("authType", "facebook");
            this.$router.push(this.$route.query.redirect || "/webhome/home");
          }).catch(err => {
            console.log(err)
          })
      })
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: green;
}
</style>
