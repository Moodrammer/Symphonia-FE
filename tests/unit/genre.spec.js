import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import genre from "@/components/general/Genre.vue";
import cardGrid from "@/components/general/CardGrid.vue";

describe("Genre Component", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    Vue.use(VueRouter);

    //Mocking the store
    store = new Vuex.Store({
      modules: {
        category: {
          namespaced: true,
          state: {
            singleCategory: {
              categoryName: "",
              categoryID: "",
              showSeeAll: true,
              list: {
                menuList: [
                  { title: "Start Radio" },
                  { title: "Save to Your Library" },
                  { title: "Copy Playlist Link" }
                ],
                showMenu: false,
                hoveredCardIndex: null,
                //items:the playlists to be shown
                items: []
              }
            }
          },

          actions: {
            getGenrePlaylists: jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(genre, {
      router,
      vuetify,
      store
    });
  });

  it("Has Card Grid", () => {
    expect(wrapper.contains(cardGrid)).toBe(true);
  });

});
