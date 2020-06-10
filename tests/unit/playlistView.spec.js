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
  let trackActions;
  let trackMutations;
  let playlistActions;
  let playlistMutations;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);

    trackActions = {
      playTrackInQueue: jest.fn(),
      updateQueue: jest.fn(),
      getTrackInformation: jest.fn(),
      togglePauseAndPlay: jest.fn()
    };

    trackMutations = {
      setContextData: jest.fn(),
      setIsTrackPaused: jest.fn()
    };

    playlistActions = {
      followPlaylist: jest.fn(),
      unfollowPlaylist: jest.fn(),
      checkFollowed: jest.fn(),
      getPlaylist: jest.fn(),
      getPlaylistTracks: jest.fn()
    };

    playlistMutations = {
      changeAdsPopup: jest.fn(),
      changeUpdatePlaylistTracks: jest.fn()
    };
    //Mocking the store
    store = new Vuex.Store({
      modules: {
        track: {
          namespaced: true,
          state: {
            contextId: "1",
            isTrackPaused: true
          },
          mutations: trackMutations,
          actions: trackActions
        },
        playlist: {
          namespaced: true,
          state: {
            nonPremiumTrackID: 0,
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
                album: { _id: "5e8b6d866253cb184eaac150", name: "New Album" },
                premium: false
              }
            ],
            isFollowed: false,
            updateTracksFlag: false
          },
          mutations: playlistMutations,
          actions: playlistActions
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
    expect(playlistActions.getPlaylist).toHaveBeenCalled();
  });

  it("Gets the playlist's tracks", () => {
    expect(playlistActions.getPlaylistTracks).toHaveBeenCalled();
  });

  it("Check if the user's follow this playlist", () => {
    expect(playlistActions.checkFollowed).toHaveBeenCalled();
  });
  //---------------------------------------------------
  //       Test user functionalities
  //---------------------------------------------------
  it("Set menu data", () => {
    wrapper.vm.$emit("contextmenu.prevent");
    expect(wrapper.vm.menuClick()).toHaveBeenCalled;
  });

  it("Play a playlist", () => {
    const btn = wrapper.find("#playBtn");
    btn.vm.$emit("click");
    expect(wrapper.vm.play()).toHaveBeenCalled;
  });

  it("Follow a playlist", () => {
    wrapper.vm.followPlaylist();
    expect(playlistActions.followPlaylist).toHaveBeenCalled();
  });

  it("Unfollow a playlist", () => {
    wrapper.vm.unfollowPlaylist();
    expect(playlistActions.unfollowPlaylist).toHaveBeenCalled();
  });

  it("Update Saved tracks", () => {
    wrapper.vm.$options.watch.updatePlaylistTracks.call(wrapper.vm);
    store.state.playlist.updateTracksFlag = true;
    expect(wrapper.vm.getPlaylistData()).toBeCalled;
    expect(wrapper.vm.getPlaylistTracks()).toBeCalled;
  });

  it("Update content after routing", () => {
    wrapper.vm.$options.watch.playlistID.call(wrapper.vm);
    expect(playlistActions.getPlaylist).toHaveBeenCalled();
    expect(playlistActions.getPlaylistTracks).toHaveBeenCalled();
    expect(playlistActions.checkFollowed).toHaveBeenCalled();
  });

  it("Open ads popup after route changing", () => {
    Storage.prototype.getItem = jest.fn(() => "token");
    wrapper.vm.$options.watch.playlistID.call(wrapper.vm);
    expect(playlistMutations.changeAdsPopup).toHaveBeenCalled();
    expect(wrapper.vm.isLoggedIn()).toBe(true);
  });

  it("Open ads popup if the user logged in", () => {
    Storage.prototype.getItem = jest.fn(() => "token");
    expect(playlistMutations.changeAdsPopup).toHaveBeenCalled();
  });

  it("Play the playlist", () => {
    wrapper.vm.id = "1";
    wrapper.vm.play();
    expect(trackActions.togglePauseAndPlay).toHaveBeenCalled();
  });

  it("Pause the currently playing playlist", () => {
    wrapper.vm.pause();
    expect(trackActions.togglePauseAndPlay).toHaveBeenCalled();
    expect(trackMutations.setIsTrackPaused).toHaveBeenCalled();
  });

  it("Contains preimum tracks only", () => {
    store.state.playlist.nonPremiumTrackID = null;
    wrapper.vm.play();
    expect(trackMutations.setIsTrackPaused).not.toBeCalled();
  });
});
