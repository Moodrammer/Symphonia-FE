<template>
    <div id="passwordChange" @keydown="checkEnterKey">
        <v-content style="max-width: 600px; margin: auto;">
            <v-row justify="center" class="mt-9" cols="12">
                <v-col>
                    <!-- Password Change title Reset Password-->
                    <v-row justify="center" class="my-8" v-if="notSubmitted">
                        <h1 
                        class="display-2" 
                        style="font-weight: bold;">
                        Reset Password
                        </h1>
                    </v-row>
                    <!-- Password Change title Password updated-->
                    <v-row justify="center" class="my-8" v-if="!notSubmitted">
                        <h1 
                        class="display-2" 
                        style="font-weight: bold;">
                        Password updated
                        </h1>
                    </v-row>

                    <!-- Change Password form -->
                    <v-form ref="passChangeForm" v-if="notSubmitted">
                        <!-- New password label -->
                        <v-row justify="center">
                            <v-col class="pa-0 pl-2" cols="10">
                                <h5>New Password</h5>
                            </v-col>
                        </v-row>
                        
                        <!-- text-field for the new password -->
                            <v-row justify="center" class="mb-4">
                                <v-col cols="10" class="pt-0">
                                    <v-text-field
                                    id="new-password"
                                    name="newpassword"
                                    type="password"
                                    outlined
                                    dense
                                    v-model="newPass"
                                    style="height: 40px;"
                                    maxlength="30"
                                    :rules="passRules"
                                    v-on:keydown.enter.prevent
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                        <!--Repeat New password label -->
                        <v-row justify="center">
                            <v-col class="pa-0 pl-2" cols="10">
                                <h5> Repeat New Password</h5>
                            </v-col>
                        </v-row>

                        <!-- text-field for confirming the new password -->
                        <v-row justify="center">
                            <v-col cols="10" class="pt-0">
                                <v-text-field
                                id="new-password-confirm"
                                name="newPassConf"
                                type="password"
                                outlined
                                dense
                                v-model="newPassConf"
                                style="height: 40px;"
                                maxlength="30"
                                :rules="newpassRules"
                                :error-messages="checkPassConf()"
                                v-on:keydown.enter.prevent
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <!-- button to submit the form -->
                        <v-row class="mt-4" justify="center">
                            <v-col cols="4">
                                <!-- Send button -->
                                <v-btn
                                id="updatepass-button"
                                color="#1db954"
                                class="white--text"
                                rounded
                                large
                                block
                                @click="updatePass"
                                >SEND</v-btn>
                            </v-col>
                            </v-row>
                    </v-form>
                    <!-- Successfully updated message -->
                    <v-row justify="center">
                        <p 
                        style="text-align: center"
                        v-if="!notSubmitted"
                        >
                            Sweet! Your new password has now been set and you are logged in.
                        </p>
                        <router-link to="/account" v-if="!notSubmitted">Go to account</router-link>
                    </v-row>
                </v-col>
            </v-row>
        </v-content>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                //check if the user has submitted the form or not
                notSubmitted: true,
                //formData
                newPass: "",
                newPassConf: "",
                //The resettoken is provided by the back server for user authentication
                //It is aquired from the Path parameters of the url sent to the user by email
                resettoken: "",
                //rules for validation of password
                passRules: [
                    v => !!v || "Please enter a new password.",
                    v => (v && v.length >= 8) || "your new password is too short"
                ],
                newpassRules: [
                    v => !!v || "Please verify your password.",
                ]
            }
        },
        created() {
            //take the reset token from the route parameters and add it to the local state of the component
            this.resettoken = this.$route.params.resettoken
        },
        methods: {
            /**
             * This function continuously checks that the password matches the confirmation password
             * for validation
             * @public
             */
            checkPassConf() {
                if (this.newPassConf != "") {
                    if(this.newPass == this.newPassConf)
                        return ""
                    else
                        return "Please verify your new password"    
                }
            },
            /**
             * Checks for validation errors and submits the form if there are no errors 
             * to update the user's password
             * @public
             */
            updatePass() {
                if(this.$refs.passChangeForm.validate() && (this.newPass == this.newPassConf)) {
                    //sending a Patch request to the server to update the password with the new password
                    axios
                        .patch(`/v1/users/resetpassword/${this.resettoken}`, {
                            password: this.newPass,
                            passwordConfirm: this.newPassConf
                        })
                        .then((response) => {
                            //store the userToken & the frequently user data returned in the localStorage
                            localStorage.setItem("userToken" , response.data.token)
                            //store the frequently used user data 
                            localStorage.setItem("username", response.data.user.name);
                            localStorage.setItem("email" , response.data.user.email);
                            localStorage.setItem("userID" , response.data.user._id);
                            localStorage.setItem("type" , response.data.user.type);
                            //change the page state to be submitted
                            this.notSubmitted = false;
                        })
                        .catch((err) => {
                            //logging the error is just for debugging
                            console.log(err)
                        })
                }
            },
            /**
            * This method checks on any keyup event if the user has pressed the Enter key to submit the password change form
            * @public
            */
            checkEnterKey(e) {
            if(e.keyCode == '13')
                this.updatePass()
            },
        }
    }
    
</script>

<style scoped>
    .v-application a{
        text-decoration: none !important;
        color: green !important;
     }
</style>