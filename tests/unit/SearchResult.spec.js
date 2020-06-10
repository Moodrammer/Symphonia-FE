//Importing plugins and helpers
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
//Importing the component to be tested
import SearchResult from "@/components/Search/SearchResult.vue";
import CardGrid from "@/components/general/CardGrid.vue";
import SongItem from "@/components/general/SongItem.vue";

describe("SearchResult", () => {
  let wrapper;
  let vuetify;
  let store;
  let actions;
  let state;
  let mockState = "";
  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    actions = {
      searchFor: jest.fn(() => {
        if (mockState == "fail")
          return Promise.reject({
            status: "fail"
          });
        else return Promise.resolve();
      })
    };
    state = {
      albums: [],
      category: [],
      playlist: [],
      artists: [],
      profiles: [],
      tracks: []
    };
    store = new Vuex.Store({
      modules: {
        search: {
          state,
          actions
        }
      }
    });
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = shallowMount(SearchResult, {
      router,
      vuetify,
      store,
      props: {
        contextMenu: {}
      },
      components: {
        CardGrid,
        SongItem
      },
      beforeUpdate: jest.fn(),
      computed: {}
    });
  });
  //rendering tests
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
  //check if it is a vue instance
  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  it("check the computed functions", () => {
    expect(wrapper.vm.albums).toHaveBeenCalled;
    let checker = wrapper.vm.albums;
    expect(checker).toBe({items:[]});
  });
});
