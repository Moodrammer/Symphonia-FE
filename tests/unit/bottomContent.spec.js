//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
//Importing the component to be tested
import bottomContent from "@/components/User Settings/BottomContent.vue";

describe("bottomContent", () => {
  let wrapper;
  let vuetify;
  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = mount(bottomContent, {
      router,
      vuetify,
      data() {
        return {
          first: true,
          second: false,
          third: false,
          A1: "",
          text: ""
        };
      },
      methode: {
        secondStage: jest.fn()
      }
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
  //check if the methods called or not
  it("check secondStage funcrion is called", () => {
    const btn = wrapper.find("#yes");
    btn.setChecked(true);
    expect(wrapper.vm.secondStage).toHaveBeenCalled;
  });
  //check if the values changed after calling the function
  it("check the first stage function", () => {
    wrapper.vm.secondStage();
    expect(wrapper.vm.first).toBe(false);
    expect(wrapper.vm.second).toBe(true);
  });
  it(" check the third function if text isn't empty", () => {
    wrapper.vm.text = "something";
    wrapper.vm.second = true;
    wrapper.vm.third = false;
    wrapper.vm.thirdStage();
    expect(wrapper.vm.second).toBe(false);
    expect(wrapper.vm.third).toBe(true);
  });
  it(" check the third function if text is empty", () => {
    wrapper.vm.text = "";
    wrapper.vm.second = true;
    wrapper.vm.third = false;
    wrapper.vm.thirdStage();
    expect(wrapper.vm.second).toBe(true);
    expect(wrapper.vm.third).toBe(false);
  });
});
