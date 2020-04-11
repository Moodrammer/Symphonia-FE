import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

import WebplayerHome from "@/views/WebPlayerHome.vue";
import VueRouter from "vue-router";
import NavBar from "@/components/WebplayerLayout/WebNavBar.vue";
import NavDrawer from "@/components/WebplayerLayout/WebNavDrawer.vue";

describe("Webplayer Home", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    wrapper = shallowMount(WebplayerHome, {
      router,
      vuetify
    });
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Has Navagation Bar", () => {
    expect(wrapper.contains(NavBar)). toBe(true);
  });

  it("Has Navagation Drawer", () => {
    expect(wrapper.contains(NavDrawer)).toBe(true);
  });

});
