import { shallowMount } from "@vue/test-utils";
import userUI from "@/components/UserUI.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

let router = {
  $route: {
    name: "user/:id",
    params: {
      id: "0"
    }
  }
};

describe("Dashboard.vue", () => {
  let wrapper, store;

  beforeEach(() => {
    const vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(userUI, {
      vuetify,
      store,
      mocks: router
    });
  });

  /////////////////////////////////////////////////////////
  /////////////     RENDERING TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  /////////////////////////////////////////////////////////
  /////////////     FUNCTIONS TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("follow function", async () => {
    wrapper.vm.follow();
    await wrapper.vm.$nextTick();
    expect("followArtist").toBeCalled;
  });

  it("unfollow function", async () => {
    wrapper.vm.unfollow();
    await wrapper.vm.$nextTick();
    expect("unfollowArtist").toBeCalled;
  });

  /////////////////////////////////////////////////////////
  //////////////     WATCHERS TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("userID watcher", async () => {
    (router.$route.params.id = "134312234"), await wrapper.vm.$nextTick();
    expect("updateUser").toBeCalled;
  });

  it("updating user info", async () => {
    store.state.userPublicProfile.info = 3;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.user).toBe(3);
  });

  it("updating playlists info", async () => {
    store.state.userPublicProfile.playlists = 100;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.cardItems.items).toBe(100);
  });
});

const storeMock = {
  modules: {
    artist: {
      namespaced: true,
      actions: {
        isFollowingArtists: jest.fn(),
        followArtist: jest.fn(),
        unfollowArtist: jest.fn()
      },
      getters: {
        isFollowed: jest.fn()
      }
    },
    userPublicProfile: {
      namespaced: true,
      state: {
        info: null,
        playlists: null
      },
      actions: {
        getUserInfo: jest.fn(),
        getPublicPlaylists: jest.fn()
      },
      getters: {
        allInfo: jest.fn(state => state.info),
        allPublicPlaylists: jest.fn(state => state.playlists)
      }
    }
  }
};
