import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";
import soundplayer from "@/components/TheSoundplayer/TheSoundplayer.vue";

console.log("////////////////////////////////////////////////////////")

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
            audioElement: undefined,

            trackName: "",
            trackUrl: null,
            trackId: null,
            trackArtistName: "",
            trackTotalDuration: 0,
            trackTotalDurationMs: 0,
            isTrackLiked: null,
            isTrackPaused: true,
            isTrackLoaded: false,
            isCurTrkReady: false,
            isFirstTrackInQueue: true,
            isLastTrackInQueue: true,
            isNextAndPreviousFinished: true,
            isBuffering: false,
            isRepeatOnceEnabled: false,

            trackAlbumImageUrl: null,
            trackAlbumId: null,
            trackAlbumName: "",

            contextType: "",
            contextId: "",
            contextUrl: "",

            isQueueOpened: false,
            queueTracks: [],
            queueNextTracks: [],
          },
          actions: {
            next({ state }) {
              state.isNextAndPreviousFinished = false;

              state.isBuffering = true;
              state.audioElement.autoplay = true;
            },
            previous({ state }) {
                state.isNextAndPreviousFinished = false;

                state.isBuffering = true;
                state.audioElement.autoplay = true;
            },
            getTrackInformation() {},
            updateQueue() {},
            updateQueueTracksInfo() {},
            togglePauseAndPlay() {},
            getCurrentlyPlayingTrackId() {},
            playTrackInQueue() {},
            toggleRepeatOnce({ state }) {
              state.isRepeatOnceEnabled = !state.isRepeatOnceEnabled;
            },
          },
          mutations: {
            setTrackUrl(state, trackUrl) {
              state.trackUrl = trackUrl;
            },
            setId(state, id) {
              state.trackId = id;
            },
            setFirstTrackInQueue(state, a) {
              state.isFirstTrackInQueue = a;
            },
            setLastTrackInQueue(state, a) {
              state.isLastTrackInQueue = a;
            },
            setQueueTracks(state, queueTracks) {
              state.queueTracks = queueTracks;
            },
            setTrackId(state, trackId) {
              state.trackId = trackId;
            },
            setTrackTotalDuration(state, trackTotalDuration) {
              state.trackTotalDuration = trackTotalDuration;
            },
            setAudioElement(state, audioElement) {
              state.audioElement = audioElement;
            },
            setIsTrackPaused(state, isTrackPaused) {
              state.isTrackPaused = isTrackPaused;
            },
            setIsQueueOpened(state, isQueueOpened) {
              state.isQueueOpened = isQueueOpened;
            },
            setIsTrackLoaded(state, isTrackLoaded) {
              state.isTrackLoaded = isTrackLoaded;
            },
            setIsTrackLiked(state, isTrackLiked) {
              state.isTrackLiked = isTrackLiked;
            },
            setIsBuffering(state, isBuffering) {
              state.isBuffering = isBuffering;
            },
            setToken(state, token) {
              state.token = token;
            },
            setContextType(state, contextType) {
              state.contextType = contextType;
            },
            setContextId(state, contextId) {
              state.contextId = contextId;
            },
            setContextUrl(state, contextUrl) {
              state.contextUrl = contextUrl;
            },
          },
        },
        category: {
          namespaced: true,

          state: {
            historyResponse: [{
              contextType: "",
              contextId: "",
              contextUrl: "",
            }]
          },
          actions: {
            recentlyPlayed(){}
          }
        }
      },
    });

    wrapper = shallowMount(soundplayer, {
      vuetify,
      store,
      router,
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
    wrapper.vm.setIsTrackLiked(true);
    wrapper.vm.saveToLikedSongs();
    expect(wrapper.vm.isTrackLiked).toEqual(false);

    wrapper.vm.setIsTrackLiked(false);
    wrapper.vm.saveToLikedSongs();
    expect(wrapper.vm.isTrackLiked).toEqual(true);
  });

  //test volume mute
  it("volume is muted after volumebar is 0 ", () => {
    wrapper.vm.volumeValue = 0;
    wrapper.vm.isMuted = false;
    wrapper.vm.updateVolume();
    expect(wrapper.vm.isMuted).toEqual(true);

    wrapper.vm.volumeValue = 0;
    wrapper.vm.isMuted = true;
    wrapper.vm.updateVolume();
    expect(wrapper.vm.isMuted).toEqual(true);
  });

  it("volume gets back after changing the volumebar", () => {
    wrapper.vm.volumeValue = 50;
    wrapper.vm.isMuted = true; //volume is muted
    wrapper.vm.updateVolume();
    expect(wrapper.vm.isMuted).toEqual(false);

    wrapper.vm.volumeValue = 50;
    wrapper.vm.isMuted = false; //volume is muted
    wrapper.vm.updateVolume();
    expect(wrapper.vm.isMuted).toEqual(false);
  });

  it("is invalid volume value", () => {
    wrapper.vm.isMuted = true;

    wrapper.vm.volumeValue = -10;
    wrapper.vm.updateVolume();
    expect(wrapper.vm.isMuted).toEqual(true);

    wrapper.vm.volumeValue = 200;
    wrapper.vm.updateVolume();
    expect(wrapper.vm.isMuted).toEqual(true);
  });

  it("toggle RepeatOnce", () => {
    store.state.track.isRepeatOnceEnabled = true;
    wrapper.vm.toggleRepeatOnce();
    expect(wrapper.vm.isRepeatOnceEnabled).toBe(false);

    wrapper.vm.toggleRepeatOnce();
    expect(wrapper.vm.isRepeatOnceEnabled).toBe(true);
  });

  it("toggle RepeatOnce Conditionally", () => {
    store.state.track.isRepeatOnceEnabled = true;
    store.state.track.isNextAndPreviousFinished = true;
    wrapper.vm.toggleRepeatOnceConditionally()
    expect(wrapper.vm.isRepeatOnceEnabled).toBe(false);

    store.state.track.isNextAndPreviousFinished = false;
    wrapper.vm.toggleRepeatOnceConditionally()
    expect(wrapper.vm.isRepeatOnceEnabled).toBe(false);
  })

  //mute
  it("mute the volume", () => {
    wrapper.vm.isMuted = false;
    wrapper.vm.mute();
    expect(wrapper.vm.isMuted).toBe(true);

    wrapper.vm.mute();
    expect(wrapper.vm.isMuted).toBe(false);
  });

  it("Loaded handler", () => {
    wrapper.vm.setAudioElement({
      readyState: 3,
      duration: 3000,
      play: function() {},
    });

    wrapper.vm._handleLoaded();

    expect(wrapper.vm.trackTotalDuration).toEqual(3000);
    expect(wrapper.vm.isBuffering).toEqual(false);

    wrapper.vm.setIsBuffering(true);
    wrapper.vm.setAudioElement({
      readyState: 1,
      duration: 2000,
      play: function() {},
    });

    wrapper.vm._handleLoaded();

    expect(wrapper.vm.trackTotalDuration).toEqual(3000);
    expect(wrapper.vm.isBuffering).toEqual(true);
  });

  it("playing handler", () => {
    wrapper.vm.setAudioElement({
      currentTime: 3000,
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

  it("handle ended track", () => {
    wrapper.vm._handleEndedTrack();
    expect(wrapper.vm.next).toBeCalled;
  });

  it("pause handler", () => {
    wrapper.vm._handlePause();
    expect(wrapper.vm.isTrackPaused).toEqual(true);
  });

  it("play handler", () => {
    wrapper.vm._handlePlay();
    expect(wrapper.vm.isTrackPaused).toEqual(false);
  });

  it("started buffering", () => {
    wrapper.vm._handlerWaiting();
    expect(wrapper.vm.isBuffering).toEqual(true);
  });

  it("buffering is finished", () => {
    wrapper.vm._handlePlayingAfterBuffering();
    expect(wrapper.vm.isBuffering).toEqual(false);
  });

  it("destroy the component", () => {
    wrapper.destroy();
  });

  it("play the next track", () => {
    wrapper.vm.setAudioElement({
      autoplay: false,
    });
    wrapper.vm.next();

    expect(wrapper.vm.audioElement.autoplay).toEqual(true);
  });

  it("play the next track conditionally", () => {
    wrapper.vm.setAudioElement({
      autoplay: false,
    });
    store.state.track.isNextAndPreviousFinished = true;
    wrapper.vm.nextConditionally()
    expect(wrapper.vm.audioElement.autoplay).toEqual(true);

    wrapper.vm.setAudioElement({
      autoplay: false,
    });
    store.state.track.isNextAndPreviousFinished = false;
    wrapper.vm.nextConditionally()
    expect(wrapper.vm.audioElement.autoplay).toEqual(false);
  })

  it("play the previous track", () => {
    wrapper.vm.setAudioElement({
      autoplay: false,
    });
    wrapper.vm.previous();

    expect(wrapper.vm.audioElement.autoplay).toEqual(true);
  });

  it("play the previous track conditionally", () => {
    wrapper.vm.setAudioElement({
      autoplay: false,
    });
    store.state.track.isNextAndPreviousFinished = true;
    wrapper.vm.previousConditionally()
    expect(wrapper.vm.audioElement.autoplay).toEqual(true);

    wrapper.vm.setAudioElement({
      autoplay: false,
    });
    store.state.track.isNextAndPreviousFinished = false;
    wrapper.vm.previousConditionally()
    expect(wrapper.vm.audioElement.autoplay).toEqual(false);
  })

  it("converts time in seconds to HH:MM:SS", () => {
    var result = wrapper.vm.convertTimeHHMMSS(60);
    expect(result).toEqual("01:00");

    result = wrapper.vm.convertTimeHHMMSS(3600);
    expect(result).toEqual("01:00:00");
  });
});
