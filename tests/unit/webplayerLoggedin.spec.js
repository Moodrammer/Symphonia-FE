import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import loggedIn from "@/components/WebplayerContent/HomeContentLogin.vue";

describe("Webplayer Home - user logged in", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        category: {
          namespaced: true,
          state: {
            categories: []
          },
          actions: {
            loadGenres: jest.fn(),
            recentlyPlayedSection:jest.fn(),
            getNewReleases:jest.fn(),
            yourPlaylistsSection:jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(loggedIn, {
      vuetify,
      store
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
});
