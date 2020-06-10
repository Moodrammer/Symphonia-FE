import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import LogoutPopUp from "@/components/Popups/LogoutPopUp.vue";

describe("Logout PopUp", () => {
  let wrapper;
  let vuetify;
  let store;
  let webplayerHomeMutations;
  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    webplayerHomeMutations = {
      toggleLogoutPopUpState: jest.fn()
    };

    const $router = [];

    store = new Vuex.Store({
      modules: {
        webplayerHome: {
          namespaced: true,
          mutations: webplayerHomeMutations
        }
      }
    });

    wrapper = shallowMount(LogoutPopUp, {
      vuetify,
      store,
      mocks: { $router }
    });
  });

  it("Change the popup model at closing", () => {
    wrapper.vm.close();
    expect(webplayerHomeMutations.toggleLogoutPopUpState).toBeCalled();
    expect(wrapper.vm.dialog).toBe(false);
  });

  it("Route to sign up and close the popup", () => {
    wrapper.vm.toSignUp();
    expect(wrapper.vm.$router[0]).toBe("/signup");
    expect(wrapper.vm.close()).toHaveBeenCalled;
  });

  it("Route to login and close the popup", () => {
    wrapper.vm.toLogin();
    expect(wrapper.vm.$router[0]).toBe("/login");
    expect(wrapper.vm.close()).toHaveBeenCalled;
  });
});
