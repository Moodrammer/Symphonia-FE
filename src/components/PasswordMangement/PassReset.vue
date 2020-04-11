<template>
  <div id="passwordReset" @keyup="checkEnterKey">
    <v-content style="max-width:600px; margin:auto;">
      <v-row justify="center" cols="12" class="mt-9">
        <v-col>
          <!-- Password reset title -->
          <v-row justify="center">
            <h1
              class="display-2"
              style="font-weight: bold; text-align: center;"
            >
              Password Reset
            </h1>
          </v-row>
          <!-- Simple Paragraph -->
          <v-row justify="center">
            <p style="text-align: center;" v-if="NotSubmitted">
              Enter your Symphonia <strong>email address</strong> that you used
              to register. We'll send you an email with your username and a link
              to reset your password.
            </p>
            <!-- Paragraph to show after sending the request -->
            <p id="successful-submission" style="text-align: center;" v-if="!NotSubmitted">
              A message has been sent to you by email with instructions on how
              to reset your password.
            </p>
          </v-row>
          <v-form v-if="NotSubmitted" ref="resetForm">
            <!-- text-field for the required email -->
            <v-row justify="center">
              <v-col cols="10">
                <v-text-field
                  id="reset-email"
                  name="resetemail"
                  type="email"
                  outlined
                  dense
                  v-model="resetemail"
                  style="height: 40px;"
                  maxlength="200"
                  :rules="emailRules"
                  :error-messages="serverErrorMess"
                  v-on:keydown.enter.prevent
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="mt-4" justify="center">
              <v-col cols="4">
                <!-- Send button -->
                <v-btn
                  id="send-button"
                  color="#1db954"
                  class="white--text"
                  rounded
                  large
                  block
                  @click="resetPass"
                  >SEND</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PassReset",
  data() {
    return {
      resetemail: "",
      emailRules: [
        v => !!v || "Please enter your Symphonia email address.",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      //To change the content when the form is submitted
      NotSubmitted: true,
      //The error message returned from the server
      serverErrorMess: ""
    };
  },
  methods: {
    /**
     * This method checks on any keyup event if the user has pressed the Enter key to submit the password reset form
     * @public
     */
    checkEnterKey(e) {
      if (e.keyCode == "13") this.resetPass();
    },
    /**
     * Sending a request to the backend api to ask for an email to change the user password
     * @public
     */
    resetPass() {
      //reset the server error message
      this.serverErrorMess = "";
      if (this.$refs.resetForm.validate()) {
        //send a request to the database to check if the email exists if not and an
        //error message returned and should be displayed to the textbox
        axios
          .post("/v1/users/forgotpassword", {
            email: this.resetemail
          })
          .then(res => {
            if (res.status == 200) this.NotSubmitted = false;
          })
          .catch(() => {
            this.serverErrorMess =
              "The email provided is not linked to an existing Symphonia account";
          });
      }
    }
  }
};
</script>

<style scoped></style>
