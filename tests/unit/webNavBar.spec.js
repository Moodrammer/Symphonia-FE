import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import NavBar from "@/components/WebplayerLayout/WebNavBar.vue";

describe("Nav Bar", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();

    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        category:{
          mutations:{
            changeLogoutUpdate: jest.fn()
          }
        }
      }});
    wrapper = shallowMount(NavBar, {
      router,
      store,
      vuetify,
      attachToDocument: true
    });
  });

  //--------------------------------------------------
  //              Test Rendering
  //--------------------------------------------------
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  //--------------------------------------------------------
  //        Check the existance of the components
  //--------------------------------------------------------
  it("Contains backward icon", () => {
    const icon = wrapper.find("#backward");
    expect(icon.exists()).toBe(true);
  });

  it("Contains forward icon", () => {
    const icon = wrapper.find("#forward");
    expect(icon.exists()).toBe(true);
  });

  it("Contains Sign up button", () => {
    const signupBtn = wrapper.find("#signUp");
    expect(signupBtn.text() == "SIGN UP").toBe(true);
  });

  it("contains Log in button", () => {
    const loginBtn = wrapper.find("#logIn");
    expect(loginBtn.text() == "LOG IN").toBe(true);
  });

  //------------------------------------------------
  //            Test component functions
  //-----------------------------------------------
  it("Logout function", () => {
    wrapper.vm.logOutAndRerender();
    expect(wrapper.vm.logOut()).toHaveBeenCalled;
  });

  it("Handles searvh view tabs", () => {
    wrapper.vm.handleTabs("search");
    expect(wrapper.vm.showSearch).toBe(true);
    expect(wrapper.vm.showCollection).toBe(false);
    expect(wrapper.vm.showUpgrade).toBe(false);
  });

  it("Handles Home tabs", () => {
    wrapper.vm.handleTabs("home");
    expect(wrapper.vm.showSearch).toBe(false);
    expect(wrapper.vm.showCollection).toBe(false);
    expect(wrapper.vm.showUpgrade).toBe(true);
  });

  it("Handles Library tabs", () => {
    wrapper.vm.handleTabs("Playlists");
    expect(wrapper.vm.showSearch).toBe(false);
    expect(wrapper.vm.showCollection).toBe(true);
    expect(wrapper.vm.showUpgrade).toBe(false);
  });

  it("Handles menu items at artist view", () => {
    wrapper.vm.itemChosen("Artists");
    expect(wrapper.vm.selectedItem).toBe("Artists");
  });

  it("Handles menu items at album view", () => {
    wrapper.vm.itemChosen("Albums");
    expect(wrapper.vm.selectedItem).toBe("Albums");
  });

  it("Go forward", () => {
    const icon = wrapper.find("#forward");
    icon.vm.$emit("click");
    expect("next").toBeCalled;
  });

  it("Go backward", () => {
    const icon = wrapper.find("#backward");
    icon.vm.$emit("click");
    expect("prev").toBeCalled;
  });
});
