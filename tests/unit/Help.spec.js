//Importing plugins and helpers
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
//Importing the component to be tested
import Help from "@/views/Help.vue";

describe("About", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    wrapper = shallowMount(Help, {
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
  it("check mehtods in tabs", () => {
    wrapper.vm.tabOne();
    expect(wrapper.vm.tab1).toBe(true);
    expect(wrapper.vm.tab2).toBe(false);
    expect(wrapper.vm.tab3).toBe(false);
    expect(wrapper.vm.tab4).toBe(false);
    wrapper.vm.tabTwo();
    expect(wrapper.vm.tab1).toBe(false);
    expect(wrapper.vm.tab2).toBe(true);
    expect(wrapper.vm.tab3).toBe(false);
    expect(wrapper.vm.tab4).toBe(false);
    wrapper.vm.tabThree();
    expect(wrapper.vm.tab1).toBe(false);
    expect(wrapper.vm.tab2).toBe(false);
    expect(wrapper.vm.tab3).toBe(true);
    expect(wrapper.vm.tab4).toBe(false);
    wrapper.vm.tabFour();
    expect(wrapper.vm.tab1).toBe(false);
    expect(wrapper.vm.tab2).toBe(false);
    expect(wrapper.vm.tab3).toBe(false);
    expect(wrapper.vm.tab4).toBe(true);
  });
});
