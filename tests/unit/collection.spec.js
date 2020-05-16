import { shallowMount } from "@vue/test-utils";
import playlists from "@/components/collection/playlists.vue";
import albums from "@/components/collection/albums.vue";
import artists from "@/components/collection/artists.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

let collection = [playlists, artists, albums];

collection.forEach(collectionElement => {
  describe(`${collectionElement.name}.vue`, () => {
    let wrapper, vuetify, store;

    beforeEach(() => {
      vuetify = new Vuetify();
      Vue.use(Vuetify);
      Vue.use(Vuex);
      store = new Vuex.Store({
        modules: {
          playlist: {
            namespaced: true,
            state: {
              LP: []
            },
            actions: {
              getPlaylists: jest.fn()
            },
            getters: {
              likedPlaylists: jest.fn(state => state.LP)
            }
          },
          track: {
            namespaced: true,
            state: {
              savedTracks: []
            },
            actions: {
              getTracks: jest.fn()
            },
            getters: {
              tracksGetter: jest.fn(state => state.savedTracks)
            }
          },
          album: {
            namespaced: true,
            state: {
              followedAlbums: []
            },
            actions: {
              getAlbums: jest.fn(),
              deleteAlbums: jest.fn()
            },
            getters: {
              allAlbums: jest.fn(state => state.followedAlbums)
            }
          },
          artist: {
            state: {
              followed: []
            },
            actions: {
              getFollowedArtists: jest.fn(),
              unfollowArtist: jest.fn()
            },
            getters: {
              allFollowedArtists: jest.fn(state => state.followed)
            }
          }
        }
      });

      wrapper = shallowMount(collectionElement, { vuetify, store });
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

    it(`renders heading: ${collectionElement.name}`, () => {
      expect(wrapper.text()).toBe(`${collectionElement.name}`);
    });

    /////////////////////////////////////////////////////////
    /////////////     FUNCTIONS TESTS     ///////////////////
    /////////////////////////////////////////////////////////

    // it("menuOrder function", () => {
    //   let menuItem,
    //     cardIndex = 4;
    //   if (collectionElement === artists) menuItem = "Unfollow";
    //   else menuItem = "Remove from your Library";
    //   wrapper.vm.menuOrder(menuItem, cardIndex);
    //   expect(wrapper.vm.contextMenuChoice).toBe(menuItem);
    //   expect(wrapper.vm.contextMenuCardIndex).toBe(cardIndex);
    // });

    if (collectionElement === playlists) {
      it("likedPlaylists watcher", async () => {
        store.state.playlist.LP = [1, 2, 3, 5, 6, 7, 8, 9, 0];
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.cardItems.items).toEqual([1, 2, 3, 5, 6, 7, 8, 9, 0]);
      });

      it("tracksGetter watcher", async () => {
        store.state.track.savedTracks = [-1, 20032, 323, -5, 11, 7, -8, 9, 232];
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.cardItems.likedSongs).toEqual([
          -1,
          20032,
          323,
          -5,
          11,
          7,
          -8,
          9,
          232
        ]);
      });
    } else if (collectionElement === albums) {
      it("allAlbums watcher", async () => {
        store.state.album.followedAlbums = [
          92341,
          2,
          3,
          50,
          6932,
          437,
          8,
          3219,
          13210
        ];
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.cardItems.items).toEqual([
          92341,
          2,
          3,
          50,
          6932,
          437,
          8,
          3219,
          13210
        ]);
      });
    } else {
      it("allFollowedArtists watcher", async () => {
        store.state.artist.followed = [
          3241,
          45352,
          390,
          3215,
          986,
          2217,
          823,
          4329,
          1230
        ];
        console.log(store.state.artist);
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.cardItems.items).toEqual([
          3241,
          45352,
          390,
          3215,
          986,
          2217,
          823,
          4329,
          1230
        ]);
      });
    }
  });
});
