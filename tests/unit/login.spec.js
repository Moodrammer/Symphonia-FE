import login from "@/views/Login.vue";
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

//const localVue = createLocalVue();

describe("Login.vue", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(VueRouter);

    wrapper = shallowMount(login, { router, vuetify });
    //console.log(wrapper)
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  //check if it is a vue instance
  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  //check if it contains a text field
  it("Contains text feild", () => {
    expect(wrapper.html()).toContain("<v-text-field");
  });
});
