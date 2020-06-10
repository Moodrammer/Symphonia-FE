import { mount } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import ContextMenu from "@/components/general/ContextMenu.vue";

describe("Context Menu", () => {
  let wrapper;
  let vuetify;
  let store;
  let $route;
  let artistActions;
  let trackActions;
  let trackMutations;
  let playlistActions;
  let playlistMutations;
  let albumActions;
  let webplayerHomeMutations;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    global.document.execCommand = function execCommandMock() {};
    const document = {
      createElement(name) {
        return name;
      }
    };
    $route = {
      name: "playlist/:id",
      params: {
        id: ""
      }
    };

    artistActions = {
      isFollowingArtists: jest.fn(),
      followArtist: jest.fn(),
      unfollowArtist: jest.fn()
    };

    trackActions = {
      followAlbum: jest.fn(),
      checkSaved: jest.fn(),
      saveTrack: jest.fn(),
      removeSavedTrack: jest.fn()
    };

    trackMutations = {
      changeUpdateTracks: jest.fn()
    };

    playlistActions = {
      changeDetails: jest.fn(),
      followPlaylist: jest.fn(),
      unfollowPlaylist: jest.fn(),
      removePlaylistTrack: jest.fn(),
      getPlaylist: jest.fn(),
      checkFollowed: jest.fn()
    };

    playlistMutations = {
      setPlaylistID: jest.fn(),
      changeDeleteModel: jest.fn(),
      changeAddTrackModel: jest.fn(),
      setAddedTracks: jest.fn()
    };

    albumActions = {
      followAlbum: jest.fn(),
      unfollowAlbum: jest.fn(),
      checkFollowed: jest.fn(),
      getAlbum: jest.fn()
    };

    webplayerHomeMutations = {
      toggleLogoutPopUpState: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        webplayerHome: {
          namespaced: true,
          mutations: webplayerHomeMutations
        },
        playlist: {
          namespaced: true,
          state: {
            singlePlaylist: {
              name: "QuranPlaylist1",
              owner: { _id: "1", name: "Bob" }
            },
            menuPlaylist: {
              active: true,
              description: "playlist A",
              images: ["http://source.unsplash.com/PsEXbDsSlV4"],
              name: "QuranPlaylist1",
              owner: { _id: "1", name: "Bob" },
              public: true,
              tracksCount: "2",
              tracks: ["2", "3"]
            },
            isFollowed: false,
            updateTracksFlag: false
          },
          mutations: playlistMutations,
          actions: playlistActions
        },
        album: {
          namespaced: true,

          state: {
            singleAlbum: {
              liked: true,
              tracksCount: "3",
              tracks: ["4", "6", "2"],
              releaseDate: "2020-04-07T16:49:46.442Z",
              _id: "1",
              id: "1",
              name: "Album 3",
              year: 2020,
              image: "http://source.unsplash.com/eSYCRwJEzO8",
              artist: {
                name: "Nasser Al-Qatami",
                _id: "2"
              }
            },
            isFollowdAlbum: false
          },
          actions: albumActions
        },
        track: {
          namespaced: true,

          state: {
            generalLiked: true
          },
          mutations: trackMutations,
          actions: trackActions
        },
        artist: {
          namespaced: true,
          state: {
            FollowingArtistsBool: [false]
          },
          actions: artistActions
        }
      }
    });
    wrapper = mount(ContextMenu, {
      vuetify,
      store,
      document,
      mocks: {
        $route
      }
    });
  });

  //--------------------------------------------------------
  //                     Rendering
  //--------------------------------------------------------
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  //--------------------------------------------------------
  //        Check the functions behaviour "Playlist"
  //--------------------------------------------------------
  it("Gets the playlist's data", () => {
    wrapper.vm.type = "playlist";
    wrapper.vm.openMenu("", "1", "playlist");
    expect(wrapper.vm.playlist()).toHaveBeenCalled;
    expect(playlistActions.getPlaylist).toHaveBeenCalled();
  });

  it("Check if the user follow a playlist", () => {
    wrapper.vm.playlist();
    store.state.playlist.isFollowed = true;
    store.state.playlist.menuPlaylist.public = true;
    expect(wrapper.vm.isPlaylistSaved).toBe(true);
    expect(wrapper.vm.isPublicPlaylist).toBe(true);
  });

  it("Check if it is a user's playlist", () => {
    store.state.playlist.menuPlaylist.public = false;
    store.state.playlist.menuPlaylist.owner._id = null;
    wrapper.vm.playlist();
    expect(wrapper.vm.isOwnedPlaylist).toBe(true);
  });

  it("Check if the user's playlist is pubic", () => {
    Storage.prototype.getItem = jest.fn(() => "id");
    store.state.playlist.menuPlaylist.public = true;
    store.state.playlist.menuPlaylist.owner._id = "id";
    wrapper.vm.playlist();
    expect(wrapper.vm.isOwnedPlaylist).toBe(true);
    expect(wrapper.vm.isPublicPlaylist).toBe(true);
  });

  it("Follow a playlist", () => {
    wrapper.vm.followPlaylist();
    expect(playlistActions.followPlaylist).toHaveBeenCalled();
  });

  it("Unfollow a playlist", async () => {
    await wrapper.vm.unfollowPlaylist();
    expect(playlistActions.unfollowPlaylist).toHaveBeenCalled();
  });

  it("Delete a user's playlist", () => {
    wrapper.vm.deleteUserPlaylist();
    expect(playlistMutations.setPlaylistID).toHaveBeenCalled();
    expect(playlistMutations.changeDeleteModel).toHaveBeenCalled();
  });

  it("Make a user's playlist public", () => {
    wrapper.vm.makePlaylistPublic();
    expect(playlistActions.changeDetails).toHaveBeenCalled();
  });

  it("Make a user's playlist secret", () => {
    wrapper.vm.makePlaylistSecret();
    expect(playlistActions.changeDetails).toHaveBeenCalled();
  });

  it("Call function at clicking on Make secret", () => {
    wrapper.vm.playlistAction("Make secret");
    expect(wrapper.vm.makePlaylistSecret()).toHaveBeenCalled;
  });

  it("Call function at clicking on Make public", () => {
    wrapper.vm.playlistAction("Make public");
    expect(wrapper.vm.makePlaylistPublic()).toHaveBeenCalled;
  });

  it("Call function at clicking on Delete", () => {
    wrapper.vm.playlistAction("Delete");
    expect(wrapper.vm.deleteUserPlaylist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Save to Your Library", () => {
    wrapper.vm.playlistAction("Save to Your Library");
    expect(wrapper.vm.followPlaylist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Remove from your Library", () => {
    wrapper.vm.playlistAction("Remove from your Library");
    expect(wrapper.vm.unfollowPlaylist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Copy Playlist Link", () => {
    wrapper.vm.playlistAction("Copy Playlist Link");
    expect(wrapper.vm.copyToClipboard()).toHaveBeenCalled;
  });
  //--------------------------------------------------------
  //        Check the functions behaviour "Album"
  //--------------------------------------------------------
  it("Gets the album's data", () => {
    wrapper.vm.openMenu("", "3", "album");
    expect(wrapper.vm.album()).toHaveBeenCalled;
    expect(albumActions.checkFollowed).toHaveBeenCalled();
  });

  it("Check if the user follows this album", () => {
    wrapper.vm.album();
    store.state.album.isFollowdAlbum = true;
    expect(wrapper.vm.isAlbumSaved).toBe(true);
  });

  it("Add album's tracks to specific playlist", async () => {
    Storage.prototype.getItem = jest.fn(() => "token");
    await wrapper.vm.addAlbumTracksToPlaylist();
    expect(albumActions.getAlbum).toHaveBeenCalled();
    expect(playlistMutations.setAddedTracks).toHaveBeenCalled();
    expect(playlistMutations.changeAddTrackModel).toHaveBeenCalled();
  });

  it("Add album's tracks to specific playlist logout", async () => {
    Storage.prototype.getItem = jest.fn(() => null);
    await wrapper.vm.addAlbumTracksToPlaylist();
    expect(webplayerHomeMutations.toggleLogoutPopUpState).toHaveBeenCalled();
  });

  it("Follow an album", () => {
    wrapper.vm.followAlbum();
    expect(albumActions.followAlbum).toHaveBeenCalled();
  });

  it("Unfollow an album", async () => {
    await wrapper.vm.unfollowAlbum();
    expect(albumActions.unfollowAlbum).toHaveBeenCalled();
  });

  it("Call function at clicking on Save to Your Library", () => {
    wrapper.vm.albumAction("Save to Your Library");
    expect(wrapper.vm.followAlbum()).toHaveBeenCalled;
  });

  it("Call function at clicking on Remove from your Library", () => {
    wrapper.vm.albumAction("Remove from your Library");
    expect(wrapper.vm.unfollowAlbum()).toHaveBeenCalled;
  });

  it("Call function at clicking on Add to Playlist", () => {
    wrapper.vm.albumAction("Add to Playlist");
    expect(wrapper.vm.addAlbumTracksToPlaylist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Copy Album Link", () => {
    wrapper.vm.albumAction("Copy Album Link");
    expect(wrapper.vm.copyToClipboard()).toHaveBeenCalled;
  });
  //--------------------------------------------------------
  //        Check the functions behaviour "Track"
  //--------------------------------------------------------
  it("Gets the track's data", async () => {
    wrapper.vm.openMenu("", "2", "track");
    expect(await wrapper.vm.track()).toHaveBeenCalled;
    expect(trackActions.checkSaved).toHaveBeenCalled();
  });

  it("Check if the user saves this track", () => {
    wrapper.vm.track();
    store.state.track.generalLiked = false;
    expect(wrapper.vm.isTrackSaved).toBe(false);
  });

  it("Save track for user", () => {
    wrapper.vm.saveTrack();
    expect(trackActions.saveTrack).toHaveBeenCalled();
  });

  it("Remove track from user's saved tracks", async () => {
    await wrapper.vm.removeTrackForUser();
    expect(trackActions.removeSavedTrack).toHaveBeenCalled();
    expect("changeUpdateTracks").toHaveBeenCalled;
  });

  it("Add track to a specific playlist", () => {
    Storage.prototype.getItem = jest.fn(() => "token");
    wrapper.vm.addToPlaylist();
    expect(playlistMutations.setAddedTracks).toHaveBeenCalled();
    expect(playlistMutations.changeAddTrackModel).toHaveBeenCalled();
  });

  it("Add track to a specific playlist logout", () => {
    Storage.prototype.getItem = jest.fn(() => null);
    wrapper.vm.addToPlaylist();
    expect(webplayerHomeMutations.toggleLogoutPopUpState).toHaveBeenCalled();
  });

  it("Remove track from a specific playlist", async () => {
    await wrapper.vm.removeTrackFromPlaylist();
    expect(playlistActions.removePlaylistTrack).toHaveBeenCalled();
  });

  it("Call save tracks at clicking on Save to your Liked Songs", () => {
    wrapper.vm.action = "Save to your Liked Songs";
    wrapper.vm.trackAction();
    expect(wrapper.vm.saveTrack()).toHaveBeenCalled;
  });

  it("Call save tracks at clicking on Save to your Liked Songs", () => {
    wrapper.vm.trackAction("Save to your Liked Songs");
    expect(wrapper.vm.saveTrack()).toHaveBeenCalled;
  });

  it("Call function at clicking on Remove from your Liked Songs", () => {
    wrapper.vm.trackAction("Remove from your Liked Songs");
    expect(wrapper.vm.removeTrackForUser()).toHaveBeenCalled;
  });

  it("Call function at clicking on Add to Playlist", () => {
    wrapper.vm.trackAction("Add to Playlist");
    expect(wrapper.vm.addToPlaylist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Remove from this Playlist", () => {
    wrapper.vm.trackAction("Remove from this Playlist");
    expect(wrapper.vm.removeTrackFromPlaylist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Copy Song Link", () => {
    wrapper.vm.trackAction("Copy Song Link");
    expect(wrapper.vm.copyToClipboard()).toHaveBeenCalled;
  });

  it("Update the menu if track", () => {
    wrapper.vm.track();
    expect(wrapper.vm.trackMenu).toEqual([]);
  });

  //--------------------------------------------------------
  //        Check the functions behaviour "Artist"
  //--------------------------------------------------------
  it("Set artist menu", () => {
    wrapper.vm.openMenu("", "1", "artist");
    expect(wrapper.vm.artist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Copy Artist Link", () => {
    wrapper.vm.artistAction("Copy Artist Link");
    expect(wrapper.vm.copyToClipboard()).toHaveBeenCalled;
  });

  it("Check if user follows the artist", async () => {
    store.state.artist.FollowingArtistsBool = [true];
    wrapper.vm.artist();
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.isFollowedArtist).toBe(true);
    });
  });

  //--------------------------------------------------------
  //        Test on click function
  //--------------------------------------------------------
  it("Call Artist Action", () => {
    wrapper.vm.type = "artist";

    wrapper.vm.onClick("Copy Artist Link");
    expect(wrapper.vm.artistAction("Copy Artist Link")).toHaveBeenCalled;

    wrapper.vm.onClick("Follow");
    expect(wrapper.vm.artistAction("Follow")).toHaveBeenCalled;

    wrapper.vm.onClick("Unfollow");
    expect(wrapper.vm.artistAction("Unfollow")).toHaveBeenCalled;
  });

  it("Call Playlist Action", () => {
    wrapper.vm.type = "playlist";
    wrapper.vm.onClick("Delete");
    expect(wrapper.vm.playlistAction("Delete")).toHaveBeenCalled;
  });

  it("Call Album Action", () => {
    wrapper.vm.type = "album";
    wrapper.vm.onClick("Add to Playlist");
    expect(wrapper.vm.albumAction("Add to Playlist")).toHaveBeenCalled;
  });

  it("Call Track Action", () => {
    wrapper.vm.type = "track";
    wrapper.vm.onClick("Copy Song Link");
    expect(wrapper.vm.trackAction("Copy Song Link")).toHaveBeenCalled;
  });
  //------------------------------------------------------
  //             Copy to clipboard
  //------------------------------------------------------
  it("Call copy", () => {
    wrapper.vm.copyToClipboard("Link");
    expect(document.createElement("textarea")).toBeCalled;
  });

  it("At playlist View", () => {
    if (!process || process.env.NODE_ENV !== "test") {
      Vue.use(VueRouter);
    }
    expect(wrapper.vm.$route.name).toBe("playlist/:id");
    $route.name = "album/:id";
    wrapper.vm.track();
    expect(wrapper.vm.inUserPlaylist).toBe(false);
  });

  it("At User playlist View", () => {
    if (!process || process.env.NODE_ENV !== "test") {
      Vue.use(VueRouter);
    }
    Storage.prototype.getItem = jest.fn(() => "id");
    store.state.playlist.singlePlaylist.owner._id = "id";
    wrapper.vm.track();
    expect(wrapper.vm.inUserPlaylist).toBe(true);
  });
});
