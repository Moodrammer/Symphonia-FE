import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";
import soundplayer from "@/components/TheSoundplayer/TheSoundplayer.vue";

describe("TheSoundplayer", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        track: {
          namespaced: true,

          state: {
            trackName: "",
            liked: true,
            trackUrl: null,
            trackId: null,
            imageUrl: null,
            trackAlbumId: null,
            albumName: "",
            totalDuration: 0,
            totalDurationMs: 0,
            trackArtists: [
              {
                name: "",
                href: ""
              }
            ],
            generalLiked: null,
            firstTrackInQueue: false,
            lastTrackInQueue: false,
            queueTracks: [],
            queueNextTracks: [],
            isCurTrkReady: false
          },
          actions: {
            getQueueStore: () => {}
          },
          mutations: {
            setAudio: (state, audio) => {
              state.audio = audio;
            },
            setLiked: (state, liked) => {
              state.liked = liked;
            }
          }
        },
        playlist: {
          namespaced: true,

          state: {
            audio: "",
            isQueueOpened: false
          },

          actions: {
            createPlaylist: jest.fn()
          },
          mutations: {
            setAudio: (state, audio) => {
              state.audio = audio;
            }
          },
          getters: {
            audio: state => {
              return state.audio;
            },
            isQueueOpened: state => {
              return state.isQueueOpened;
            },
            paused: state => {
              return state.paused;
            }
          }
        }
      }
    });

    wrapper = shallowMount(soundplayer, {
      vuetify,
      store,
      router
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  //check if it is a vue instance
  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  // test like song
  it("song is disliked", () => {
    wrapper.vm.saveToLikedSongs();
    expect(wrapper.vm.isSongIsLiked).toEqual(false);
  });

  //test volume mute
  it("volume is muted after volumebar is 0 ", () => {
    wrapper.vm.volumeValue = 0;
    wrapper.vm.updateVolume();
    expect(wrapper.vm.isMuted).toEqual(true);
  });

  it("volume gets back after changing the volumebar", () => {
    wrapper.vm.volumeValue = 50;
    wrapper.vm.isMuted = true; //volume is muted
    wrapper.vm.updateVolume();
    expect(wrapper.vm.isMuted).toEqual(false);
  });

  //mute
  it("mute the volume", () => {
    wrapper.vm.isMuted = false;
    wrapper.vm.mute();
    expect(wrapper.vm.isMuted).toBe(true);

    wrapper.vm.mute();
    expect(wrapper.vm.isMuted).toBe(false);
  });
});
