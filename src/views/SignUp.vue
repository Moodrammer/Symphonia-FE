<template>
  <div>
     <!-- Header of Sign Up page  -->
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="6">
            <v-row justify="center">
            <router-link to = '/'>
                <h1 
                display-4 
                class="black--text"
                >
                Symphonia
                </h1>
            </router-link>
            </v-row>
            </v-col>
        </v-row>
    </v-container>      
    
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
            <v-form 
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
                v-model="email"
                >
                </v-text-field>
                
                <v-text-field 
                placeholder="Confirm email" 
                outlined
                style="width : 100%; height: 80px; margin: auto"
                type="email"
                :rules="emailConfirmationRules"
                v-model="emailToMatch"
                >
                </v-text-field>
                
                <v-text-field 
                placeholder="Password" 
                outlined
                style="width : 100%; height: 80px; margin: auto"
                type="password"
                :rules="passwordRules"
                required
                v-model="password"
                >
                </v-text-field>

                <v-text-field 
                placeholder="What should we call you?" 
                outlined
                style="width : 100%; height: 80px; margin: auto"
                :rules="usernameRules"
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
                        v-model="daySelected"
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-select
                        placeholder="month"
                        outlined
                        width="90%"
                        :items="item"
                        v-model="monthSelected"
                        >
                        </v-select>
                    </v-col>

                    <v-col cols="3">
                        <v-text-field
                        placeholder="Year"
                        outlined
                        width="90%"
                        :rules="monthRules"
                        v-model="yearSelected"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row justify-left>
                <v-radio-group 
                row
                style="padding-left: 35px"
                >
                    <v-radio label="Male"></v-radio>
                    <v-radio label="Female"></v-radio>
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
                        >Sign up</v-btn>
                    </v-col>
                </v-row>

                <v-row justify="center">
                    <span class="text--center">Already Have an account? 
                    <router-link to="/" class="green--text">Log in</router-link>
                    </span>
                </v-row>
            </v-form>
            </v-col>
      </v-row>
  </v-container>
</div>
</template>
    
<script>
export default {
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
                v => (v >= 1 && v <= 31) || "Enter a valid day of the month"
            ],
            monthRules: [
                v => (v >= 1900) || "Enter a valid year",
                v => (v <= 2000) || "Sorry, but you don't meet Symphonia's age requirements"
            ],
            usernameRules: [
                v => !!v || "What should we call you?"    
            ],

            //items and data
            item: ['January', 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September'
            , 'October' , 'November' , 'December'],

            email: '',
            emailToMatch: '',
            monthSelected: '',
            daySelected: '',
            yearSelected: '',
            password: ''
        }
    },
    //Taken from : https://stackoverflow.com/questions/47213703/vuetify-form-validation-defining-es6-rules-for-matching-inputs
   computed: {
    emailConfirmationRules() {
      return [
        v => !!v || 'Please enter your email',  
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        () => ((this.email === this.emailToMatch) && !this.changed) || 'E-mail must match'
        ];
    },
}

}


</script>

<style scoped> 
    .compact-form {
    transform: scale(0.8);
    transform-origin: center top;
    }

    a{
    text-decoration: none;
    }
</style>