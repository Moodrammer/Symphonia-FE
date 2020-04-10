import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import NavBar from "@/components/WebplayerLayout/WebNavBar.vue";

//const localVue = createLocalVue();

describe("Nav Bar", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    wrapper = mount(NavBar, {
      router,
      vuetify
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Contains backward icon", () => {
    const icon = wrapper.find("#backward");
    expect(icon.exists()).toBe(true);
  });

  it("Contains forward icon", () => {
    const icon = wrapper.find("#forward");
    expect(icon.exists()).toBe(true);
  });

  it("Contains Sign up button", () => {
    const signupBtn = wrapper.find("#signUp");
    expect(signupBtn.text() == "SIGN UP").toBe(true);
  });

  it("contains Log in button", () => {
    const loginBtn=wrapper.find("#logIn");
    expect(loginBtn.text()=="LOG IN").toBe(true);
  })
});
