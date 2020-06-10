import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

//importing the required components
import likedSongs from "@/views/LikedSongs.vue";

describe("Liked Songs", () => {
  let wrapper;
  let vuetify;
  let store;
  let trackActions;
  let trackMutations;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    trackActions = {
      getTracks: jest.fn(),
      togglePauseAndPlay: jest.fn(),
      playTrackInQueue: jest.fn(),
      getTrackInformation: jest.fn(),
      updateQueue: jest.fn()
    };

    trackMutations = {
      changeUpdateTracks: jest.fn(),
      setIsTrackPaused: jest.fn(),
      setContextData: jest.fn()
    };
    //Mocking the store
    store = new Vuex.Store({
      modules: {
        track: {
          namespaced: true,
          state: {
            savedTracks: [
              {
                name: "Sulk",
                durationMs: 30000,
                _id: "5e8a39f24e11cd46c8bde654",
                artist: "5e8b6d866253cb184eaac150",
                album: "5e8b6d866253cb184eaac150"
              }
            ],
            savedTracksNum: 1,
            updateSavedTracks: false,
            contextType: "album",
            nonPremiumTrackID: "1"
          },
          mutations: trackMutations,
          actions: trackActions
        }
      }
    });

    //Mount the component to be tested
    wrapper = shallowMount(likedSongs, {
      vuetify,
      store,
      stubs: {
        updateContent: likedSongs
      }
    });
  });

  //--------------------------------------------------
  //             Test Rendering
  //--------------------------------------------------
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  //--------------------------------------------------
  //     Check the existance of the components
  //--------------------------------------------------
  it("Contains Play Button", () => {
    const btn = wrapper.find("#playBtn");
    expect(btn.text() == "Play").toBe(true);
  });

  it("Contains Liked Songs Image", () => {
    const img = wrapper.find("#playPhoto");
    expect(img.exists()).toBe(true);
  });
  //-------------------------------------------------
  //             Update the tracks
  //-------------------------------------------------
  it("Update Saved tracks", () => {
    store.state.track.updateSavedTracks = true;
    wrapper.vm.$options.watch.isUpdateTracks.call(wrapper.vm);
    expect(trackActions.getTracks).toBeCalled();
    expect(trackMutations.changeUpdateTracks).toBeCalled();
  });

  it("No track update", () => {
    store.state.track.updateSavedTracks = false;
    wrapper.vm.$options.watch.isUpdateTracks.call(wrapper.vm);
    expect(trackMutations.changeUpdateTracks).not.toBeCalled();
  });
  //------------------------------------------------
  //            Play/Pause liked tracks
  //------------------------------------------------
  it("Contains only premium tracks", () => {
    store.state.track.nonPremiumTrackID = null;
    wrapper.vm.playLikedSongs();
    expect(trackMutations.setIsTrackPaused).not.toBeCalled();
  });

  it("Pause the currently playing track", () => {
    wrapper.vm.pauseLikedSongs();
    expect(trackActions.togglePauseAndPlay).toBeCalled();
    expect(trackMutations.setIsTrackPaused).toBeCalled();
  });

  it("Play a new liked track", () => {
    store.state.track.nonPremiumTrackID = "1";
    wrapper.vm.playLikedSongs();
    expect(trackMutations.setContextData).toBeCalled();
  });

  it("Liked songs is already playing", () => {
    store.state.track.contextType = "liked";
    wrapper.vm.playLikedSongs();
    expect(trackActions.togglePauseAndPlay).toBeCalled();
    expect(trackMutations.setIsTrackPaused).toBeCalled();
  });
});
