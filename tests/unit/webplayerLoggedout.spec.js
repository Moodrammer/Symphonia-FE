import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from 'vuex'

import loggedOut from "@/components/WebplayerContent/HomeContentLogout.vue";

describe("ًWebplayer Home- user logged out", () => {
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
            categories:[]
          },
          getters: {
            categoriesGetter: state => {
              return state.categories;
            }
          },
          actions: {
            loadGenres: jest.fn()
          }
        }
       }
    });

    wrapper = shallowMount(loggedOut, {
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
