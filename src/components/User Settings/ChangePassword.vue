<template>
  <div class="col-sm-9">
    <!-- the main contant of the page of Edit profile -->
    <div class="content">
      <div class="header-container">
        <h1>Change your password</h1>
      </div>
      <div class="form-container">
        <div class="alert-success" v-show="Done">Password updated</div>
        <!-- here we take the changes for both users facebook & normal ones to change the profile -->
        <form @submit.prevent="check">
          <!-- The Current password content -->
          <div class="form-group">
            <label for="Current-password">Current password</label>
            <input
              type="password"
              class="text"
              v-model="currentPassword"
              minlength="8"
              id="current"
            />
            <p v-show="errorWrongPass" class="alert">
              Sorry,wrong password or old one
            </p>
          </div>
          <!-- The gender content -->
          <div class="form-group">
            <label for="New-password">New password</label>
            <input
              type="password"
              class="text"
              v-model="newPassword"
              minlength="8"
              id="pass"
            />
            <p v-show="errorEmptyNew" class="alert">
              Enter a password to continue.
            </p>
          </div>
          <!-- The date of birth content -->
          <div class="form-group">
            <label for="Confirm">Repeat new password</label>
            <input
              type="password"
              class="text"
              v-model="confirmPassword"
              minlength="8"
              id="confirm"
            />
            <p v-show="errorWrongMatch" class="alert">
              Please verify your password
            </p>
            <p v-show="errorEmptyConfirm" class="alert">
              Please verify your password.
            </p>
          </div>
          <div class="button-col">
            <!-- get the changes or cancel it -->
            <button>save profile</button>
            <a href="/account/" class="a-cancel">cancel</a>
          </div>
        </form>
      </div>
      <bottom-content></bottom-content>
    </div>
  </div>
</template>

<script>
import BottomContent from "./BottomContent.vue";
import getuserID from "@/mixins/userService/getuserID.js";
/**
 * This page is used to chnage the current user's password
 * @displayName User Change Password
 * @example [none]
 */
export default {
  data() {
    return {
      // the variable used for current user's password
      currentPassword: "",
      // the new password variable
      newPassword: "",
      // the confirm that they match the new password variable
      confirmPassword: "",
      // Prints the wrong password message if it's true
      errorWrongPass: false,
      // Prints the wrong match of the new & confirmed passwords
      errorWrongMatch: false,
      // Print error if the input text box of the new password is empty
      errorEmptyNew: false,
      // print error if the input text box of the Confirm password is empty
      errorEmptyConfirm: false,
      // Print the success message that the password is changed
      Done: false
    };
  },
  components: {
    // The review content
    "bottom-content": BottomContent
  },
  methods: {
    /**
     * Check for the validations of data inserted or empty
     * @public This is a public method
     * @param {None}
     */
    check: function() {
      // Frist reset all errors
      this.errorWrongPass = false;
      this.errorWrongMatch = false;
      this.errorEmptyNew = false;
      this.errorEmptyConfirm = false;
      // Second check if the fields not empty
      if (this.currentPassword === "") {
        this.errorWrongPass = true;
      }
      if (this.newPassword === "") {
        this.errorEmptyNew = true;
      }
      if (this.confirmPassword === "") {
        this.errorEmptyConfirm = true;
      }
      //Third check the New & Confirm are varified
      if (this.confirmPassword !== this.newPassword) {
        this.errorWrongMatch = true;
      }
      //Fourth send the data if there is no error
      if (
        !this.errorWrongMatch &&
        !this.errorWrongPass &&
        !this.errorEmptyNew &&
        !this.errorEmptyConfirm
      ) {
        this.updatePassword();
      }
    },
    /**
     * Submit the new password and send info
     * @public This is a public method
     * @param {None}
     */
    updatePassword: function() {
      this.$store
        .dispatch("updatePass", {
          passwordCurrent: this.currentPassword,
          password: this.newPassword,
          passwordConfirm: this.confirmPassword,
          id: this.getuserID()
        })
        .then(() => {
          this.Done = true;
        })
        .catch(() => {
          this.errorWrongPass = true;
        });
    }
  },
  mixins: [getuserID]
};
</script>

<style lang="sass" scoped>
@import "./style/changePass.sass"
</style>
