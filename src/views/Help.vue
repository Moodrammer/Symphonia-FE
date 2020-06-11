<template>
  <v-app class="color">
    <navBar />
    <v-content>
      <v-container fluid>
        <div class="container">
          <h1>How can we help you?</h1>
          <v-tabs fixed-tabs background-color="blue darken-1" dark>
            <v-tab @click="tabOne">
              Get Account?
            </v-tab>
            <v-tab @click="tabTwo">
              Can't log in?
            </v-tab>
            <v-tab @click="tabThree">
              Upload?
            </v-tab>
            <v-tab @click="tabFour">
              Premium Account?
            </v-tab>
          </v-tabs>
          <v-card
            class="mx-auto"
            style="margin-top:50px; height:400px"
            shaped
            v-if="tab1"
          >
            <v-card-text>
              <h2>
                Join us for Free !
              </h2>
              <p>
                Now, you can join us for free and
                <strong>Enjoy Synphonia Free</strong> Account
              </p>
              <p>
                <strong>There is 2 options:</strong>
                <br />
                1- Sign-up with email
                <br />
                2- Sign-up with Facebook
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                style="margin-left:70px;"
                large
                to="/signup"
              >
                Join US
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card
            class="mx-auto"
            style="margin-top:50px; height:400px"
            shaped
            v-if="tab2"
          >
            <v-card-text>
              <h2>
                Forget your info !
              </h2>
              <p>
                <strong>Password incorrect?</strong>
              </p>
              <p>
                <strong>You can recover your account</strong>
                <br />
                Use our reset tool
                <br />
                You need only your Email adress only
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                style="margin-left:70px;"
                large
                to="/password-reset/reset"
              >
                Reset
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card
            class="mx-auto"
            style="margin-top:50px; height:400px"
            shaped
            v-if="tab3"
          >
            <v-card-text>
              <h2>
                Upload Song to Synphonia now !
              </h2>
              <p>
                Now, you can join upload songs to our board
                <strong>Enjoy Music</strong>
              </p>
              <p>
                <strong>You must:</strong>
                <br />
                1- Be an artist! and log in
                <br />
                2- Go to the artist dashbourd
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                style="margin-left:70px;"
                large
                to="/login"
              >
                Upload Songs
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card
            class="mx-auto"
            style="margin-top:50px; height:400px"
            shaped
            v-if="tab4"
          >
            <v-card-text>
              <h2>
                Let's enjoy our premium features
              </h2>
              <p>
                Now, you can be
                <strong>Synphonia Premium</strong> Account
              </p>
              <p>
                <strong>You must:</strong>
                <br />
                1- Create an account
                <br />
                2- Select your plan for premium
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                style="margin-left:70px;"
                large
                to="/premium"
              >
                Join Premium
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-container>
    </v-content>
    <appFooter />
  </v-app>
</template>

<script>
import navBar from "../components/Homepage/TheHomepageNavigationBar.vue";
import appFooter from "../components/Homepage/TheHomepageFooter.vue";
/**
 * This Page is used for Help
 * @displayName Help
 * @example [none]
 */
export default {
  components: {
    // Render the Header and Footer for page
    navBar: navBar,
    appFooter: appFooter
  },
  data() {
    return {
      // Checks for the used Tab
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    };
  },
  methods: {
    /**
     * This function is used on clicking the first tab and to display first Content
     * @param [none]
     * @public
     */
    tabOne: function() {
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = false;
    },
    /**
     * This function is used on clicking the second tab and to display second Content
     * @param [none]
     * @public
     */
    tabTwo: function() {
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
      this.tab4 = false;
    },
    /**
     * This function is used on clicking the third tab and to display third Content
     * @param [none]
     * @public
     */
    tabThree: function() {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = true;
      this.tab4 = false;
    },
    /**
     * This function is used on clicking the fourth tab and to display fourth Content
     * @param [none]
     * @public
     */
    tabFour: function() {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = true;
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Circular;
  src: url("https://sp-bootstrap.global.ssl.fastly.net/8.12.4/fonts/circular-book.woff2")
      format("woff2"),
    url("https://sp-bootstrap.global.ssl.fastly.net/8.12.4/fonts/circular-book.woff")
      format("woff");
  font-style: normal;
  font-weight: 400;
}
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
body {
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  font-size: 18px;
  line-height: 1.5;
  color: #222326;
}
h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 1em 0 0.25em;
  font-size: 48px;
  text-align: center;
  color: cornsilk;
}
p {
  margin-top: 40px;
  margin-left: 60px;
  text-align: justify;
  padding-left: 1rem;
  font-size: 18px;
  color: black;
}
.color {
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
  height: 180vh;
}
h2 {
  margin-top: 50px;
  margin-left: 50px;
  font-size: 40px;
  margin-bottom: 25px;
  color: black;
}
</style>
