import { shallowMount } from "@vue/test-utils";
import mainInterface from "@/components/ArtistInterface/ArtistInterface.vue";
import overview from "@/components/ArtistInterface/Overview.vue";
import relatedArtists from "@/components/ArtistInterface/RelatedArtists.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
let router = {
  $route: {
    name: "artist/:id",
    params: {
      id: "0"
    }
  }
};

describe("ArtistInterface.vue", () => {
  let wrapper, vuetify, store;

  beforeEach(() => {
    global.document.execCommand = function execCommandMock() {};
    const document = {
      createElement(name) {
        return name;
      }
    };
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(mainInterface, {
      vuetify,
      store,
      stubs: ["router-view"],
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
  /////////////     Watchers TESTS     ////////////////////
  /////////////////////////////////////////////////////////

  it("artistID watcher", async () => {
    (router.$route.params.id = "1"), await wrapper.vm.$nextTick();
    expect("updateArtist").toBeCalled;
  });

  /////////////////////////////////////////////////////////
  /////////////     FUNCTIONS TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("Share function", () => {
    global.open = jest.fn();
    wrapper.vm.share("Facebook");
    expect(global.open).toBeCalled();
    wrapper.vm.share("Twitter");
    expect(global.open).toBeCalled();
    wrapper.vm.share("Copy");
    expect(document.createElement("textarea")).toBeCalled;
  });

  it("Follow function", async () => {
    wrapper.vm.follow();
    wrapper.vm.$nextTick().then(() => {
      expect(store.state.artist.followed[0]).toBe(true);
    });
  });

  it("Unfollow function", async () => {
    wrapper.vm.unfollow();
    wrapper.vm.$nextTick().then(() => {
      expect(store.state.artist.followed[0]).toBe(false);
    });
  });
});

describe("Overview.vue", () => {
  let wrapper, vuetify, store;

  beforeEach(() => {
    global.document.execCommand = function execCommandMock() {};
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(overview, {
      vuetify,
      store
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
  /////////////     Watchers TESTS     ////////////////////
  /////////////////////////////////////////////////////////

  it("allArtistAlbums watcher", async () => {
    store.state.artist.albums = [];
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.albumsCardItems.items.length).toBe(0);
    });
  });

  it("allArtistSingles watcher", async () => {
    store.state.artist.singles = [];
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.singlesCardItems.items.length).toBe(0);
    });
  });
});

describe("RelatedArtists.vue", () => {
  let wrapper, vuetify, store;

  beforeEach(() => {
    global.document.execCommand = function execCommandMock() {};
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(relatedArtists, {
      vuetify,
      store
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
  /////////////     Watchers TESTS     ////////////////////
  /////////////////////////////////////////////////////////

  it("allArtistRelatedArtists watcher", async () => {
    store.state.artist.relatedArtists = [];
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.cardItems.items.length).toBe(0);
    });
  });
});

const storeMock = {
  modules: {
    artist: {
      namespaced: true,
      state: {
        followed: [false],
        albums: [
          {
            id: "0",
            image: "http://source.unsplash.com/eSYCRwJEzO8",
            name: "Album0"
          },
          {
            id: "1",
            image: "http://source.unsplash.com/eSYCRwJEzO8",
            name: "Album1"
          },
          {
            id: "2",
            image: "http://source.unsplash.com/eSYCRwJEzO8",
            name: "Album2"
          }
        ],

        singles: [
          {
            id: "0",
            image: "http://source.unsplash.com/eSYCRwJEzO8",
            name: "Single0"
          },
          {
            id: "1",
            image: "http://source.unsplash.com/eSYCRwJEzO8",
            name: "Single1"
          },
          {
            id: "2",
            image: "http://source.unsplash.com/eSYCRwJEzO8",
            name: "Single2"
          }
        ],

        topTracks: [
          {
            album: {
              _id: "2",
              image: "http://source.unsplash.com/eSYCRwJEzO8",
              name: "Album2"
            },
            duaration: 48000,
            explicit: false,
            name: "Song1",
            premium: false,
            _id: "0"
          },
          {
            album: {
              _id: "1",
              image: "http://source.unsplash.com/eSYCRwJEzO8",
              name: "Album1"
            },
            duaration: 43000,
            explicit: true,
            name: "Song2",
            premium: false,
            _id: "1"
          }
        ],

        artistInfo: {
          followedUsers: [1, 2],
          id: "0",
          _id: "0",
          imageUrl:
            "https://i1.sndcdn.com/artworks-000102741362-wev1tn-t500x500.jpg",
          name: "a0"
        },

        relatedArtists: [
          {
            id: "1",
            description: "artist",
            name: "a1",
            type: "artist",
            image:
              "https://i1.sndcdn.com/artworks-000102741362-wev1tn-t500x500.jpg"
          },
          {
            id: "2",
            description: "artist",
            name: "a2",
            type: "artist",
            image:
              "https://i1.sndcdn.com/artworks-000102741362-wev1tn-t500x500.jpg"
          }
        ]
      },

      actions: {
        followArtist: jest.fn(state => (state.followed = [true])),
        unfollowArtist: jest.fn(state => (state.followed = [false])),
        getCurrentArtist: jest.fn(),
        isFollowingArtists: jest.fn(),
        getArtistAlbums: jest.fn(),
        getArtistTopTracks: jest.fn(),
        getArtistRelatedArtists: jest.fn()
      },
      getters: {
        currentArtistGetter: jest.fn(state => state.artistInfo),
        isFollowed: jest.fn(state => state.followed),
        allArtistAlbums: jest.fn(state => state.albums), //
        allArtistTopTracks: jest.fn(state => state.topTracks), //
        allArtistSingles: jest.fn(state => state.singles), //
        allArtistRelatedArtists: jest.fn(state => state.relatedArtists)
      }
    }
  }
};
