//Importing plugins and helpers
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex"
//Importing the component to be tested
import UserSettings from "@/views/UserSettings.vue";

describe("User_Settings", () => {
  let wrapper;
  let vuetify;
  let store;
  let notifyActions;

  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    notifyActions = {
      getRegistrationToken: jest.fn(),
      setRecieveNotificationHandler: jest.fn(),
      setRefreshTokenHandler: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        notification: {
          namespaced: true,
          actions: notifyActions
        }
      }
    })
    wrapper = shallowMount(UserSettings, {
      router,
      vuetify,
      store,
      methods: {
        isLoggedIn() {
          return true;
        },
        isNotificationsAllowed() {
          return true;
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

  it("intializes notification handlers on creation if user is logged in and allowing notifications", () => {
    expect(notifyActions.getRegistrationToken).toBeCalled();
    expect(notifyActions.setRecieveNotificationHandler).toBeCalled();
    expect(notifyActions.setRefreshTokenHandler).toBeCalled();
  })

  it("doesn't initialize notification handlers incase the user is logged out", () => {
    notifyActions = {
      getRegistrationToken: jest.fn(),
      setRecieveNotificationHandler: jest.fn(),
      setRefreshTokenHandler: jest.fn()
    }
    const router = new VueRouter();
    wrapper = shallowMount(UserSettings, {
      store,
      router,
      vuetify,
      methods: {
        isLoggedIn() {
          return false;
        },
        isNotificationsAllowed() {
          return false;
        }
      }
    });
      expect(notifyActions.getRegistrationToken).not.toBeCalled();
      expect(notifyActions.setRecieveNotificationHandler).not.toBeCalled();
      expect(notifyActions.setRefreshTokenHandler).not.toBeCalled();
  })

  it("doesn't initialize notification handlers incase the user is logged in but disabling notifications", () => {
    notifyActions = {
      getRegistrationToken: jest.fn(),
      setRecieveNotificationHandler: jest.fn(),
      setRefreshTokenHandler: jest.fn()
    }
    const router = new VueRouter();
    wrapper = shallowMount(UserSettings, {
      store,
      router,
      vuetify,
      methods: {
        isLoggedIn() {
          return true;
        },
        isNotificationsAllowed() {
          return false;
        }
      }
    });
      expect(notifyActions.getRegistrationToken).not.toBeCalled();
      expect(notifyActions.setRecieveNotificationHandler).not.toBeCalled();
      expect(notifyActions.setRefreshTokenHandler).not.toBeCalled();
  })
});
