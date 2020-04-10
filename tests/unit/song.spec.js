import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from 'vuex'

import Song from "@/components/general/Song.vue"

describe("Song Component", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        track: {
          namespaced: true,
          state: {
            generalLiked: true
          },

          actions: {
            removeSavedTrack: jest.fn(),
            checkSaved: jest.fn(),
            saveTrack: jest.fn(),
          }
        }
      }
    });

    wrapper = shallowMount(Song, {
      vuetify,
      store,
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Save a track for user", () =>{
    const item=wrapper.find("#removeTrack");
    item.vm.$emit("click");
    expect("saveTrack").toHaveBeenCalled;
  });

});
