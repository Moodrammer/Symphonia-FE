import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";

//import the required componets
import PlaylistView from "@/components/general/PlaylistView.vue";
import Song from "@/components/general/SongItem.vue";

describe("Playlist View", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);

    //Mocking the store
    store = new Vuex.Store({
      modules: {
        playlist: {
          namespaced: true,

          state: {
            singlePlaylist: {
              tracksCount: 1,
              owner: { _id: "5e8b6d866253cb184eaac150", name: "User" },
              images: [
                "https://zasymphonia.ddns.net/api/v1/images/playlists/playlist9.jpg"
              ],
              tracks: ["5e8a39f24e11cd46c8bde654"],
              _id: "5e875bd6ba6ebe663fdbb2c0",
              name: "Songs for Coping with Loss",
              description:
                "Songs for Coping with the Loss of My Debit Card, My Mailbox Key, and My Bike, Which I Tipsily Locked up Somewhere Two Weeks Ago",
              id: "5e875bd6ba6ebe663fdbb2c0"
            },
            playlistTracks: [
              {
                name: "Sulk",
                durationMs: 30000,
                _id: "5e8a39f24e11cd46c8bde654",
                artist: { _id: "5e8b6d866253cb184eaac150", name: "Symphonia" },
                album: { _id: "5e8b6d866253cb184eaac150", name: "New Album" }
              }
            ],
            isFollowed: false
          },
          mutations: {
            changeAdsPopup: jest.fn()
          },
          actions: {
            followPlaylist: jest.fn(),
            unfollowPlaylist: jest.fn(),
            checkFollowed: jest.fn(),
            getPlaylist: jest.fn(),
            getPlaylistTracks: jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(PlaylistView, {
      vuetify,
      store,
      router,
      stubs: {
        RouterLink: RouterLinkStub
      },
      propsData: {
        contextMenu: {
          event: "event",
          type: "type",
          id: "1234"
        }
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

  //--------------------------------------------------------
  //        Check the existance of the components
  //--------------------------------------------------------
  it("Contains Play Button", () => {
    const btn = wrapper.find("#playBtn");
    expect(btn.text() == "Play").toBe(true);
  });

  it("Contains Playlist's Image", () => {
    const img = wrapper.find("#playPhoto");
    expect(img.exists()).toBe(true);
  });

  it("Contains Song component", () => {
    expect(wrapper.contains(Song)).toBe(true);
  });

  //--------------------------------------------------
  //         Testing created hook cycle actions
  //--------------------------------------------------
  it("Gets the playlist's data", () => {
    expect("getPlaylist").toHaveBeenCalled;
  });

  it("Gets the playlist's tracks", () => {
    expect("getPlaylistTracks").toHaveBeenCalled;
  });

  it("Check if the user's follow this playlist", () => {
    expect("checkFollowed").toHaveBeenCalled;
  });
  //---------------------------------------------------
  //       Test user functionalities
  //---------------------------------------------------
  it("Set menu data", () => {
    wrapper.vm.$emit("contextmenu.prevent");
    expect(wrapper.vm.menuClick()).toHaveBeenCalled;
  });

  it("Play a playlist",() =>{
    const btn = wrapper.find("#playBtn");
    btn.vm.$emit("click");
    expect(wrapper.vm.play()).toHaveBeenCalled;
  });

  it("Follow a playlist",() =>{
    wrapper.vm.followPlaylist();
    expect("followPlaylist").toHaveBeenCalled;
  });

  it("Unfollow a playlist",() =>{
    wrapper.vm.unfollowPlaylist();
    expect("unfollowPlaylist").toHaveBeenCalled;
  });
});
