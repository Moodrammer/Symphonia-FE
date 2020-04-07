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
        <form action="#">
          <!-- The Current password content -->
          <div class="form-group">
            <label for="Current-password">Current password</label>
            <input type="password" class="text" v-model="currentPassword" minlength="8"/>
            <p v-show="errorWrongPass" class="alert">
              Sorry,wrong password or old one
            </p>
          </div>
          <!-- The gender content -->
          <div class="form-group">
            <label for="New-password">New password</label>
            <input type="password" class="text" v-model="newPassword" minlength="8" />
            <p v-show="errorEmptyNew" class="alert">
              Enter a password to continue.
            </p>
          </div>
          <!-- The date of birth content -->
          <div class="form-group">
            <label for="Confirm">Repeat new password</label>
            <input type="password" class="text" v-model="confirmPassword" minlength="8" />
            <p v-show="errorWrongMatch" class="alert">
              Please verify your password
            </p>
            <p v-show="errorEmptyConfirm" class="alert">
              Please verify your password.
            </p>
          </div>
          <div class="button-col">
            <!-- get the changes or cancel it -->
            <button @click="check">save profile</button>
            <a href="/account/" class="a-cancel">cancel</a>
          </div>
        </form>
      </div>
      <bottomContent />
    </div>
  </div>
</template>

<script>
import bottomContent from "./bottomContent.vue";
import getuserID from "@/mixins/userService";
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
    bottomContent: bottomContent
  },
  methods: {
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
        this.updatePass();
      }
    },
    //Todo::edit the errors come from the post request (incorrect password)
    //--------------- 4/3/2020---------------------------------------------------------------------------
    // - No need to return data in this method only dispatch the action and execute .then to set the userToken
    //   or catch the error state (See the method in login or SignUp)(Done)
    // - Send the user token current token in the authorization header
    // - replace the stored token either in the local or sessin Storage with the one returned in the response(i
    // will provide you a setuserToken mixin from the userSevice for the sake of that replacement)
    // ------------------------------------------------------------------------------------------------
    updatePass: function() {
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
        .catch(()=> {
          this.errorWrongPass = true;
        });
    }
  },
  mixins: [getuserID]
};
</script>

<style scoped>
@font-face {
  font-family: Circular;
  src: url("https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff2")
      format("woff2"),
    url("https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff") format("woff"),
    url("https://open.scdn.co/fonts/CircularSpUIv3T-Book.ttf") format("ttf");
  font-style: normal;
  font-weight: 400;
}
* {
  box-sizing: border-box;
}
body {
  font-family: Circular, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #222326;
  box-sizing: border-box;
  font-weight: 400;
}
.col-sm-9 {
  width: 75%;
  position: relative;
  padding: 0 15px;
  background-color: white;
}
.content {
  padding: 60px;
  background-color: #f8f8f8;
  justify-content: space-between;
  margin-left: -15px;
  margin-right: -15px;
}
h1 {
  font-size: 26px;
  margin: 0.5em 0;
  color: #1db954;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.header-container {
  padding-bottom: 0;
  margin-top: 0;
  margin-right: 0px;
  margin-bottom: 24px;
  margin-left: 0px;
  border-bottom: 1px solid #efefef;
}
.form-container {
  padding: 40px;
  margin-bottom: 10px;
  border-radius: 0;
  box-shadow: none;
  background-color: #fff;
  border: 1px solid transparent;
  min-height: 20px;
}
.form-container::before {
  content: " ";
  display: table;
}
.form-container::after {
  clear: both;
  content: " ";
  display: table;
}
.form-group {
  margin-bottom: 20px;
}
label {
  color: #919496;
  font-weight: 400;
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
}
p {
  padding-top: 7px;
  padding-bottom: 7px;
  margin-bottom: 0;
  min-height: 40px;
  margin-top: 0.5em;
  margin-right: 0px;
  margin-left: 0px;
}
#country {
  background-image: url("https://img.icons8.com/ios/90/000000/expand-arrow--v2.png");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  color: #222326;
  padding-right: 48px;
  text-indent: 0.01px;
  text-overflow: "";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-transition: border-color ease-in-out 0.15s,
    box-shadow ease-in-out 0.15s;
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  display: block;
  width: 100%;
  height: 40px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 12px;
  font-size: 16px;
  line-height: 1.5;
  background-color: #fff;
  border: 1px solid #d9dadc;
  border-radius: 0;
  text-transform: none;
  margin: 0;
}
#country::placeholder {
  transition: color 0.15s ease-in-out;
  color: #c1c3c6;
  opacity: 1;
}
#country:focus {
  border-color: #919496;
  outline: 0;
  box-shadow: none;
}
.text {
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -webkit-appearance: none;
  display: block;
  width: 100%;
  height: 40px;
  padding: 6px 12px;
  font-size: 16px;
  line-height: 1.5;
  color: #222326;
  background-color: #fff;
  background-image: none;
  border-top-style: solid;
  border-top-width: 1px;
  border-right-style: solid;
  border-right-width: 1px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-left-style: solid;
  border-left-width: 1px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-radius: 0;
  margin: 0;
}
.text:focus {
  box-shadow: none;
  border-color: #919496;
  outline: 0;
}
.checkbox {
  padding-left: 1.75em;
  font-weight: 400;
  color: #919496;
  min-height: 24px;
  margin-bottom: 0;
  cursor: pointer;
  display: inline-block;
  max-width: 100%;
}
.checkbox-input {
  opacity: 1;
  z-index: 1;
  position: absolute;
  margin-left: -20px;
  line-height: normal;
  margin-top: 4px;
  margin-right: 0px;
  margin-bottom: 0px;
  box-sizing: border-box;
  padding: 0;
  cursor: pointer;
}
.checkbox-input:focus {
  outline-offset: -2px;
}
.button-col {
  border-top: 1px solid #efefef;
  margin-top: 40px;
  margin-bottom: -10px;
  padding: 30px 0 0;
}
.button-col::before {
  content: " ";
  display: table;
}
button {
  float: right !important;
  max-width: 290px;
  font-size: 12px;
  line-height: 1;
  border-radius: 500px;
  padding: 10px 32px;
  color: #fff;
  background-color: #1db954;
  transition-property: background-color, border-color, color, box-shadow, filter,
    -webkit-box-shadow, -webkit-filter;
  transition-duration: 0.3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  border-color: #1aa34a;
  display: inline-block;
  margin-bottom: 0;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-style: solid;
  user-select: none;
  -webkit-appearance: button;
  overflow: visible;
  margin-top: 0px;
  margin-right: 0px;
  margin-left: 0px;
}
.a-cancel {
  margin-right: 20px;
  float: right !important;
  color: #000;
  max-width: 290px;
  font-size: 12px;
  line-height: 1;
  border-radius: 500px;
  padding: 10px 32px;
  transition-property: background-color, border-color, color, box-shadow, filter,
    -webkit-box-shadow, -webkit-filter;
  transition-duration: 0.3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  margin-bottom: 0;
  font-weight: 700;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-color: transparent;
  border-style: solid;
  user-select: none;
  text-decoration: none;
  background-color: transparent;
}
.alert {
  color: rgb(236, 58, 58);
}
.alert-success {
  border-width: 0;
  font-size: 12px;
  padding: 14px 14px 12px 14px;
  font-weight: 400;
  background-color: #1ed760;
  border-color: #1ed760;
  color: #fff;
  margin-bottom: 24px;
  border-style: solid;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-radius: 0;
}
</style>
