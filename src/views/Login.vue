<template>
    <div>
        <symphonia-header></symphonia-header>
        <v-divider></v-divider>
        <!-- container for login section -->
        <v-container fluid id="loginSection">
            <v-content style="margin: auto; max-width: 450px;">
                <v-row>
                    <v-col 
                    cols=12  
                    class="pb-1">
                        <v-row 
                        justify="center"
                        >
                        <h4>To continue, log in to Symphonia.</h4>
                        </v-row>
                    </v-col>
                </v-row>
                <!-- Facebook button  -->
                <v-row>
                    <v-col cols="12">
                        <v-btn 
                        block
                        large 
                        rounded
                        color="#3B5998"
                        class="white--text"
                        >
                            CONTINUE WITH FACEBOOK
                        </v-btn>
                    </v-col>
                </v-row>
                <!-- Divider row -->
                <v-row justify="center">
                    <v-col cols="12">
                        <v-row>
                        <v-col 
                        cols="5"
                        class="pa-0">
                            <v-divider></v-divider>
                        </v-col>
                        <v-col 
                        cols="2"
                        class="pa-0">
                            <v-row justify="center">
                            <div style="font-size: 12px;">
                            <strong>OR</strong>
                            </div>
                            </v-row>
                        </v-col>
                        <v-col 
                        cols="5"
                        class="pa-0">
                            <v-divider></v-divider>
                        </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <!-- Login form -->
                <v-form>
                    <v-row>
                        <v-col cols="12"> 
                            <v-text-field
                            id="login-username"
                            name="username"
                            type="text"
                            placeholder="Email adderss or username"
                            outlined
                            dense
                            style="height: 40px;"
                            v-model="formData.username"
                            :rules="usernameRules"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            outlined
                            dense
                            style="height: 40px;"
                            v-model="formData.password"
                            :rules="passwordRules"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" align="space-between">
                            <v-row justify="center">
                                <v-btn 
                                id="login-button"
                                color="#1db954"
                                class="white--text"
                                rounded
                                >LOG IN
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
                <!-- Forgot your password ? -->
                <v-row>
                    <v-col cols="12">
                        <v-row justify="center"> 
                        <router-link 
                        to="/">
                            Forgot your password?
                        </router-link>
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
                            <h3> Don't have an account?</h3>
                        </v-row>
                        <v-btn
                        id="signup-button"
                        color="white"
                        class="grey--text"
                        block
                        rounded
                        large
                        style="border: solid 3px grey !important"
                        to="/SignUp"
                        >SIGN UP FOR SYMPHONIA
                        </v-btn>
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
                            style="font-size: 10px;"
                            class="grey--text"
                            >
                            If you click "Log in with Facebook" and are not a Symphonia user, you will be registered
                            </div>
                        </v-row>
                    </v-col>

                </v-row>

            </v-content>
        </v-container>
            
        
    </div>
</template>

<script>
import symphoniaHeader from '@/components/SymphoniaHeader.vue';

export default {
    components: {
        symphoniaHeader
    },
    data(){
        return{
            formData: {
                username: '',
                password: ''
            },
            usernameRules: [
                v => !!v || "Please enter your Symphonia username or email address."
            ],
            passwordRules: [
                v => !!v || "Please enter your password."
            ]
        }
    }
}
</script>

<style scoped>
    a{
        text-decoration: none;
        color: green;
    }
</style>