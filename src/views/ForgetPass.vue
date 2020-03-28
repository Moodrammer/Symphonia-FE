<template>
    <div>
        <v-container fluid>
            <v-app-bar app absolute color="black" flat></v-app-bar>
            <v-content style="max-width:600px; margin:auto;">
                <v-row justify="center" cols="12" class="mt-9" >
                    <v-col>
                        <!-- Password reset title -->
                        <v-row justify="center">
                            <h1 class="display-2" style="font-weight: bold">Password Reset</h1>
                        </v-row>
                        <!-- Simple Paragraph -->
                        <v-row justify="center">
                            <p style="text-align: center;"  v-if="NotSubmitted">
                                Enter your Symphonia <strong>email address</strong> that you used to register. We'll send you an email with your username and a link to reset your password.
                            </p>
                        <!-- Paragraph to show after sending the request -->
                            <p style="text-align: center;"  v-if="!NotSubmitted">
                                A message has been sent to you by email with instructions on how to reset your password.
                            </p>
                        </v-row>
                        <v-form  v-if="NotSubmitted" ref="resetForm">
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
                                    >SEND</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-content>
        </v-container>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "../components/Homepage/TheHomepageFooter";

    export default {
        data() {
            return {
                resetemail: '',
                emailRules: [
                    v => !!v || "Please enter your Symphonia username or email address.",
                    v => /.+@.+\..+/.test(v) || "E-mail must be valid"
                ],
                //To change the content when the form is submitted
                NotSubmitted: true
            }
        },
        components: {
            Footer,
            
        },
        methods: {
            resetPass() {
                if(this.$refs.resetForm.validate())
                    this.NotSubmitted = false;
            }
        }
    }
</script>

<style scoped>

</style>