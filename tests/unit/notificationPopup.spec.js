import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

import notificationPopup from "../../src/components/Notifications/NotificationPopUp";

describe("notificationPopup", () => {
  let wrapper;
  let vuetify;
  let store;
  let actions;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    const $router = [];
    actions = {
      setNotification: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        notification: {
          namespaced: true,
          state: {
            notificationData: {
              isNotificationShown: false,
              notificationTitle: "",
              notificationBody: "",
              notificationIcon: "/s11.png",
              color: "",
              timeout: 0,
              pushUrl: ""
            }
          },
          actions
        }
      }
    });

    wrapper = shallowMount(notificationPopup, {
      vuetify,
      store,
      mocks: { $router }
    });
  });

  //------------------------------------------------------------//
  //                        Rendering                           //
  //------------------------------------------------------------//
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("isVueInstance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  //-------------------------------------------------------------//
  //                    test functions                           //
  //-------------------------------------------------------------//
  it("closes Snackbar", () => {
    wrapper.vm.closeSnackbar();
    expect(actions.setNotification).toBeCalled();
  });

  it("test goToPage functionality", () => {
    wrapper.vm.goToPage();
    expect(wrapper.vm.$router[0]).toBe("");
  });
});
