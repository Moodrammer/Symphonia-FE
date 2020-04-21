import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import WebNavDrawer from "@/components/WebplayerLayout/WebNavDrawer.vue";

describe("Webplayer Navigation Drawer", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    //Mocking the store
    store = new Vuex.Store({
      modules: {
        playlist: {
          namespaced: true,

          state: {
            likedPlaylists: [
              {
                collaborative: false,
                images: [
                  "https://zasymphonia.ddns.net/api/v1/images/playlists/playlist9.jpg"
                ],
                public: true,
                tracks: ["5e8a39f24e11cd46c8bde654"],
                followers: [],
                _id: "5e875bd6ba6ebe663fdbb2c0",
                name: "Songs for Coping with Loss",
                owner: "5e812db054660672fd699881",
                description:
                  "Songs for Coping with the Loss of My Debit Card, My Mailbox Key, and My Bike, Which I Tipsily Locked up Somewhere Two Weeks Ago",
                category: "5e883e48c808fd1aa40ad1f8",
                id: "5e875bd6ba6ebe663fdbb2c0"
              }
            ]
          },

          actions: {
            getPlaylists: jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(WebNavDrawer, {
      vuetify,
      store,
      stubs: {
        RouterLink: RouterLinkStub
      }
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

  //--------------------------------------------------
  //         Testing created hook cycle actions
  //--------------------------------------------------
  it("Get user's saved playlists", () => {
    expect("getPlaylists").toHaveBeenCalled;
  });
});
