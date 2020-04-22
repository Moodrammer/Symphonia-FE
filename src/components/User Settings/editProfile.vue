<template>
  <div class="col-sm-9">
    <!-- the main contant of the page of Edit profile -->
    <div class="content">
      <div class="header-container">
        <h1>Edit Profile</h1>
      </div>
      <div class="form-container">
        <div class="alert-success" v-show="Done">Profile updated</div>
        <div class="alert-danger" v-show="error">
          Sorry,Profile isn't updated
        </div>
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
                <select id="month" class="date" v-model="selectedMonth">
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
                <select id="day" class="date" v-model="selectedDay">
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
                <select id="year" class="date" v-model="selectedYear">
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
        this.selectedDay = parseInt(
          this.$store.state.user.userDOB.slice(8, 10),
          10
        );
        this.selectedMonth = parseInt(
          this.$store.state.user.userDOB.slice(5, 7),
          10
        );
        this.selectedYear = this.$store.state.user.userDOB.slice(0, 4);
        let counter = {};
        for (let i = 1; i < 32; i++) {
          counter = {
            value: i,
            selected: i == this.selectedDay ? true : false
          };
          this.days.push(counter);
        }
        for (let i = 1; i < 13; i++) {
          counter = {
            value: i,
            selected: i == this.selectedMonth ? true : false
          };
          this.months.push(counter);
        }
        for (let i = 1940; i <= 2020; i++) {
          counter = {
            value: i,
            selected: i == parseInt(this.selectedYear) ? true : false
          };
          this.years.push(counter);
        }
      })
      .catch(() => (this.error = true));
  },
  computed: {
    // Use this function to aask for password if the email is chaneged
    needPassword: function() {
      if (this.user.userEmail == this.prevEmail) {
        return true;
      } else {
        return false;
      }
    },
    email: function() {
      return this.user.userEmail;
    }
  },
  methods: {
    // Used to update as V-model for the user's Date of Brith
    selectedDate: function() {
      let d =
        this.selectedDay.toString().length == 1
          ? "0" + this.selectedDay.toString()
          : this.selectedDay.toString();
      let m =
        this.selectedMonth.toString().length == 1
          ? "0" + this.selectedMonth.toString()
          : this.selectedMonth.toString();
      this.user.userDOB = this.selectedYear + "-" + m + "-" + d;
    },
    submit: function() {
      this.selectedDate();
      this.$store
        .dispatch("updateProfile", {
          email: this.user.userEmail,
          gender: this.user.userGender,
          dateOfBirth: this.user.userDOB,
          phone: this.user.mobile,
          password: this.user.password
        })
        .then(() => {
          this.Done = true;
        })
        .catch(() => {
          this.error = true;
        });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./style/editProfile.sass"
</style>
