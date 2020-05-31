import { shallowMount } from "@vue/test-utils";
import dashboard from "@/components/ArtistDashboard/Dashboard.vue";
import main from "@/components/ArtistDashboard/Main.vue";
import albums from "@/components/ArtistDashboard/Albums.vue";
import singles from "@/components/ArtistDashboard/Singles.vue";
import drawer from "@/components/ArtistDashboard/Drawer.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";

/*
jest.mock('@/mixins/userService/getuserToken', () => ({
    getuserToken: () => 1,
}));

jest.mock('@/mixins/userService/getuserID', () => ({
    getuserID:  () => 2,
}));


jest.mock('@/mixins/userService/getuserType', () => ({
    getuserType:  () => "artist",
}));

*/

describe("Dashboard.vue", () => {
  let wrapper, store;

  beforeEach(() => {
    const vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);

    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(dashboard, {
      vuetify,
      store,
      router
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

});

describe("Main.vue", () => {
  let wrapper, vuetify, store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(main, {
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
});

describe("Drawer.vue", () => {
  let wrapper, vuetify, store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(drawer, {
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
