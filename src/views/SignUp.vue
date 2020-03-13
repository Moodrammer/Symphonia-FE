<template>
  <div>
     <!-- Header of Sign Up page  -->
    <v-container>
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
    </v-container>      
    
    <v-divider></v-divider>

    <v-container class="main">
        <v-row justify="center">
        <v-col cols="12" sm="5">
            <!-- Facebook sign division -->
            <div id="fbSign" style="margin-bottom: 20px;">  
                <v-row justify="center">
                <v-btn rounded color="#3B5998" class="white--text">Sign up with Facebook</v-btn>
                </v-row>
            </div>

            <!-- Divider between both ways to sign up -->
            <v-row>
            <v-divider></v-divider>
            <span style="font-size:14px;">or</span>
            <v-divider></v-divider>
            </v-row>
            
            <!-- Email Sign division -->
            <div id="emailSign">
            <v-form 
            class="compact-form"
            style="margin-top: 20px;"
            >
                <div 
                class="text-center mb-3"
                style="font: 18px arial,sans serif; font-weight: bold;"
                >
                Sign up with your email address
                </div>

                <v-text-field 
                placeholder="Email" 
                outlined
                pb-0
                style="width : 427px; height: 70px; margin: auto"
                >
                </v-text-field>
                
                <v-text-field 
                placeholder="Confirm email" 
                outlined
                style="width : 427px; height: 70px; margin: auto"
                >
                </v-text-field>
                
                <v-text-field 
                placeholder="Password" 
                outlined
                style="width : 427px; height: 70px; margin: auto"
                >
                </v-text-field>

                <v-text-field 
                placeholder="What should we call you?" 
                outlined
                style="width : 427px; height: 70px; margin: auto"
                >
                </v-text-field>
                
                <span class="text-left"
                style="padding-left : 23px;">Date of birth</span> 
                <v-row 
                style="width: 427px; margin: auto;"
                justify-center
                d-flex
                dense
                >
                   <v-col cols="3">
                        <v-text-field
                        placeholder="Day"
                        outlined
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-select
                        placeholder="month"
                        outlined
                        >
                        </v-select>
                    </v-col>

                    <v-col cols="3">
                        <v-text-field
                        placeholder="Year"
                        outlined
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
            <!-- div end of emailSign -->
            </div>
            </v-col>
      </v-row>
  </v-container>
</div>
</template>
    
<script>
export default {

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