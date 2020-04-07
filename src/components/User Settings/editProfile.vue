<template>
  <div class="col-sm-9">
    <!-- the main contant of the page of Edit profile -->
    <div class="content">
      <div class="header-container">
        <h1>Edit Profile</h1>
      </div>
      <div class="form-container">
        <div class="alert-success" v-show="Done">Profile updated</div>
        <div class="alert-danger" v-show="error">Sorry,Profile isn't updated</div>
        <!-- here we take the changes for both users facebook & normal ones to change the profile -->
        <form @submit.prevent="submit">
          <!-- The name content -->
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="text"
              v-model="user.userEmail"
              v-show="!facebook"
            />
            <p v-show="facebook">{{ user.userEmail }}</p>
          </div>
          <!-- The password content -->
          <div class="form-group" v-show="!facebook">
            <label for="email">Current password</label>
            <input
              type="password"
              class="text"
              v-model="user.password"
              v-show="!facebook"
              :disabled="needPassword"
            />
          </div>
          <!-- The gender content -->
          <div class="form-group">
            <label for="gender">Gender</label>
            <select
              id="gender"
              required
              v-show="!facebook"
              v-model="user.userGender"
            >
              <option value="male" :selected="gender">Male</option>
              <option value="female" :selected="!gender">Female</option>
            </select>
            <p v-show="facebook">{{ user.userGender }}</p>
          </div>
          <!-- The date of birth content -->
          <div class="form-group">
            <label for="bod">Date of birth</label>
            <div class="row">
              <div class="col-4" v-show="!facebook">
                <select
                  id="month"
                  class="date"
                  v-model="selectedMonth"
                >
                  <option
                    v-for="month in months"
                    :key="month.value"
                    :selected="month.selected"
                    :value="month.value"
                    >{{ month.value }}</option
                  >
                </select>
              </div>
              <div class="col-4" v-show="!facebook">
                <select  id="day" class="date" v-model="selectedDay">
                  <option
                    v-for="day in days"
                    :key="day.value"
                    :selected="day.selected"
                    :value="day.value"
                    >{{ day.value }}</option
                  >
                </select>
              </div>
              <div class="col-4" v-show="!facebook">
                <select
                  id="year"
                  class="date"
                  v-model="selectedYear"
                >
                  <option
                    v-for="year in years"
                    :key="year.value"
                    :selected="year.selected"
                    :value="year.value"
                    >{{ year.value }}</option
                  >
                </select>
              </div>
            </div>
            <p v-show="facebook">{{ user.userDOB }}</p>
          </div>
          <!-- The country content -->
          <div class="form-group">
            <label for="country">Country</label>
            <select id="country" required>
              <option value="EG" selected>{{ user.userCountry }}</option>
            </select>
          </div>
          <!-- The mobile content -->
          <div class="form-group">
            <label for="mobile">Mobile phone number</label>
            <input type="text" class="text" v-model="user.mobile" />
          </div>
          <div class="button-col">
            <!-- get the changes or cancel it -->
            <button @click="submit">save profile</button>
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
export default {
  data() {
    return {
      user: {},
      // If the user from facebook ,user can't edit some data
      facebook: false,
      //if the gender Male is true , Female is false
      gender: true,
      //if the email is same we don't need the needPassword to access any change so it's true(disabled)
      prevEmail: "",
      //used for the display of  date options
      days: [],
      months: [],
      years: [],
      // The selected option for date
      selectedDay: "",
      selectedMonth: "",
      selectedYear: "",
      // to know the success or failure message
      Done: false,
      error: false
    };
  },
  components: {
    // The review section
    bottomContent: bottomContent
  },
  created() {
    //TODO :: check the user if from facebook or not
    this.facebook = false;
    // Get the user's data
    this.$store
      .dispatch("userData")
      .then(() => {
        // If we got it set it into the data to display the user's info
        this.user = this.$store.state.user;
        this.user.mobile = "";
        this.prevEmail = this.$store.state.user.userEmail;
        this.selectedDay = this.$store.state.user.userDOB.slice(8, 10);
        this.selectedMonth = this.$store.state.user.userDOB.slice(5, 7);
        this.selectedYear = this.$store.state.user.userDOB.slice(0,4);
        let counter = {};
        for (let i = 0; i < 31; i++) {
          counter = {
            value: i + 1,
            selected: i + 1 == this.selectedDay ? true : false
          };
          this.days.push(counter);
        }
        for (let i = 0; i < 12; i++) {
          counter = {
            value: i + 1,
            selected: i + 1 == this.selectedMonth ? true : false
          };
          this.months.push(counter);
        }
        for (let i = 1940; i <= 2020; i++) {
          counter = {
            value: i,
            selected: i == this.selectedYear ? true : false
          };
          this.years.push(counter);
        }
      })
      .catch(err => console.log(err));
  },
  computed: {
    // Use this function to aask for password if the email is chaneged
    needPassword: function() {
      if (this.user.userEmail == this.prevEmail) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    // Used to update as V-model for the user's Date of Brith
    selectedDate: function() {
      this.user.userDOB =
        this.selectedYear + "-" + this.selectedMonth + "-" + this.selectedDay;
    },
    submit: function() {
      this.selectedDate();
      this.$store.dispatch("updateProfile",{
        email: this.user.userEmail,
        gender: this.user.userGender,
        dateOfBirth: this.user.userDOB,
        phone: this.user.mobile,
        password: this.user.password
      }).then(() => {
          this.Done = true;
        })
        .catch(() => {
          this.error = true;
        });
    }
  }
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
#gender {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
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
#gender::placeholder {
  transition: color 0.15s ease-in-out;
  color: #c1c3c6;
  opacity: 1;
}
#gender:focus {
  border-color: #919496;
  outline: 0;
  box-shadow: none;
}
input[disabled] {
  color: #c1c3c6;
  pointer-events: none;
  cursor: not-allowed;
  background-color: #fafafa;
  opacity: 1;
}
.date {
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
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  background-image: url("https://img.icons8.com/ios/90/000000/expand-arrow--v2.png");
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: border-color ease-in-out 0.15s,
    box-shadow ease-in-out 0.15s;
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
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
  margin: 0;
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
.alert-danger {
  border-width: 0;
  font-size: 12px;
  padding: 14px 14px 12px 14px;
  font-weight: 400;
  background-color: #d71e1e;
  border-color: #d71e1e;
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
