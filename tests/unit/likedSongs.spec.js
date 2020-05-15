import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

//importing the required components
import likedSongs from "@/views/LikedSongs.vue";
import SongItem from "@/components/general/SongItem.vue";


describe("Liked Songs", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

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
            savedTracksNum:1
          },

          actions: {
            getTracks: jest.fn()
          }
        }
      }
    });

    //Mount the component to be tested
    wrapper = shallowMount(likedSongs, {
      vuetify,
      store,
      stubs: {
        'updateContent': likedSongs
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
  it("Update Saved tracks", async () => {
    wrapper.find(SongItem).vm.$emit('updateContent');
    expect(wrapper.vm.update).toBe(true);
  });
});
