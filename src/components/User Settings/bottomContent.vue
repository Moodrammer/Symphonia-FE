<template>
  <div>
    <div class="bottom-card">
      <form action="#" class="">
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
        <section v-if="second">
          <h3>Thanks! Let us know more.</h3>
          <p>What were you trying to do in your account?</p>
          <textarea required v-model="text"></textarea>
          <p class="note">
            We continuously use this feedback to improve your experience, but
            are unable to respond individually.
          </p>
          <button class="btn" @click="thirdStage">Submit</button>
        </section>
        <section v-show="third" class="third-stage">
          <h3>Thanks for your feedback!</h3>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
export default {
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
    secondStage: function() {
      this.first = !this.first;
      this.second = !this.second;
    },
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
}
.bottom-card {
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #d9dadc;
  margin-bottom: 10px;
}
.bottom-card::before {
  content: " ";
  display: table;
}
h3 {
  margin-bottom: 16px;
  color: #181818;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.25px;
  line-height: 32px;
  margin-top: 0;
}
p {
  color: #181818;
  color: var(--gray-10);
  font-family: Circular;
  font-family: var(--body-1-font);
  font-size: 16px;
  font-size: var(--body-1-font-size);
  font-weight: 400;
  font-weight: var(--body-1-font-weight);
  line-height: 24px;
  line-height: var(--body-1-line-height);
  letter-spacing: 0;
  letter-spacing: var(--body-1-letter-spacing);
}
.radio-button {
  padding-left: 24px;
  position: relative;
  margin-bottom: 20px;
}
label {
  display: block;
  font-size: 14px;
  font-weight: normal;
  line-height: 24px;
}
.radio {
  background-color: #fff;
  border: 1px solid #c1c3c6;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 1.25em;
  height: 1.25em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 50%;
  margin-left: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin-top: 3px;
  margin-right: 3px;
}
textarea {
  padding: 14px;
  height: 148px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #bdbdbd;
  box-shadow: none;
  display: block;
  font-size: 14px;
  margin-bottom: 16px;
  width: 100%;
  font-family: inherit;
  line-height: inherit;
}
.note {
  color: #181818;
  font-family: Circular;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  font-style: normal;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #d9dadc;
  display: flex;
}
.note::before {
  content: "";
  display: block;
  background: url(https://img.icons8.com/ios/100/000000/info.png) no-repeat 50% /
    contain;
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.btn {
  letter-spacing: 1.5px;
  font-size: 14px;
  width: auto;
  display: inline-block;
  background-color: #1db954;
  color: #fff;
  border-radius: 100px;
  min-height: 48px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 20px;
  padding: 1em 3em;
  border: none;
  transition-duration: 33ms;
  transition-property: background-color, border-color, color, box-shadow, filter,
    transform, -webkit-box-shadow, -webkit-filter, -webkit-transform;
  user-select: none;
  text-decoration: none;
  cursor: pointer;
  max-width: none;
  margin: 0 auto;
}
.third-stage {
  padding: 24px 0px 10px;
  text-align: center;
}
</style>
