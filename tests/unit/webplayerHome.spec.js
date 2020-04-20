import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import WebplayerHome from "@/views/WebPlayerHome.vue";
import VueRouter from "vue-router";
import NavBar from "@/components/WebplayerLayout/WebNavBar.vue";
import NavDrawer from "@/components/WebplayerLayout/WebNavDrawer.vue";

describe("Webplayer Home", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);

    const $forceUpdate = jest.fn();
    const $root = {};
    store = new Vuex.Store({
      modules: {
        playlist: {
          namespaced: true,
          state: {
            deletePlaylist: false,
            createPlaylist: false,
            addTrack: false
          }
        }
      }
    });

    wrapper = shallowMount(WebplayerHome, {
      store,
      router,
      vuetify,
      $forceUpdate,
      $root
    });
  });

  //--------------------------------------------------
  //              Test Rendering
  //--------------------------------------------------
  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Has Navagation Bar", () => {
    expect(wrapper.contains(NavBar)).toBe(true);
  });

  it("Has Navagation Drawer", () => {
    expect(wrapper.contains(NavDrawer)).toBe(true);
  });
  //--------------------------------------------------
  //          Test computed properties
  //--------------------------------------------------
  it("Get delete model state", () => {
    wrapper.setProps({ deletePlaylist: false });
    expect("wrapper.vm.deletePlaylist").toBe(false);
  });

  it("Get create model state", () => {
    wrapper.setProps({ createPlaylist: true });
    expect("wrapper.vm.createPlaylist").toBe(true);
  });

  it("Get add track model state", () => {
    wrapper.setProps({ addTrack: false });
    expect("wrapper.vm.addTrack").toBe(false);
  });
});
