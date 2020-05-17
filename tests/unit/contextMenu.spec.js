import { mount } from "@vue/test-utils";
import VueRouter from 'vue-router'
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import ContextMenu from "@/components/general/ContextMenu.vue";

describe("Context Menu", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    global.document.execCommand = function execCommandMock() { };
    const document = {
      createElement(name) {
        return name;
      }
    };
    const $route= {
      name: 'playlist/:id'
    };
    store = new Vuex.Store({
      modules: {
        playlist: {
          namespaced: true,

          state: {
            menuPlaylist:{
              active: true,
              description: "playlist A",
              images: [
                  "http://source.unsplash.com/PsEXbDsSlV4"
              ],
              name: "QuranPlaylist1",
              owner: {"_id":"1","name":"Bob"},
              public: true,
              tracksCount: "2",
              tracks: ["2","3"]
            },
            isFollowed: false,
            updateTracksFlag: false
      },
      mutations:{
        setPlaylistID:jest.fn(),
        changeDeleteModel:jest.fn(),
        changeAddTrackModel:jest.fn(),
        setAddedTracks:jest.fn(),
      },
      actions: {
        changeDetails:jest.fn(),
        followPlaylist: jest.fn(),
        unfollowPlaylist: jest.fn(),
        removePlaylistTrack: jest.fn(),
        getPlaylist: jest.fn(),
        checkFollowed: jest.fn()
      }
    },
    album: {
      namespaced: true,

      state: {
        singleAlbum:
          {   
            "liked": true,
            "tracksCount":"3",
            "tracks": ["4","6","2"],
            "releaseDate": "2020-04-07T16:49:46.442Z",
            "_id": "1",
            "id": "1",
            "name": "Album 3",
            "year": 2020,
            "image": "http://source.unsplash.com/eSYCRwJEzO8",
            "artist": {
              "name":"Nasser Al-Qatami",
              "_id": "2"
            }
        },
        isFollowdAlbum: false
      },
      actions: {
        followAlbum: jest.fn(),
        unfollowAlbum: jest.fn(),
        checkFollowed: jest.fn(),
        getAlbum: jest.fn()
      }
    },
    track: {
      namespaced: true,

      state: {
        generalLiked:true
      },
      mutations:{
        changeUpdateTracks:jest.fn()
      },
      actions: {
        followAlbum: jest.fn(),
        checkSaved: jest.fn(),
        saveTrack:jest.fn(),
        removeSavedTrack:jest.fn()
      }
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
    wrapper.vm.type="playlist";
    wrapper.vm.openMenu("","1","playlist");
    expect(wrapper.vm.playlist()).toHaveBeenCalled;
    expect("getPlaylist").toHaveBeenCalled;
    expect("checkFollowed").toHaveBeenCalled;
  });

  it("Check if the user follow a playlist", ()=>{
    store.state.playlist.isFollowed=true;
    expect(wrapper.vm.isPlaylistSaved).toBe(true);
  });

  it("Check if a user's playlist is public", ()=>{
    store.state.playlist.menuPlaylist.public=false;
    expect(wrapper.vm.isPublicPlaylist).toBe(false);
  });

  it("Check if it is a user's playlist",()=>{
    store.state.playlist.menuPlaylist.owner._id=null;
    store.state.playlist.menuPlaylist.public=true;
    wrapper.vm.playlist();
    expect(wrapper.vm.isOwnedPlaylist).toBe(true);
  });

  it("Follow a playlist", () => {
    wrapper.vm.followPlaylist();
    expect("followPlaylist").toHaveBeenCalled;
  });

  it("Unfollow a playlist", () => {
    wrapper.vm.unfollowPlaylist();
    expect("unfollowPlaylist").toHaveBeenCalled;
  });

  it("Delete a user's playlist",()=>{
    wrapper.vm.deleteUserPlaylist();
    expect("setPlaylistID").toHaveBeenCalled;
    expect("changeDeleteModel").toHaveBeenCalled;
  });

  it("Make a user's playlist public",()=>{
    wrapper.vm.makePlaylistPublic();
    expect("changeDetails").toHaveBeenCalled;
  });

  it("Make a user's playlist secret",()=>{
    wrapper.vm.makePlaylistSecret();
    expect("changeDetails").toHaveBeenCalled;
  });

  it("Call function at clicking on Make secret",()=>{
    wrapper.vm.playlistAction("Make secret");
    expect(wrapper.vm.makePlaylistSecret()).toHaveBeenCalled;
  });

  it("Call function at clicking on Make public",()=>{
    wrapper.vm.playlistAction("Make public");
    expect(wrapper.vm.makePlaylistPublic()).toHaveBeenCalled;
  });

  it("Call function at clicking on Delete",()=>{
    wrapper.vm.playlistAction("Delete");
    expect(wrapper.vm.deleteUserPlaylist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Save to Your Library",()=>{
    wrapper.vm.playlistAction("Save to Your Library");
    expect(wrapper.vm.followPlaylist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Remove from your Library",()=>{
    wrapper.vm.playlistAction("Remove from your Library");
    expect(wrapper.vm.unfollowPlaylist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Copy Playlist Link",()=>{
    wrapper.vm.playlistAction("Copy Playlist Link");
    expect(wrapper.vm.copyToClipboard()).toHaveBeenCalled;
  });
  //--------------------------------------------------------
  //        Check the functions behaviour "Album"
  //--------------------------------------------------------
  it("Gets the album's data", () => {
    wrapper.vm.openMenu("","3","album");
    expect(wrapper.vm.album()).toHaveBeenCalled;
    expect("checkFollowed").toHaveBeenCalled;
  });

  it("Check if the user follows this album", ()=>{
    store.state.album.isFollowdAlbum=false;
    expect(wrapper.vm.isAlbumSaved).toBe(false);
  });

  it("Add album's tracks to specific playlist",()=>{
    wrapper.vm.addAlbumTracksToPlaylist();
    expect("getAlbum").toHaveBeenCalled;
    expect("setAddedTracks").toHaveBeenCalled;
    expect("changeAddTrackModel").toHaveBeenCalled;
  });

  it("Follow an album", () => {
    wrapper.vm.followAlbum();
    expect("followAlbum").toHaveBeenCalled;
  });

  it("Unfollow an album", () => {
    wrapper.vm.unfollowAlbum();
    expect("unfollowAlbum").toHaveBeenCalled;
  });

  it("Call function at clicking on Save to Your Library",()=>{
    wrapper.vm.albumAction("Save to Your Library");
    expect(wrapper.vm.followAlbum()).toHaveBeenCalled
  });

  it("Call function at clicking on Remove from your Library",()=>{
    wrapper.vm.albumAction("Remove from your Library");
    expect(wrapper.vm.unfollowAlbum()).toHaveBeenCalled
  });

  it("Call function at clicking on Add to Playlist",()=>{
    wrapper.vm.albumAction("Add to Playlist");
    expect(wrapper.vm.addAlbumTracksToPlaylist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Copy Album Link",()=>{
    wrapper.vm.albumAction("Copy Album Link");
    expect(wrapper.vm.copyToClipboard()).toHaveBeenCalled
  });
  //--------------------------------------------------------
  //        Check the functions behaviour "Track"
  //--------------------------------------------------------
  it("Gets the track's data", () => {
    wrapper.vm.openMenu("","2","track");
    expect(wrapper.vm.track()).toHaveBeenCalled;
    expect("checkSaved").toHaveBeenCalled;
  });

  it("Check if the user saves this track", ()=>{
    store.state.track.generalLiked=false;
    expect(wrapper.vm.isTrackSaved).toBe(false);
  });

  it("Save track for user",()=>{
    wrapper.vm.saveTrack();
    expect("saveTrack").toHaveBeenCalled;
  });

  it("Remove track from user's saved tracks",()=>{
    wrapper.vm.removeTrackForUser();
    expect("removeSavedTrack").toHaveBeenCalled;
    expect("changeUpdateTracks").toHaveBeenCalled;
  });

  it("Add track to a specific playlist",()=>{
    wrapper.vm.addToPlaylist();
    expect("setAddedTracks").toHaveBeenCalled;
    expect("changeAddTrackModel").toHaveBeenCalled;
  });

  it("Remove track from a specific playlist",()=>{
    wrapper.vm.removeTrackFromPlaylist();
    expect("removePlaylistTrack").toHaveBeenCalled;
  });

  it("Call save tracks at clicking on Save to your Liked Songs",()=>{
    wrapper.vm.action="Save to your Liked Songs";
    wrapper.vm.trackAction();
    expect(wrapper.vm.saveTrack()).toHaveBeenCalled
  });

  it("Call save tracks at clicking on Save to your Liked Songs",()=>{
    wrapper.vm.trackAction("Save to your Liked Songs");
    expect(wrapper.vm.saveTrack()).toHaveBeenCalled
  });

  it("Call function at clicking on Remove from your Liked Songs",()=>{
    wrapper.vm.trackAction("Remove from your Liked Songs");
    expect(wrapper.vm.removeTrackForUser()).toHaveBeenCalled
  });

  it("Call function at clicking on Add to Playlist",()=>{
    wrapper.vm.trackAction("Add to Playlist");
    expect(wrapper.vm.addToPlaylist()).toHaveBeenCalled
  });

  it("Call function at clicking on Remove from this Playlist",()=>{
    wrapper.vm.trackAction("Remove from this Playlist");
    expect(wrapper.vm.removeTrackFromPlaylist()).toHaveBeenCalled
  });

  it("Call function at clicking on Copy Song Link",()=>{
    wrapper.vm.trackAction("Copy Song Link");
    expect(wrapper.vm.copyToClipboard()).toHaveBeenCalled
  });

  //--------------------------------------------------------
  //        Check the functions behaviour "Artist"
  //--------------------------------------------------------
  it("Set artist menu", () => {
    wrapper.vm.openMenu("","1","artist");
    expect(wrapper.vm.artist()).toHaveBeenCalled;
  });

  it("Call function at clicking on Copy Artist Link",()=>{
    wrapper.vm.artistAction("Copy Artist Link");
    expect(wrapper.vm.copyToClipboard()).toHaveBeenCalled
  });
  //--------------------------------------------------------
  //        Test on click function
  //--------------------------------------------------------
  it("Call Artist Action",()=>{
    wrapper.vm.type="artist";
    wrapper.vm.onClick();
    expect(wrapper.vm.artistAction()).toHaveBeenCalled
  });

  it("Call Playlist Action",()=>{
    wrapper.vm.type="playlist";
    wrapper.vm.onClick("Delete");
    expect(wrapper.vm.playlistAction("Delete")).toHaveBeenCalled
  });

  it("Call Album Action",()=>{
    wrapper.vm.type="album";
    wrapper.vm.onClick();
    expect(wrapper.vm.albumAction()).toHaveBeenCalled
  });

  it("Call Track Action",()=>{
    wrapper.vm.type="track";
    wrapper.vm.onClick();
    expect(wrapper.vm.trackAction()).toHaveBeenCalled
  });
  //------------------------------------------------------
  //             Copy to clipboard
  //------------------------------------------------------
  it("Call copy",()=>{
    wrapper.vm.copyToClipboard("Link");
    expect(document.createElement("textarea")).toBeCalled;
  });

  it("At playlist View",()=>{
  Vue.use(VueRouter)
  expect(wrapper.vm.$route.name).toBe("playlist/:id");
  });

});
