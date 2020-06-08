import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";
import queue from "@/views/TheQueue.vue";

describe("TheSoundGrapher", () => {
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
            curTrkName: "changes",
            curTrkArtistName: "2pac",
            curTrkId: "123",
            queueNextTracks: undefined,
            trackTotalDurationMs: 1200,
            albumName: "2pac",
            isCurTrkReady: true
          },
          mutations: {
            setIsQueueOpened: () => {}
          }
        }
      }
    });

    wrapper = shallowMount(queue, {
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

  it("destroy the component", () => {
    wrapper.destroy();
  });
});
