import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import SongItem from "@/components/general/SongItem.vue";

describe("Song Component", () => {
  let wrapper;
  let vuetify;
  let store;
  let trackActions;
  let trackMutations;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    trackActions={
      removeSavedTrack: jest.fn(),
      checkSaved: jest.fn(),
      saveTrack: jest.fn(),
      togglePauseAndPlay: jest.fn(),
      getTrackInformation: jest.fn(),
      playTrackInQueue: jest.fn(),
      updateQueue: jest.fn()
    };

    trackMutations={
      setContextData: jest.fn(),
      setIsTrackPaused: jest.fn()
    };
    //mocking the store
    store = new Vuex.Store({
      modules: {
        track: {
          namespaced: true,
          state: {
            generalLiked: true,
            trackId: "1",
            isTrackPaused: true,
            contextID:"id"
          },
          mutations: trackMutations,
          actions: trackActions
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
        },
        ID: "2",
        contextID:"context",
        isDisabled: true
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

  //---------------------------------------------------
  //    Test soundplayer interaction with song item
  //---------------------------------------------------
  it("Play a new track from the same context", () => {
    wrapper.vm.playTrack();
    expect(trackActions.playTrackInQueue).toHaveBeenCalled();
    expect(trackMutations.setContextData).toHaveBeenCalled();
  });

  it("Play a new track from the another context", () => {
    store.state.track.trackId = "2";
    wrapper.vm.playTrack();
    expect(trackActions.playTrackInQueue).toHaveBeenCalled();
    expect(trackMutations.setContextData).toHaveBeenCalled();
  });

  it("Check if the track is the currently playing track", () => {
    wrapper.setProps({ ID: "1" });
    expect(wrapper.vm.isPlaying).toBe(true);
    expect(wrapper.vm.isPaused).toBe(true);
  });

  it("Check if the track is paused", () => {
    wrapper.setProps({ ID: "2" });
    expect(wrapper.vm.isPlaying).toBe(false);
    expect(wrapper.vm.isPaused).toBe(true);
  });

  it("Play the current track",()=>{
    wrapper.setProps({ ID: "1" });
    wrapper.setProps({ contextID: "id" });
    wrapper.vm.playTrack();
    expect(trackActions.togglePauseAndPlay).toHaveBeenCalled();
    expect(trackMutations.setIsTrackPaused).toHaveBeenCalled();
  });

  it("Pause the currently playing track", () => {
    wrapper.vm.pauseTrack();
    expect(trackActions.togglePauseAndPlay).toHaveBeenCalled();
    expect(trackMutations.setIsTrackPaused).toHaveBeenCalled();
  });

  it("Set disabled flag",()=>{
    expect(wrapper.vm.disabledTrack).toBe(true);
  });
});
