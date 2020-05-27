//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
//Importing the component to be tested
import signup from "@/views/SignUp.vue";

describe("signup", () => {
  let wrapper;
  let vuetify;
  //vuex variables
  let actions;
  let mutations;
  let store;
  let mockState = "";

  beforeEach(() => {
    Vue.use(Vuex);
    //define a mock version of the store
    actions = {
      registerUser: jest.fn(() => {
        if (mockState == "fail") {
          return Promise.reject({
            status: "fail"
          });
        } else if (mockState == "error")
          return Promise.reject({
            status: "error",
            msg: "Please try again later"
          });
        else return Promise.resolve();
      })
    };
    mutations = {
      setuserDOB: jest.fn()
    };
    store = new Vuex.Store({
      actions,
      mutations
    });
    const $route = {
      query: {
        redirect: "webhome/home"
      }
    }
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = mount(signup, {
      vuetify,
      store,
      stubs: ["router-link"],
      mocks: {$route}
    });
  });
  //-------------------------------------------------------------------------//
  //                          Rendering tests                                //
  //-------------------------------------------------------------------------//

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  //check if it is a vue instance
  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  //check rendering of each compnent
  it("renders the Signup with facebook button", () => {
    const btn_wrp = wrapper.find("#fb-sign-btn");
    expect(btn_wrp.text()).toBe("Sign up with Facebook");
  });

  it("renders the Signup with Google button", () => {
    const btn_wrp = wrapper.find("#ggl-sign-btn");
    expect(btn_wrp.text()).toBe("Sign up with Google");
  });

  it("renders the email textbox", () => {
    const eml_wrp = wrapper.find("#user-email");
    expect(eml_wrp.exists()).toBe(true);
  });

  it("renders the email confirm textbox", () => {
    const eml_wrp = wrapper.find("#user-confirmation-email");
    expect(eml_wrp.exists()).toBe(true);
  });

  it("renders the password textbox", () => {
    const pass_wrp = wrapper.find("#user-password");
    expect(pass_wrp.exists()).toBe(true);
  });

  it("renders what should we call you ? textbox", () => {
    const username_wrp = wrapper.find("#username");
    expect(username_wrp.exists()).toBe(true);
  });

  it("renders the Day of birth textbox", () => {
    const bd_wrp = wrapper.find("#birth-day");
    expect(bd_wrp.exists()).toBe(true);
  });

  it("renders the month of birth selection", () => {
    const mnth_wrp = wrapper.find("#birth-month");
    expect(mnth_wrp.exists()).toBe(true);
  });

  it("renders the year of birth textbox", () => {
    const yr_wrp = wrapper.find("#birth-year");
    expect(yr_wrp.exists()).toBe(true);
  });

  it("renders the gender radio group", () => {
    const gender_wrp = wrapper.find("#gender");
    expect(gender_wrp.exists()).toBe(true);
  });

  it("renders the type radio group", () => {
    const type_wrp = wrapper.find("#type");
    expect(type_wrp.exists()).toBe(true);
  });

  it("renders the signup button", () => {
    const Signup_wrp = wrapper.find("#sign-up-btn");
    expect(Signup_wrp.text()).toBe("Sign up");
  });

  //-------------------------------------------------------------------------//
  //                        Simulating user input                            //
  //-------------------------------------------------------------------------//

  //check if the data changes when an input is added to the user email text field
  it("stores user email data in the component local state", async () => {
    const email_wrp = wrapper.find("#user-email");
    //simulate entering the data by the user
    email_wrp.element.value = "m@gmail.com";
    email_wrp.trigger("input");
    //check if the local state is updated due to binding using v-model
    expect(wrapper.vm.userData.email).toBe("m@gmail.com");
  });

  //check if validation error message appears on wrong input to email address
  it("causes a validation error on invalid email input", async () => {
    //find the email text field input element by id
    const email_wrp = wrapper.find("#user-email");
    //simulate entering an invalid email by the user
    email_wrp.element.value = "mahmoud";
    email_wrp.trigger("input");
    //await the next tick as vue batches the changes to the dom to prevent unnecessary re-renders
    await wrapper.vm.$nextTick();
    //assert that the validation message renders on wrong input
    expect(wrapper.find(".v-messages__message").text()).toBe(
      "E-mail must be valid"
    );
  });

  //check if the data changes when an input is added to the user password text field
  it("stores user password data in the component local state", async () => {
    const pass_wrp = wrapper.find("#user-password");
    //simulate entering the data by the user
    pass_wrp.element.value = "123456789";
    pass_wrp.trigger("input");
    //check if the local state is updated due to binding using v-model
    expect(wrapper.vm.userData.password).toBe("123456789");
  });

  //check if validation error message appears on wrong input to password
  it("causes a validation error on invalid password input", async () => {
    //find the password text field input element by id
    const pass_wrp = wrapper.find("#user-password");
    //simulate entering an invalid password by the user
    pass_wrp.element.value = "1";
    pass_wrp.trigger("input");
    //await the next tick as vue batches the changes to the dom to prevent unnecessary re-renders
    await wrapper.vm.$nextTick();
    //assert that the validation message renders on wrong input
    expect(wrapper.find(".v-messages__message").text()).toBe(
      "Password is too short"
    );
  });

  //-------------------------------------------------------------------------//
  //                        Submitting the form                             //
  //-------------------------------------------------------------------------//
  // it("submits the form on valid input", () => {
  //   //set the mockState so that the stub action returns the suitable promise result
  //   mockState = "fail"
  //   wrapper.vm.submitForm()
  //   expect(wrapper.vm.errorState).toBe(true)

  //})
});
