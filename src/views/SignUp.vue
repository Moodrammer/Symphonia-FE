<template>
  <div>
    <!-- Header of Sign Up page  -->
    <symphonia-Header></symphonia-Header>

    <v-divider></v-divider>
    <!-- Body of the sign up page -->
    <v-container>
      <v-content max-width="500px">
        <v-row justify="center">
          <v-col cols="12">
            <!-- Facebook and Google SignUp division -->
            <v-row justify="center" class="mb-5">
              <v-col cols="6">
                <!-- Facebook button -->
                <v-row justify="center" class="mb-2">
                  <v-btn
                    id="fb-sign-btn"
                    rounded
                    color="#3B5998"
                    class="white--text"
                    style="font-size: 14px"
                    large
                    block
                    >Sign up with Facebook</v-btn>
                </v-row>
                <!-- Google button -->
                <v-row justify="center" class="my-0">
                    <v-btn
                    id="ggl-sign-btn"
                    rounded
                    color="#007ec6"
                    class="white--text"
                    style="font-size: 14px"
                    large
                    block
                    ><div class="px-2"> Sign up with Google </div></v-btn>
                </v-row>
              </v-col>
            </v-row>

            <!-- Email Sign division -->
            <!-- The form takes a fixed width and the rest of the elements take the form's width -->
            <!-- Adding a reference to the form to be able to refer to it on submission -->
            <v-form
              ref="userDataForm"
              class="compact-form"
              style="margin-top: 20px; width: 100%; margin: auto;"
            >
              <!-- Divider between both ways to sign up -->
              <v-row>
                <v-divider></v-divider>
                <span style="font-size:14px;">or</span>
                <v-divider></v-divider>
              </v-row>

              <div
                class="text-center mb-3"
                style="font: 18px arial,sans serif; font-weight: bold;"
              >
                Sign up with your email address
              </div>
              <!-- User email text field -->
              <v-text-field
                placeholder="Email"
                outlined
                style="width : 100%; height: 80px; margin: auto"
                type="email"
                :rules="emailRules"
                @input="checkEmailConf()"
                v-model="userData.email"
                maxlength="200"
                id="user-email"
              ></v-text-field>
              <!-- Confiramtion email text field -->
              <v-text-field
                placeholder="Confirm email"
                outlined
                style="width : 100%; height: 80px; margin: auto"
                type="email"
                :rules="emailConfirmationRules"
                :error-messages="checkEmailConf()"
                v-model="userData.emailToMatch"
                maxlength="200"
                id="user-confirmation-email"
              ></v-text-field>
              <!-- Password text field -->
              <v-text-field
                placeholder="Password"
                outlined
                style="width : 100%; height: 80px; margin: auto"
                type="password"
                :rules="passwordRules"
                v-model="userData.password"
                maxlength="30"
                id="user-password"
              ></v-text-field>
              <!-- user name text field -->
              <v-text-field
                placeholder="What should we call you?"
                outlined
                style="width : 100%; height: 80px; margin: auto"
                :rules="usernameRules"
                maxlength="30"
                v-model="userData.username"
                id="username"
              ></v-text-field>
              <!-- Date of birth division -->
              <span class="text-left">Date of birth</span>

              <v-row style="width: 100%; margin: auto;" justify="space-between">
                <v-col cols="3" class="pl-0 pb-1">
                  <v-text-field
                    placeholder="Day"
                    outlined
                    width="90%"
                    :rules="dayRules"
                    v-model="userData.daySelected"
                    id="birth-day"
                  ></v-text-field>
                </v-col>

                <v-col cols="6" class="pb-1">
                  <v-overflow-btn
                    placeholder="month"
                    outlined
                    width="90%"
                    :items="item"
                    :rules="monthRules"
                    v-model="userData.monthSelected"
                    id="birth-month"
                  ></v-overflow-btn>
                </v-col>

                <v-col cols="3" class="pr-0 pb-1">
                  <v-text-field
                    placeholder="Year"
                    outlined
                    width="90%"
                    :rules="yearRules"
                    v-model="userData.yearSelected"
                    id="birth-year"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Gender radio group -->
              <v-row justify-left>
                <v-radio-group
                  row
                  class="pl-2"
                  :rules="genderRules"
                  v-model="userData.gender"
                  id="gender"
                >
                  <v-radio label="Male" value="male" id="male-select"></v-radio>
                  <v-radio label="Female" value="female" id="female-select"></v-radio>
                </v-radio-group>
              </v-row>
              <v-divider/>
              <v-row justify="center" class="mt-2">
                <h2>How do you like to use Symphonia ?</h2>
              </v-row>
              <!-- type radio group -->
              <v-row justify="center">
                <v-radio-group
                  row
                  class="pl-2"
                  :rules="typeRules"
                  v-model="userData.type"
                  id="type"
                >
                  <v-radio label="Listener" value="user" color="green" id="listener-select"></v-radio>
                  <v-radio label="Artist" value="artist" color="red" id="artist-select"></v-radio>
                </v-radio-group>
              </v-row>
              <!-- Sign up button -->
              <v-row justify="center">
                <v-col cols="8" class="py-2">
                  <v-btn
                    id="sign-up-btn"
                    color="#1DB954"
                    dark
                    rounded
                    block
                    large
                    @click="submitForm"
                  >Sign up</v-btn>
                </v-col>
              </v-row>
              <!-- link to the Login page -->
              <v-row justify="center">
                <span class="text--center">
                  Already Have an account?
                  <router-link to="/Login" class="green--text">Log in</router-link>
                </span>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-content>
    </v-container>
  </div>
</template>

<script>
import symphoniaHeader from "@/components/SymphoniaHeader.vue";
import isLoggedIn from "@/mixins/userService"

export default {
  components: {
    symphoniaHeader
  },
  data() {
    return {
      //User sign up data
      //All the userData provided by the form
      userData: {
        email: "",
        emailToMatch: "",
        password: "",
        username: "",
        daySelected: "",
        monthSelected: "",
        yearSelected: "",
        gender: "",
        type: ""
      },
      //Set of rules for validation
      emailRules: [
        v => !!v || "Please enter your email",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Enter a password to continue",
        v => (v && v.length >= 8) || "Password is too short"
      ],
      dayRules: [
        v => (v >= 1 && v <= 31) || "Please enter a valid day of the month"
      ],
      yearRules: [
        v => v >= 1900 || "Please enter a valid year",
        v =>
          v < 2000 || "Sorry, but you don't meet Symphonia's age requirements"
      ],
      monthRules: [v => !!v || "Please enter your birth month"],
      usernameRules: [v => !!v || "What should we call you?"],
      genderRules: [v => !!v || "Please indicate your gender"],
      typeRules: [v => !!v || "Do you wish to sign up as a listener or an artist"],

      //items and data
      item: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  },
  //Taken from : https://stackoverflow.com/questions/47213703/vuetify-form-validation-defining-es6-rules-for-matching-inputs
  computed: {
    /**
     * This function is for validation that the confiration email matches the email address written in the form Data
     */
    emailConfirmationRules() {
      return [
        v => !!v || "Please enter your email",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        //() =>
        //  this.userData.email === this.userData.emailToMatch ||
        //  "E-mail must match"
      ];
    },
    /**
     * Computing the Date of birth from the three text fields of the user and setting their format
     */
    DateOfBirth() {
      //get the month number from the array
      let monthnumber;
      for (monthnumber = 1; monthnumber < this.item.length; monthnumber++) {
        if (this.item[monthnumber - 1] == this.userData.monthSelected) break;
      }
      return `${this.userData.daySelected}-${monthnumber}-${this.userData.yearSelected}`;
    }
  },
  mixins: [isLoggedIn],
  created() {
    //check if the user is logged in
    if(this.isLoggedIn() == true){
      this.$router.push("/")
    }
  },
  methods: {
    /**
     * This function continuously checks that the email matches the confirmation email
     * for validation
     * @public
     */
    checkEmailConf() {
      if (this.userData.emailToMatch != "") {
        if (this.userData.email == this.userData.emailToMatch) {
          return "";
        } else {
          if (!/.+@.+\..+/.test(this.userData.emailToMatch))
            return "Email must be valid";
          else return "Email must match";
        }
      }
    },
    /**
     * This functions Submits the form data , then gives the user feedback about his sign up operation
     * If the operation is successful the user is directed to the application
     * Else the user stays till the form is valid
     * @public
     */
    submitForm() {
      if (this.$refs.userDataForm.validate()) {
        //Store the user's date of birth in the store
        this.$store.commit("setuserDOB", this.DateOfBirth);
        //This action returns a promise to show whether the user had sighned up successfully or not
        this.$store
          .dispatch("registerUser", this.userData)
          .then(() => {
            this.$router.push("/Login");
          })
          //if an error object was caught temporarily display it in the console
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.compact-form {
  transform: scale(0.8);
  transform-origin: center top;
}

.v-content {
  max-width: 500px;
  margin: auto;
}

</style>
