<template>
  <div>
    <div class="bottom-card">
      <form action="#" class="">
        <section v-show="first">
          <h3>Help us improve your account experience</h3>
          <p>Did you find what you were looking for?</p>
          <div class="radio-button">
            <label for="Q1">
              <input
                type="radio"
                value="yes"
                class="radio"
                v-on:click="secondStage"
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
                v-on:click="secondStage"
                v-model="A1"
              />
              No
            </label>
          </div>
        </section>
        <section v-show="second">
          <h1>{{ A1 }}</h1>
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
      A1: ""
    };
  },
  computed: {
    secondStage: () => {
      this.first = false;
      this.second = true;
    }
  }
};
</script>

<style scoped>
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
</style>
