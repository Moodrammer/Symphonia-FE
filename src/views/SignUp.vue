<template>
  <div>
     <!-- Header of Sign Up page  -->
    <symphonia-Header></symphonia-Header>

    <v-divider></v-divider>

    <v-container>
        <v-row 
        justify="center"
        >
        <v-col cols="12" sm="6" md="5">
            <!-- Facebook sign division -->
            <v-row 
                justify="center"
                style="margin-bottom: 20px;"
                >
                <v-btn rounded color="#3B5998" class="white--text">Sign up with Facebook</v-btn>
            </v-row>    
            
            <!-- Email Sign division -->
            <!-- The form takes a fixed width and the rest of the elements take the form's width -->
            <!-- Adding a reference to the form to be able to refer to it on submission -->
            <v-form 
            ref="userDataForm"
            class="compact-form"
            style="margin-top: 20px; width: 100%; margin: auto;"
            v-model="valid"
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

                <v-text-field 
                placeholder="Email" 
                outlined
                style="width : 100%; height: 80px; margin: auto"
                type="email"
                :rules="emailRules"
                v-model="userData.email"
                maxlength="200" 
                >
                </v-text-field>
                
                <v-text-field 
                placeholder="Confirm email" 
                outlined
                style="width : 100%; height: 80px; margin: auto"
                type="email"
                :rules="emailConfirmationRules"
                v-model="userData.emailToMatch"
                maxlength="200"
                >
                </v-text-field>
                
                <v-text-field 
                placeholder="Password" 
                outlined
                style="width : 100%; height: 80px; margin: auto"
                type="password"
                :rules="passwordRules"
                required
                v-model="userData.password"
                maxlength="30"
                >
                </v-text-field>

                <v-text-field 
                placeholder="What should we call you?" 
                outlined
                style="width : 100%; height: 80px; margin: auto"
                :rules="usernameRules"
                maxlength="30"
                v-model="userData.username"
                >
                </v-text-field>
                
                <span class="text-left">Date of birth</span>

                <v-row 
                style="width: 100%; margin: auto;"
                no-gutters
                >
                   <v-col cols="3">
                        <v-text-field
                        placeholder="Day"
                        outlined
                        width="90%"
                        :rules="dayRules"
                        v-model="userData.daySelected"
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-overflow-btn
                        placeholder="month"
                        outlined
                        width="90%"
                        :items="item"
                        :rules="monthRules"
                        v-model="userData.monthSelected"
                        >
                        </v-overflow-btn>
                    </v-col>

                    <v-col cols="3">
                        <v-text-field
                        placeholder="Year"
                        outlined
                        width="90%"
                        :rules="yearRules"
                        v-model="userData.yearSelected"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row justify-left>
                <v-radio-group 
                row
                style="padding-left: 35px"
                :rules="genderRules"
                v-model="userData.gender"
                >
                    <v-radio label="Male" value="Male"></v-radio>
                    <v-radio label="Female" value="Female"></v-radio>
                </v-radio-group>
                </v-row>

                <v-row justify="center">
                    <v-col cols="8"> 
                        <v-btn 
                        color="#1DB954"
                        dark
                        rounded
                        block
                        large
                        v-on:click="submitForm"
                        >Sign up</v-btn>
                    </v-col>
                </v-row>

                <v-row justify="center">
                    <span class="text--center">Already Have an account? 
                    <router-link 
                    to="/Login" 
                    class="green--text">
                    Log in
                    </router-link>
                    </span>
                </v-row>
            </v-form>
            </v-col>
      </v-row>
      </v-container>
</div>
</template>
    
<script>
import symphoniaHeader from '@/components/SymphoniaHeader.vue';

export default {
    components:{
        symphoniaHeader
    },
    data(){
        return{
            valid: false,
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
                v => (v >= 1900) || "Please enter a valid year",
                v => (v <= 2000) || "Sorry, but you don't meet Symphonia's age requirements"
            ],
            monthRules: [
                v => !!v || "Please enter your birth month"
            ],
            usernameRules: [
                v => !!v || "What should we call you?"    
            ],
            genderRules: [
                v => !!v || "Please indicate your gender"
            ],

            //items and data
            item: ['January', 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September'
            , 'October' , 'November' , 'December'],

            //All the userData provided by the form
            userData: {
                email: '',
                emailToMatch: '',
                password: '',
                username: '',
                daySelected: '',
                monthSelected: '',
                yearSelected: '',
                gender: ''
            }
        }
    },
    //Taken from : https://stackoverflow.com/questions/47213703/vuetify-form-validation-defining-es6-rules-for-matching-inputs
   computed: {
    emailConfirmationRules() {
      return [
        v => !!v || 'Please enter your email',  
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        () => ((this.userData.email === this.userData.emailToMatch) && !this.changed) || 'E-mail must match'
        ];
    },
    
    },
    methods: {
        submitForm(){
            if(this.$refs.userDataForm.validate())
                console.log(this.userData);
            else
                console.log("emit errors first");    
        }
}

}


</script>

<style scoped> 
    .compact-form {
    transform: scale(0.8);
    transform-origin: center top;
    }

    
</style>