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
            },
            setTotalDuration: (state, totalDuration) => {
              state.totalDuration = totalDuration;
            }
          }
        },
        playlist: {
          namespaced: true,

          state: {
            audio: "",
            isQueueOpened: false,
            setIsFirstSong: false,
            paused: true
          },

          actions: {
            createPlaylist: jest.fn()
          },
          mutations: {
            setAudio: (state, audio) => {
              state.audio = audio;
            },
            setPaused: (state, paused) => {
              state.paused = paused;
            },
            setIsSongLoaded: (state, loaded) => {
              state.loaded = loaded;
            },
            setIsFirstSong: (state, isFirstSong) => {
              state.isFirstSong = isFirstSong;
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

  //shuffle
  it("shuffle enabled", () => {
    wrapper.vm.enableShuffle();
    expect(wrapper.vm.isShuffleEnabled).toBe(true);
  });

  it("shuffle disabled", () => {
    wrapper.vm.disableShuffle();
    expect(wrapper.vm.isShuffleEnabled).toBe(false);
  });

  it("repeat enabled", () => {
    wrapper.vm.enableRepeat();
    expect(wrapper.vm.isRepeatEnabled).toBe(true);
  });

  it("RepeatOnce enabled", () => {
    wrapper.vm.enableRepeatOnce();
    expect(wrapper.vm.isRepeatEnabled).toBe(false);
    expect(wrapper.vm.isRepeatOnceEnabled).toBe(true);
  });

  it("disableRepeatOnce", () => {
    wrapper.vm.disableRepeatOnce();
    expect(wrapper.vm.isRepeatOnceEnabled).toBe(false);
  });

  //mute
  it("mute the volume", () => {
    wrapper.vm.isMuted = false;
    wrapper.vm.mute();
    expect(wrapper.vm.isMuted).toBe(true);

    wrapper.vm.mute();
    expect(wrapper.vm.isMuted).toBe(false);
  });

  it("Loaded handler", () => {
    wrapper.vm.setAudio({
      readyState: 3,
      duration: 3000,
      play: function() {}
    });

    wrapper.vm.setIsFirstSong(false);
    wrapper.vm._handleLoaded();

    expect(wrapper.vm.totalDuration).toEqual(3000);
    expect(wrapper.vm.isBuffering).toEqual(true);
  });

  it("playing handler", () => {
    wrapper.vm.setAudio({
      currentTime: 3000
    });
    wrapper.vm.currentTimeInSec = 10;

    //scenario 1
    wrapper.vm.isProgressBarPressed = true;
    wrapper.vm._handlePlayingUI();
    expect(wrapper.vm.currentTimeInSec).toEqual(10);

    //scenario 2
    wrapper.vm.isProgressBarPressed = false;
    wrapper.vm._handlePlayingUI();
    expect(wrapper.vm.currentTimeInSec).toEqual(3000);
  });

  it("pause handler", () => {
    wrapper.vm._handlePause();
    expect(wrapper.vm.paused).toEqual(true);
  });

  it("started buffering", () => {
    wrapper.vm._handlerWaiting();
    expect(wrapper.vm.isBuffering).toEqual(false);
  });

  it("buffering is finished", () => {
    wrapper.vm._handlePlayingAfterBuffering();
    expect(wrapper.vm.isBuffering).toEqual(true);
  });
});
