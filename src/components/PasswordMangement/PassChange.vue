<template>
    <div id="passwordChange">
        <v-content style="max-width: 600px; margin: auto;">
            <v-row justify="center" class="mt-9" cols="12">
                <v-col>
                    <!-- Password Change title -->
                    <v-row justify="center" class="my-8">
                        <h1 
                        class="display-2" 
                        style="font-weight: bold;">
                        Reset Password
                        </h1>
                    </v-row>
                    <!-- Change Password form -->
                    <v-form ref="passChangeForm">
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
                    
                </v-col>
            </v-row>
        </v-content>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newPass: "",
                newPassConf: "",
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
            console.log(this.$route.params)
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
                if(this.$refs.passChangeForm.validate())
                    console.log("I am valid")
            }
        }
    }
    
</script>

<style scoped>

</style>