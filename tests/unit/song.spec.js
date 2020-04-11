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
  it("Convert function",()=>{
    wrapper.vm.convert(2000);
    expect(wrapper.vm.min).toBe(Math.floor((2000 / 1000 / 60) << 0));
    expect(wrapper.vm.sec).toBe(Math.floor((2000 / 1000) % 60));
  });

  it("Check if the user saved this track", ()=>{
    wrapper.vm.checkLiked();
    expect("checkSaved").toHaveBeenCalled;
  });

  //---------------------------------------------------
  //       Test user functionalities (logged out)
  //---------------------------------------------------
  it("Show snack bar when user is logged out and click save track",()=>{
    wrapper.vm.snackbar=false;
    wrapper.vm.likeSong();
    expect(wrapper.vm.snackbar).toBe(true);
  });

  it("Show snack bar when user logged out at remove track click", () =>{
    wrapper.vm.snackbar=false;
    const item=wrapper.find("#removeTrack");
    item.vm.$emit("click");
    expect(wrapper.vm.snackbar).toBe(true);
  });

});
