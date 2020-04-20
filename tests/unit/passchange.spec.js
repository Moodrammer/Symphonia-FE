//mocking axios calls
jest.mock("axios", () => ({
  patch: jest.fn(() => {
    return Promise.resolve({
      data: {
        token: "1",
        user: {
          name: "user",
          email: "a@a.com",
          _Id: "1",
          type: "user",
          imageUrl: "1"
        }
      }
    });
  })
}));
//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import axios from "axios";
//Importing the component to be tested
import PassChange from "@/components/PasswordMangement/PassChange.vue";

describe("PassChange", () => {
  let wrapper;
  let vuetify;
  let router;

  beforeEach(() => {
    //tell the vue constructor to use vuetify
    Vue.use(Vuetify);
    vuetify = new Vuetify();
    Vue.use(VueRouter);
    router = new VueRouter();
    //mount the component to be tested
    wrapper = mount(PassChange, {
      vuetify,
      router
    });
  });
  //rendering tests
  it("renders successfully", () => {
    expect(wrapper.exists()).toBe(true);
  });

  //----------------------------------------------------------------------
  it("causes a validation when the password doesn't match the confirm password", () => {
    wrapper.vm.newPass = "12345678";
    wrapper.vm.newPassConf = "12345";
    //call the function the checks for the error
    let err = wrapper.vm.checkPassConf();

    expect(err).toBe("Please verify your new password");
  });

  it("doesn't cause a validation when the password matches the confirm password", () => {
    wrapper.vm.newPass = "12345678";
    wrapper.vm.newPassConf = "12345678";
    //call the function the checks for the error
    let err = wrapper.vm.checkPassConf();

    expect(err).toBe("");
  });

  it("makes an api call on submitting the form successfully and changes the state of not submitted to true", async () => {
    //get the input elements
    const newPassWrp = wrapper.find("#new-password");
    const newPassConfWrp = wrapper.find("#new-password-confirm");
    const updtPassBtn = wrapper.find("#updatepass-button");
    wrapper.vm.resettoken = "1";
    //simulate user input
    newPassWrp.element.value = "12345678";
    newPassWrp.trigger("input");
    newPassConfWrp.element.value = "12345678";
    newPassConfWrp.trigger("input");
    updtPassBtn.trigger("click");
    //expect the api call is made
    await wrapper.vm.$nextTick();
    //expect(wrapper.vm.notSubmitted).toBe(false)
    //expect the successful submission paragraph to appear
    expect(wrapper.find("#successful-submission").exists()).toBe(true);
  });

  it("doesn't make an api call when the data is invalid and the form is not submitted", () => {
    //get the input elements
    const newPassWrp = wrapper.find("#new-password");
    const newPassConfWrp = wrapper.find("#new-password-confirm");
    const updtPassBtn = wrapper.find("#updatepass-button");
    wrapper.vm.resettoken = "1";
    //simulate user input
    newPassWrp.element.value = "123456789";
    newPassWrp.trigger("input");
    newPassConfWrp.element.value = "12345678";
    newPassConfWrp.trigger("input");
    updtPassBtn.trigger("click");
    //expect(wrapper.vm.notSubmitted).toBe(true)
    //expect the successful submission paragraph not to appear
    expect(wrapper.find("#successful-submission").exists()).toBe(false);
  });

  it("submits the form on pressing the enterkey", async () => {
    //get the input elements
    const newPassWrp = wrapper.find("#new-password");
    const newPassConfWrp = wrapper.find("#new-password-confirm");
    wrapper.vm.resettoken = "1";
    //simulate user input
    newPassWrp.element.value = "12345678";
    newPassWrp.trigger("input");
    newPassConfWrp.element.value = "12345678";
    newPassConfWrp.trigger("input");
    //simulate pressing the enter key
    wrapper.trigger("keydown.enter");
    //expect the api call is made
    await wrapper.vm.$nextTick();
    //expect(wrapper.vm.notSubmitted).toBe(false)
    //expect the successful submission paragraph to appear
    expect(wrapper.find("#successful-submission").exists()).toBe(true);
  });

  it("doesn't submit the form on pressing any other key than the enter key such as the space key", async () => {
    //get the input elements
    const newPassWrp = wrapper.find("#new-password");
    const newPassConfWrp = wrapper.find("#new-password-confirm");
    wrapper.vm.resettoken = "1";
    //simulate user input
    newPassWrp.element.value = "12345678";
    newPassWrp.trigger("input");
    newPassConfWrp.element.value = "12345678";
    newPassConfWrp.trigger("input");
    //simulate pressing the enter key
    wrapper.trigger("keydown.space");
    //expect the api call is made
    await wrapper.vm.$nextTick();
    //expect(wrapper.vm.notSubmitted).toBe(true)
    //expect the successful submission paragraph not to appear
    expect(wrapper.find("#successful-submission").exists()).toBe(false);
  });
});
