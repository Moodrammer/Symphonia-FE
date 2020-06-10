import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { VueContext } from "vue-context";

import WebplayerHome from "@/views/WebPlayerHome.vue";
import VueRouter from "vue-router";
import NavBar from "@/components/WebplayerLayout/WebNavBar.vue";
import NavDrawer from "@/components/WebplayerLayout/WebNavDrawer.vue";

describe("Webplayer Home", () => {
  let wrapper;
  let vuetify;
  let store;
  let notifyActions;
  let categoryMutations;
  let playlistActions;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    Vue.use(VueContext);

    const $forceUpdate = jest.fn();
    const contextID = jest.fn();

    notifyActions = {
      getRegistrationToken: jest.fn(),
      setRecieveNotificationHandler: jest.fn(),
      setRefreshTokenHandler: jest.fn()
    };

    playlistActions = {
      getPlaylists: jest.fn()
    };
    categoryMutations = {
      changeLogoutUpdate: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        notification: {
          namespaced: true,
          actions: notifyActions
        },
        webplayerHome: {
          namespaced: true,
          state: {
            logoutPopUpState: false
          },
          mutations: {}
        },
        playlist: {
          namespaced: true,
          state: {
            deletePlaylist: false,
            createPlaylist: false,
            addTrack: false
          },
          actions: playlistActions
        },
        category: {
          namespaced: true,
          state: {
            logoutUpdate: false
          },
          mutations: categoryMutations
        }
      }
    });
    wrapper = shallowMount(WebplayerHome, {
      store,
      router,
      vuetify,
      $forceUpdate,
      contextID,
      propsData: {
        contextMenu: { event: "event", type: "type", id: "1234" }
      },
      methods: {
        isLoggedIn() {
          return true;
        },
        isNotificationsAllowed() {
          return true;
        }
      }
    });
  });

  //--------------------------------------------------
  //              Test Rendering
  //--------------------------------------------------
  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Has Navagation Bar", () => {
    expect(wrapper.contains(NavBar)).toBe(true);
  });

  it("Has Navagation Drawer", () => {
    expect(wrapper.contains(NavDrawer)).toBe(true);
  });
  //--------------------------------------------------
  //          Test computed properties
  //--------------------------------------------------
  it("Get delete model state", () => {
    expect(wrapper.vm.deletePlaylist).toBe(false);
  });

  it("Get create model state", () => {
    expect(wrapper.vm.createPlaylist).toBe(false);
  });

  it("Get add track model state", () => {
    expect(wrapper.vm.addTrack).toBe(false);
  });

  it("Update after logout", async () => {
    wrapper.vm.$options.watch.isLogoutUpdate.call(wrapper.vm);
    store.state.category.logoutUpdate = true;
    await wrapper.vm.nextTick();
    expect(categoryMutations.changeLogoutUpdate).toHaveBeenCalled();
  });

  it("intializes notification handlers on creation if user is logged in and allowing notifications", () => {
    expect(notifyActions.getRegistrationToken).toBeCalled();
    expect(notifyActions.setRecieveNotificationHandler).toBeCalled();
    expect(notifyActions.setRefreshTokenHandler).toBeCalled();
  });

  it("doesn't initialize notification handlers incase the user is logged out", () => {
    notifyActions = {
      getRegistrationToken: jest.fn(),
      setRecieveNotificationHandler: jest.fn(),
      setRefreshTokenHandler: jest.fn()
    };
    const router = new VueRouter();
    const $forceUpdate = jest.fn();
    const contextID = jest.fn();
    wrapper = shallowMount(WebplayerHome, {
      store,
      router,
      vuetify,
      $forceUpdate,
      contextID,
      propsData: {
        contextMenu: { event: "event", type: "type", id: "1234" }
      },
      methods: {
        isLoggedIn() {
          return false;
        },
        isNotificationsAllowed() {
          return false;
        }
      }
    });
    expect(notifyActions.getRegistrationToken).not.toBeCalled();
    expect(notifyActions.setRecieveNotificationHandler).not.toBeCalled();
    expect(notifyActions.setRefreshTokenHandler).not.toBeCalled();
  });

  it("doesn't initialize notification handlers incase the user is logged in but disabling notifications", () => {
    notifyActions = {
      getRegistrationToken: jest.fn(),
      setRecieveNotificationHandler: jest.fn(),
      setRefreshTokenHandler: jest.fn()
    };
    const router = new VueRouter();
    const $forceUpdate = jest.fn();
    const contextID = jest.fn();
    wrapper = shallowMount(WebplayerHome, {
      store,
      router,
      vuetify,
      $forceUpdate,
      contextID,
      propsData: {
        contextMenu: { event: "event", type: "type", id: "1234" }
      },
      methods: {
        isLoggedIn() {
          return true;
        },
        isNotificationsAllowed() {
          return false;
        }
      }
    });
    expect(notifyActions.getRegistrationToken).not.toBeCalled();
    expect(notifyActions.setRecieveNotificationHandler).not.toBeCalled();
    expect(notifyActions.setRefreshTokenHandler).not.toBeCalled();
  });

  // it("Watch the context menu id", async () => {
  //   wrapper.setData({ contextMenu: { id: "124" } });
  //   wrapper.vm.$options.watch.contextID.call(wrapper.vm);
  //   expect(wrapper.vm.contextMenu.id).toBe(null);
  // });
});
