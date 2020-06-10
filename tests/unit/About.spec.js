//Importing plugins and helpers
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
//Importing the component to be tested
import About from "@/views/About.vue";

describe("About", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    wrapper = shallowMount(About, {
      vuetify
    });
  });
  //rendering tests
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
  //check if it is a vue instance
  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
