import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

import WebplayerHome from "@/views/WebPlayerHome.vue";
import NavBar from "@/components/WebplayerLayout/WebNavBar.vue";
import NavDrawer from "@/components/WebplayerLayout/WebNavDrawer.vue";

describe("Webplayer Home", () => {
  let wrapper;
  let vuetify;
  let newDiv
  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    newDiv = document.createElement("html");
    document.body.appendChild(newDiv);
    wrapper = shallowMount(WebplayerHome,vuetify,global.document);
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

  it("Contains recently played h1", () => {
    expect(wrapper.html()).toContain('<h1 class="mb-3">Recently played</h1>');
  });
});
