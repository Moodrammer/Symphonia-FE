//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
//Importing the component to be tested
import changePass from "@/components/User Settings/ChangePassword.vue";
import bottomContent from "@/components/User Settings/bottomContent.vue";

describe("changePass", () => {
  let wrapper;
  let vuetify;
  let store;
  let actions;
  let mockState = "";
  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    actions = {
      updatePass: jest.fn(() => {
        if (mockState === "error") {
          wrapper.vm.errorWrongPass = true;
          return Promise.reject();
        } else {
          wrapper.vm.Done = true;
          return Promise.resolve();
        }
      })
    };

    store = new Vuex.Store({
      actions
    });
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = mount(changePass, {
      router,
      vuetify,
      store,
      data() {
        return {
          // the variable used for current user's password
          currentPassword: "",
          // the new password variable
          newPassword: "",
          // the confirm that they match the new password variable
          confirmPassword: "",
          // Prints the wrong password message if it's true
          errorWrongPass: false,
          // Prints the wrong match of the new & confirmed passwords
          errorWrongMatch: false,
          // Print error if the input text box of the new password is empty
          errorEmptyNew: false,
          // print error if the input text box of the Confirm password is empty
          errorEmptyConfirm: false,
          // Print the success message that the password is changed
          Done: false
        };
      },
      components: {
        // The review section
        bottomContent: bottomContent
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
  //test input current password
  it("check the  data currentPass recieved", () => {
    let current = wrapper.find("#current");
    current.element.value = "12345678";
    current.trigger("input");
    expect(wrapper.vm.currentPassword).toBe("12345678");
  });
  //test input new password
  it("check the  data newPass recieved", () => {
    let pass = wrapper.find("#pass");
    pass.element.value = "12345678";
    pass.trigger("input");
    expect(wrapper.vm.newPassword).toBe("12345678");
  });
  //test input confirm password
  it("check the  data confirmPass recieved", () => {
    let confirm = wrapper.find("#confirm");
    confirm.element.value = "12345678";
    confirm.trigger("input");
    expect(wrapper.vm.confirmPassword).toBe("12345678");
  });
  it("check the function is working chcek()", () => {
    let current = wrapper.find("#current");
    current.element.value = "12345678";
    current.trigger("input");
    let pass = wrapper.find("#pass");
    pass.element.value = "12345678";
    pass.trigger("input");
    let confirm = wrapper.find("#confirm");
    confirm.element.value = "12345678";
    confirm.trigger("input");
    wrapper.setMethods({
      updatePass: () => {
        return true;
      }
    });
    expect(wrapper.vm.updatePass()).toBe(true);
  });
  it("check that the currrent password empty to trigger error", () => {
    let current = wrapper.find("#current");
    current.element.value = "";
    current.trigger("input");
    wrapper.vm.check();
    expect(wrapper.vm.errorWrongPass).toBe(true);
  });
  it("check if the updatePass function fail ", async () => {
    mockState = "fail";
    wrapper.vm.check();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.errorWrongPass).toBe(true);
  });
  it("check that the new&confirm pass match", () => {
    let pass = wrapper.find("#pass");
    pass.element.value = "12345678";
    pass.trigger("input");
    let confirm = wrapper.find("#confirm");
    confirm.element.value = "12345676";
    confirm.trigger("input");
    wrapper.vm.check();
    expect(wrapper.vm.errorWrongMatch).toBe(true);
  });
  it("check the update function is called", () => {
    wrapper.vm.currentPassword = "password";
    wrapper.vm.newPassword = "newPassword";
    wrapper.vm.confirmPassword = "newPassword";
    mockState = "";
    wrapper.vm.check();
    expect(wrapper.vm.updatePassword).toHaveBeenCalled;
    store.dispatch("updatePass");
    wrapper.vm.$nextTick();
    expect(wrapper.vm.Done).toBe(true);
    expect(wrapper.vm.errorWrongPass).toBe(false);
  });
  it("check the update function is called and has error", () => {
    mockState = "error";
    wrapper.vm.updatePassword();
    store.dispatch("updatePass");
    expect(wrapper.vm.errorWrongPass).toBe(true);
  });
  it("check that both variables are false", () =>{
    expect(wrapper.vm.errorWrongPass).toBe(false);
    expect(wrapper.vm.Done).toBe(false);
  })
});

