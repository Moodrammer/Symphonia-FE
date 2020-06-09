//mocking axios calls
jest.mock("axios", () => ({
  post: jest.fn(() => {
    if (mockState == "success") return Promise.resolve({ status: 200 });
    else return Promise.reject();
  })
}));

//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
//Importing the component to be tested
import PassReset from "@/components/PasswordMangement/PassReset.vue";

let mockState = "";

describe("PassReset", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    //tell the vue constructor to use vuetify
    Vue.use(Vuetify);
    vuetify = new Vuetify();
    //mount the component to be tested
    wrapper = mount(PassReset, {
      vuetify
    });
  });

  //Rendering tests
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  //makes an api call when the data is valid
  it("shows a successful submission paragraph when the input data is valid on pressing the send button", async () => {
    //simulate a server successful response
    mockState = "success";
    //get the required elements
    const resetEmailWrp = wrapper.find("#reset-email");
    const sendbtnWrp = wrapper.find("#send-button");
    //simulate the user input
    resetEmailWrp.element.value = "Bob@gmail.com";
    resetEmailWrp.trigger("input");
    sendbtnWrp.trigger("click");

    //wait for the nextTick for vue to apply the changes
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.NotSubmitted).toBe(false);
    //The successful submission paragraph should appear
    expect(wrapper.find("#successful-submission").exists()).toBe(true);
  });

  it("shows a successful submission paragraph when the input data is valid on pressing the enter key", async () => {
    //simulate a server successful response
    mockState = "success";
    //get the required elements
    const resetEmailWrp = wrapper.find("#reset-email");
    //simulate the user input
    resetEmailWrp.element.value = "Bob@gmail.com";
    resetEmailWrp.trigger("input");
    //simulate pressing the enter key
    wrapper.trigger("keyup.enter");
    //wait for the nextTick for vue to apply the changes
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.NotSubmitted).toBe(false);
    //The successful submission paragraph should appear
    expect(wrapper.find("#successful-submission").exists()).toBe(true);
  });

  it("shows a server side error if the provided email is not linked to any account", async () => {
    //simulate a failing server side response
    mockState = "fail";
    //get the required elements
    const resetEmailWrp = wrapper.find("#reset-email");
    const sendbtnWrp = wrapper.find("#send-button");
    //simulate the user input
    resetEmailWrp.element.value = "Bob@gmail.com";
    resetEmailWrp.trigger("input");
    sendbtnWrp.trigger("click");

    //wait for the nextTick for vue to apply the changes
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.serverErrorMess).toBe(
      "The email provided is not linked to an existing Symphonia account"
    );
    //The successful submission paragraph should appear
    expect(wrapper.find("#successful-submission").exists()).toBe(false);
  });
});
