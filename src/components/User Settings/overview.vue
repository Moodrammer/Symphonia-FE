<template>
  <div class="col-sm-9">
    <div class="content">
      <!-- account overview view content -->
      <h1>Account overview</h1>
      <article class="section">
        <h3>Profile</h3>
        <section class="child">
          <table class="info-table">
            <colgroup>
              <col class="info-col" />
              <col class="info-col" />
            </colgroup>
            <tbody>
              <!-- The Username section -->
              <tr class="info-row">
                <td class="info-cell">
                  <label for="username"
                    ><span class="info-content">Username</span></label
                  >
                </td>
                <td class="info-cell">
                  <p class="info-value" id="username">{{ user.username }}</p>
                </td>
              </tr>
              <!-- The Email sction -->
              <tr class="info-row">
                <td class="info-cell">
                  <label for="email"
                    ><span class="info-content">Email</span></label
                  >
                </td>
                <td class="info-cell">
                  <p class="info-value">{{ user.userEmail }}</p>
                </td>
              </tr>
              <!-- The Gender sction -->
              <tr class="info-row">
                <td class="info-cell">
                  <label for="gender"
                    ><span class="info-content">Gender</span></label
                  >
                </td>
                <td class="info-cell">
                  <p class="info-value">{{ user.userGender }}</p>
                </td>
              </tr>
              <!-- The Date of birth scetion -->
              <tr class="info-row">
                <td class="info-cell">
                  <label for="date"
                    ><span class="info-content">Date of birth</span></label
                  >
                </td>
                <td class="info-cell">
                  <p class="info-value">{{ user.userDOB }}</p>
                </td>
              </tr>
              <!-- The User's country section -->
              <tr class="info-row">
                <td class="info-cell">
                  <label for="country"
                    ><span class="info-content">Country</span></label
                  >
                </td>
                <td class="info-cell">
                  <p class="info-value">{{ user.userCountry }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <!-- Button to change the user's data -->
        <a class="btn-class" href="/account/edit">Edit profile</a>
      </article>
      <article class="section">
        <h3>Your plan</h3>
        <section class="child">
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <!-- //Todo:: change the plan with the dynamic user's data -->
                <!-- The user's plan -->
                <span class="card-span-title">Symphonia Free</span>
              </div>
            </div>
            <div class="card-body">
              <div>
                <div class="card-body-plan">
                  <div class="card-body-plan-inside">
                    <p class="card-body-plan-content">
                      Play music in shuffle mode only, with ads.
                    </p>
                  </div>
                </div>
                <div>
                  <!-- The user's plan -->
                  <h3>Free</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- If the user is free -->
        <a class="btn-class" href="/premium/?checkout=false">Join Premium</a>
      </article>
      <article class="section">
        <h3>Sign out everywhere</h3>
        <p class="card-body-plant-content">
          Sign out wherever you have Symphonia open, including the web, mobile,
          desktop or any other devices.
        </p>
        <div class="note">
          <div class="note-content">
            <span class="card-body-plant-content"
              >Note: This doesn’t include partner devices, such as Sonos and
              PlayStation. For more information about logging out (or unlinking)
              Symphonia from a partner device, check the device’s manufacturer
              guide.</span
            >
          </div>
        </div>
        <a class="btn-class" href="#">Sign out everywhere</a>
      </article>
      <bottomContent />
    </div>
  </div>
</template>

<script>
import bottomContent from "./bottomContent.vue";

export default {
  data() {
    return {
      // The current user's data got from the created request
      user: {}
    };
  },
  components: {
    // The review section
    bottomContent: bottomContent
  },
  //---------------------------------------------------------------------------------------------
  //todo: 4/3/2020
  // - add the username above email in the overview vue(Done)
  // - Remove the request from computed as there is no need to return the data here without using it (Done)
  // - Put it in created or mounted only to set the user object in local state without returning (Done)
  //---------------------------------------------------------------------------------------------
  created() {
    // Request to get the current user's data
    this.$store
      .dispatch("userData")
      .then(() => {
        // If we got it set it into the data to display the user's info
        this.user = this.$store.state.user;
        this.user.userDOB = this.user.userDOB.slice(0, 10);
      })
      .catch();
  }
};
</script>

<style lang="sass" scoped>
@import "./style/overview.sass"
</style>
