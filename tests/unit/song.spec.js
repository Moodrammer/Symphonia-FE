import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import SongItem from "@/components/general/SongItem.vue";

describe("Song Component", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    //mocking the store
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
            saveTrack: jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(SongItem, {
      vuetify,
      store,
      stubs: {
        RouterLink: RouterLinkStub
      },
      propsData: {
        contextMenu: {
          event: "event",
          type: "type",
          id: "1234"
        }
      }
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

  //--------------------------------------------------
  //         Testing created hook cycle actions
  //--------------------------------------------------
  it("Convert function", () => {
    wrapper.vm.convert(2000);
    expect(wrapper.vm.min).toBe(Math.floor((2000 / 1000 / 60) << 0));
    expect(wrapper.vm.sec).toBe(Math.floor((2000 / 1000) % 60));
  });

  //---------------------------------------------------
  //       Test user functionalities (logged out)
  //---------------------------------------------------
  it("Set menu data", () => {
    wrapper.vm.$emit("contextmenu.prevent");
    expect(wrapper.vm.menuClick()).toHaveBeenCalled;
  });
});
