<template>
  <div>
    <!-- this view is for getting the reviews or reports about the service -->
    <div class="bottom-card">
      <form action="#" class="">
        <!-- we first see if we help the user -->
        <section v-if="first">
          <h3>Help us improve your account experience</h3>
          <p>Did you find what you were looking for?</p>
          <div class="radio-button">
            <label for="Q1">
              <input
                type="radio"
                value="yes"
                class="radio"
                @click="secondStage()"
                v-model="A1"
                id="yes"
              />
              Yes
            </label>
          </div>
          <div class="radio-button">
            <label for="Q1">
              <input
                type="radio"
                value="no"
                class="radio"
                v-on:click="secondStage()"
                v-model="A1"
              />
              No
            </label>
          </div>
        </section>
        <!-- then we take his comment about the service -->
        <section v-if="second">
          <h3>Thanks! Let us know more.</h3>
          <p>What were you trying to do in your account?</p>
          <textarea required v-model="text" id="text"></textarea>
          <p class="note">
            We continuously use this feedback to improve your experience, but
            are unable to respond individually.
          </p>
          <button class="btn" @click="thirdStage" id="submit">Submit</button>
        </section>
        <!-- here we send that to the service team to check the message -->
        <section v-show="third" class="third-stage">
          <h3>Thanks for your feedback!</h3>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * This page is used to take the user's review
   * @displayName User Review
   * @example [none]
   */
  data() {
    return {
      first: true,
      second: false,
      third: false,
      A1: "",
      text: ""
    };
  },
  methods: {
    /**
     * Check if the user ended the first stage and pass him/her to next stage
     * @public This is a public method
     * @param {None}
     */
    secondStage: function() {
      this.first = !this.first;
      this.second = !this.second;
    },
    /**
     * Check if the user ended the second stage and pass him/her to next stage
     * @public This is a public method
     * @param {None}
     */
    thirdStage: function() {
      if (this.text) {
        this.second = !this.second;
        this.third = !this.third;
      }
    }
  },
  created() {
    this.first = true;
    this.second = false;
    this.third = false;
  }
};
</script>

<style lang="sass" scoped>
@import "./style/bottomContent.sass"
</style>
