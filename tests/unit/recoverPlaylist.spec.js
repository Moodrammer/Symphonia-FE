//Importing plugins and helpers
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
//Importing the component to be tested
import RecoverPlaylist from "@/components/User Settings/RecoverPlaylist.vue";

describe("RecoverPlaylist", () => {
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
      deletedPlaylist: jest.fn(() => {
        if (mockState == "fail") {
          wrapper.vm.playlistNoRecover = true;
          wrapper.vm.playlistsRecover  =false;
          return Promise.reject();
        } else return Promise.resolve();
      }),
      restorePlaylist: jest.fn(() => {
        if (mockState === "error") {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      })
    };
    state = {
      user: {
        deletedPlaylists: [
          {
            deleted: true,
            deletedAt: "2020-12-12",
            title: "Your Playlist",
            tracks: [{}, {}, {}],
            id: "123456"
          }
        ]
      }
    };
    store = new Vuex.Store({
      state,
      actions
    });
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = shallowMount(RecoverPlaylist, {
      router,
      vuetify,
      store,
      data() {
        return {
          playlists: [{
            deleted: true,
            date: "2020-12-12",
            title: "Your Playlist",
            songs: 3,
            id: "123456",
            restored : false
          }],
          NoPlaylists: true,
          PlaylistNoRecover: false,
          PlaylistsRecover: false
        };
      }
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
it("check if the deleted list is empty display error",()=>{
    store.state.user.deletedPlaylists=[];
    mockState="fail";
    store.dispatch("deletedPlaylist");
    wrapper.vm.$nextTick();
    expect(wrapper.vm.playlistNoRecover).toBe(true);
  });
  it("find if restore is working or not ",()=>{
    let btn =wrapper.find("button");
    btn.trigger('click');
    expect(wrapper.vm.restore).toBeCalled;
  });
});
describe("RecoverPlaylist", () => {
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
      deletedPlaylist: jest.fn(() => {
        if (mockState == "fail") {
          return Promise.reject();
        } else return Promise.resolve();
      }),
      restorePlaylist: jest.fn(() => {
        if (mockState === "error") {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      })
    };
    state = {
      user: {
        deletedPlaylists: []
      }
    };
    store = new Vuex.Store({
      state,
      actions
    });
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = shallowMount(RecoverPlaylist, {
      router,
      vuetify,
      store,
      data() {
        return {
          playlists: [],
          NoPlaylists: true,
          PlaylistNoRecover: false,
          PlaylistsRecover: false
        };
      }
    });
  });
  it("check if the deleted list is empty display error from store",()=>{
    store.dispatch("deletedPlaylist");
    wrapper.vm.$nextTick();
    expect(wrapper.vm.playlistNoRecover).toBe(true);
  });
});
