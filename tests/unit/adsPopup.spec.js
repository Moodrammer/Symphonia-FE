import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import AdsPopup from "@/components/Popups/AdsPopup.vue";

describe("CreatePlaylist", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        playlist: {
          namespaced: true,
          mutations: {
            changeAdsPopup: jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(AdsPopup, {
      vuetify,
      store
    });
  });

  //--------------------------------------------------------
  //                     Rendering
  //--------------------------------------------------------
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Change the popup model at closing", () => {
    wrapper.vm.close();
    expect("changeAdsPopup").toBeCalled;
    expect(wrapper.vm.dialog).toBe(false);
  });
});
