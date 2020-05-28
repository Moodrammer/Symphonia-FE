import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";
import soundplayerGrapher from "@/components/TheSoundplayer/TheSoundGrapher.vue";

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
            audioElement: undefined,
            audioContext: {
              createMediaElementSource: audioElement => {
                return {
                  connect: connection => {}
                };
              },
              createAnalyser: () => {
                return {
                  frequencyBinCount: 12,
                  connect: connection => {},
                  getByteTimeDomainData: () => {}
                };
              },
              createScriptProcessor: (
                bufferSize,
                numberOfInputChannels,
                numberOfOutputChannels
              ) => {
                return {
                  connect: connection => {}
                };
              }
            }
          },
          mutations: {
            initAudioContext: jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(soundplayerGrapher, {
      vuetify,
      store,
      router,
      getContextStub: jest
        .spyOn(window.HTMLCanvasElement.prototype, "getContext")
        .mockImplementation(() => {})
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  //check if it is a vue instance
  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("draw Time Domain function", () => {
    wrapper.vm.ctx = {
      fillStyle: undefined,
      fillRect: () => {}
    };
    wrapper.vm.drawTimeDomain();

    wrapper.vm.isXs = () => {
      return true;
    };
    wrapper.vm.drawTimeDomain();
  });

  it("handle OnAudioProcess event", () => {
    wrapper.vm._handleOnAudioProcess();
    expect(window.requestAnimFrame()).toBeCalled;

    window.requestAnimationFrame = false;
    window.webkitRequestAnimationFrame = false;
    window.mozRequestAnimationFrame = false;
    wrapper.vm.init();

    wrapper.vm._handleOnAudioProcess();
    expect(window.requestAnimFrame()).toBeCalled;
  });
});
