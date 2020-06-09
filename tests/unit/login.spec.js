//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import axios from 'axios'

jest.mock('axios')
//Importing the component to be tested
import login from "@/views/Login.vue";

//const localVue = createLocalVue();

describe("login", () => {
  let wrapper;
  let vuetify;
  let actions;
  let allowNotifications = true;
  let notifyMutations;
  let store;
  let mockState = "";

  beforeEach(() => {
    //tell vue global constructor to use vuex
    Vue.use(Vuex);
    //define a mocking vuex store
    notifyMutations = {
      setPushNotificationsPermission: jest.fn()
    };
    actions = {
      loginuser: jest.fn(() => {
        if (mockState == "fail")
          return Promise.reject({
            status: "fail"
          });
        else if (mockState == "error")
          return Promise.reject({
            status: "error",
            msg: "Please try again later"
          });
        else return Promise.resolve();
      })
    };
    store = new Vuex.Store({
      modules: {
        notification: {
          namespaced: true,
          mutations: notifyMutations
        },
        user: {
          actions
        }
      }
    });
    //define the other plugins
    //const router = new VueRouter();
    vuetify = new Vuetify();
    //tell vue global constructor to use the other plugins
    Vue.use(Vuetify);
    const $router = [];
    const $route = {
      query: {
        redirect: "/webhome/home"
      }
    };
    window.FB = {
      login: jest.fn()
    };
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = mount(login, {
      vuetify,
      store,
      stubs: ["router-link"],
      mocks: { $router, $route },
      methods: {
        isNotificationsAllowed() {
          return allowNotifications;
        }
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

  //check if it contains a login button
  it("renders the Log in button text correctly", () => {
    const btn_wrp = wrapper.find("#login-button");
    expect(btn_wrp.text() == "LOG IN").toBe(true);
  });

  //check if the continue with facebook button renders correctly
  it("renders the continue with Facebook button text correctly", () => {
    //find the facebook button through it id
    const fb_btn_wrp = wrapper.find("#fb-login");
    //assert that it renders correctly
    expect(fb_btn_wrp.text()).toBe("CONTINUE WITH FACEBOOK");
  });

  //check if the alert appears on wrong submission
  it("shows an alert when the errorState is set to true", async () => {
    //set the errorState to true
    wrapper.vm.errorState = true;
    //wait for the next tick to ensure Dom Update
    await wrapper.vm.$nextTick();
    //assert if the alert appears exists returns true if the wrapper returned by find is not empty
    expect(wrapper.find(".v-alert__content").exists()).toBe(true);
  });

  //assert that the alert doesn't appear if the errorState is set to false
  it("hides the alert when the errorState is set to false", async () => {
    //set the errorState to true
    wrapper.vm.errorState = false;
    //wait for the next tick to ensure Dom Update
    await wrapper.vm.$nextTick();
    //assert if the alert appears
    expect(wrapper.find(".v-alert__content").exists()).toBe(false);
  });
  //--------------------------------------------------------------------------------------------
  //Userinput tests

  //check if the data changes when an input is added to the user email text field
  it("stores user email data in the component local state", async () => {
    const email_wrp = wrapper.find("#login-username");
    //simulate entering the data by the user
    email_wrp.element.value = "m@gmail.com";
    email_wrp.trigger("input");
    //check if the local state is updated due to binding using v-model
    expect(wrapper.vm.formData.email).toBe("m@gmail.com");
  });

  //check if validation error message appears on wrong input to email address
  it("causes a validation error on invalid email input", async () => {
    //find the email text field input element by id
    const email_wrp = wrapper.find("#login-username");
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

  //check if the data changes when an input is added to password text field
  it("stores user password data in the component local state", async () => {
    const pass_wrp = wrapper.find("#login-password");
    //simulate entering the data by the user
    pass_wrp.element.value = "12345678";
    pass_wrp.trigger("input");
    //check if the local state is updated due to binding using v-model
    expect(wrapper.vm.formData.password).toBe("12345678");
  });

  //check if the data in the model changes on using the checkbox
  it("changes the value of rememberme to true on checking the checkbox", () => {
    const rm_wrp = wrapper.find("#rm-chkbx");
    //simulate checking the box by the user
    //rm_wrp.element.checked = false
    rm_wrp.trigger("change");
    //check if the data in the local state changed
    expect(wrapper.vm.formData.rememberMe).toBe(true);
  });

  //check if validation error message appears on empty input

  //form submission tests
  it("dispatches the submit action data if the data is valid", () => {
    const email_wrp = wrapper.find("#login-username");
    //simulate entering the data by the user
    email_wrp.element.value = "Bob@gmail.com";
    email_wrp.trigger("input");
    const pass_wrp = wrapper.find("#login-password");
    //simulate entering the data by the user
    pass_wrp.element.value = "12345678";
    pass_wrp.trigger("input");
    //simulate clicking the login key
    const btn_wrp = wrapper.find("#login-button");
    btn_wrp.trigger("click");
    //expect the action has been dispatched
    expect(actions.loginuser).toHaveBeenCalled();
  });

  it("doesn't dispatch the action if the form data is invalid", () => {
    const btn_wrp = wrapper.find("#login-button");
    btn_wrp.trigger("click");

    //expect that the action has not been dispatched
    expect(actions.loginuser).not.toHaveBeenCalled();
  });

  it("checks if the form is submitted on pressing the enter key", () => {
    allowNotifications = false;
    const email_wrp = wrapper.find("#login-username");
    //simulate entering the data by the user
    email_wrp.element.value = "Bob@gmail.com";
    email_wrp.trigger("input");
    const pass_wrp = wrapper.find("#login-password");
    //simulate entering the data by the user
    pass_wrp.element.value = "12345678";
    pass_wrp.trigger("input");
    //simulate pressing enter to submit the form
    wrapper.trigger("keyup.enter");
    //expect the action has been dispatched
    expect(actions.loginuser).toHaveBeenCalled();
  });

  it("checks if the form is not submitted on pressing any other key than the enter key for example the space key", () => {
    const email_wrp = wrapper.find("#login-username");
    //simulate entering the data by the user
    email_wrp.element.value = "Bob@gmail.com";
    email_wrp.trigger("input");
    const pass_wrp = wrapper.find("#login-password");
    //simulate entering the data by the user
    pass_wrp.element.value = "12345678";
    pass_wrp.trigger("input");
    //simulate pressing enter to submit the form
    wrapper.trigger("keyup.space");
    //expect the action has been dispatched
    expect(actions.loginuser).not.toHaveBeenCalled();
  });

  it("checks the error state if the loginuser action promise is rejected with status fail", async () => {
    //setting the loginuser action stub mockStatus
    mockState = "fail";
    const email_wrp = wrapper.find("#login-username");
    //simulate entering the data by the user
    email_wrp.element.value = "Bob@gmail.com";
    email_wrp.trigger("input");
    const pass_wrp = wrapper.find("#login-password");
    //simulate entering the data by the user
    pass_wrp.element.value = "12345678";
    pass_wrp.trigger("input");
    //simulate clicking the login key
    const btn_wrp = wrapper.find("#login-button");
    btn_wrp.trigger("click");
    await wrapper.vm.$nextTick();
    //expect the action has been dispatched
    expect(wrapper.vm.errorState).toBe(true);
  });

  it("checks the error state and message if the loginuser action promise is rejected with status error", async () => {
    //setting the loginuser action stub mockStatus
    mockState = "error";
    const email_wrp = wrapper.find("#login-username");
    //simulate entering the data by the user
    email_wrp.element.value = "Bob@gmail.com";
    email_wrp.trigger("input");
    const pass_wrp = wrapper.find("#login-password");
    //simulate entering the data by the user
    pass_wrp.element.value = "12345678";
    pass_wrp.trigger("input");
    //simulate clicking the login key
    const btn_wrp = wrapper.find("#login-button");
    btn_wrp.trigger("click");
    await wrapper.vm.$nextTick();
    //expect the action has been dispatched
    expect(wrapper.vm.errorState).toBe(true);
    expect(wrapper.vm.errorMessage).toBe("Please try again later");
  });

  it("checks if the router of webhome is pushed if the login action promise resolves", async () => {
    //setting the loginuser action stub mockStatus
    mockState = "success";
    const email_wrp = wrapper.find("#login-username");
    //simulate entering the data by the user
    email_wrp.element.value = "Bob@gmail.com";
    email_wrp.trigger("input");
    const pass_wrp = wrapper.find("#login-password");
    //simulate entering the data by the user
    pass_wrp.element.value = "12345678";
    pass_wrp.trigger("input");
    //simulate clicking the login key
    const btn_wrp = wrapper.find("#login-button");
    btn_wrp.trigger("click");
    await wrapper.vm.$nextTick();
    //expect the action has been dispatched
    expect(wrapper.vm.$router[0]).toBe("/webhome/home");
  });

  it("calls login from facebook sdk", () => {
    wrapper.vm.loginWithFacebook();
    expect(wrapper.vm.errorState).toBe(false);
  });

  it("sends the access token to the server on facebook login", async () => {
    const data = {
      data: {
        token: '1',
        user: {
          name: 'Bob',
          email: 'Bob@gmail.com',
          _id: '1',
          type: 'user',
          imageFacebookUrl: '1'
        }
      }
    }
    axios.post.mockImplementationOnce(() => Promise.resolve(data))
    wrapper.vm.sendAccessToken("1");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$router[0]).toBe("/webhome/home")
  })

  it("sets a notification permission on recieving a registration token from server", async () => {
    const data = {
      data: {
        token: '1',
        user: {
          name: 'Bob',
          email: 'Bob@gmail.com',
          _id: '1',
          type: 'user',
          imageFacebookUrl: '1',
          registraionToken: '1'
        }
      }
    }
    axios.post.mockImplementationOnce(() => Promise.resolve(data))
    wrapper.vm.sendAccessToken("1");
    await wrapper.vm.$nextTick();
    expect(notifyMutations.setPushNotificationsPermission).toBeCalled();
  })

  it("catches server error on facebook login", async () => {
    axios.post.mockImplementationOnce(() => Promise.reject('failed'))
    wrapper.vm.sendAccessToken("1");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.errorState).toBe(true)
  })

});
