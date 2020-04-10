import { shallowMount ,RouterLinkStub} from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from 'vuex'

import PlaylistView from "@/components/general/PlaylistView.vue";

describe("Playlist View", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        track: {
          namespaced: true,
          
          state: {

          },

          actions: {
            playSongStore: jest.fn(),
            followPlaylist: jest.fn(),
            unfollowPlaylist: jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(PlaylistView, {
      vuetify,
      store,
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

});
