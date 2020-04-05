import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import vuetify from "vuetify";

import WebplayerHome from "@/views/WebPlayerHome.vue";
import NavBar from "@/components/WebNavBar.vue";
import NavDrawer from "@/components/WebNavDrawer.vue";

describe("WebplayerHome", () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(vuetify);
    wrapper = shallowMount(WebplayerHome);
  });

  it("renders a vue instance", () => {
    expect(shallowMount(WebplayerHome).isVueInstance()).toBe(true);
  });

  it("Has Navagation Bar", () => {
    expect(wrapper.contains(NavBar)).toBe(true);
  });

  it("Has Navagation Drawer", () => {
    expect(wrapper.contains(NavDrawer)).toBe(true);
  });

  it("Contains recently played h1", () => {
    expect(wrapper.html()).toContain('<h1 class="mb-3">Recently played</h1>');
  });
});
