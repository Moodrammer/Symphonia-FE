// this module to handle the array of objects to be rendered in the home page of the webplayer
import axios from "axios";
import playlistModule from "./playlist.js";

const state = {
  tracks: [],
  recentlyPlayed: {
    categoryName: "Recently Played",
    showSeeAll: false,
    list: {
      menuList: [
        { title: "Start Radio" },
        { title: "Save to Your Library" },
        { title: "Copy Playlist Link" }
      ],
      showMenu: false,
      hoveredCardIndex: null,
      items: []
    }
  },
  newReleases: {
    categoryName: "Popular new releases",
    showSeeAll: false,
    list: {
      menuList: [
        { title: "Start Radio" },
        { title: "Save to Your Library" },
        { title: "Copy Playlist Link" }
      ],
      showMenu: false,
      hoveredCardIndex: null,
      items: []
    }
  },
  heavyRoatation: {
    categoryName: "Your heavy rotation",
    showSeeAll: false,
    list: {
      menuList: [
        { title: "Start Radio" },
        { title: "Save to Your Library" },
        { title: "Copy Playlist Link" }
      ],
      showMenu: false,
      hoveredCardIndex: null,
      items: []
    }
  },
  likedPlaylists: {
    categoryName: "Your playlists",
    showSeeAll: false,
    list: {
      menuList: [
        { title: "Start Radio" },
        { title: "Save to Your Library" },
        { title: "Copy Playlist Link" }
      ],
      showMenu: false,
      hoveredCardIndex: null,
      items: []
    }
  },
  popularPlaylists: {
    categoryName: "Popular playlists",
    showSeeAll: false,
    list: {
      menuList: [
        { title: "Start Radio" },
        { title: "Save to Your Library" },
        { title: "Copy Playlist Link" }
      ],
      showMenu: false,
      hoveredCardIndex: null,
      items: []
    }
  },
  popularArtists: {
    categoryName: "Popular Artists",
    showSeeAll: false,
    list: {
      menuList: [
        { title: "Start Radio" },
        { title: "Follow" },
        { title: "Copy Artist Link" }
      ],
      showMenu: false,
      hoveredCardIndex: null,
      items: []
    }
  },
  categories: [],
  singleCategory: {
    categoryName: "",
    categoryID: "",
    //Used in home
    showSeeAll: true,
    //To provide the card grid with the menu which appear @right click
    list: {
      menuList: [
        { title: "Start Radio" },
        { title: "Save to Your Library" },
        { title: "Copy Playlist Link" }
      ],
      showMenu: false,
      hoveredCardIndex: null,
      //items:the playlists to be shown
      items: []
    }
  },
  categoryNameHolder: "",
  categoryIDHolder: "",
  historyResponse: []
};

const mutations = {
  emptyArray(state) {
    state.categories = [];
  },
  load_popularPlaylists(state, payload) {
    let newList = [];
    payload.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0],
        description: element.description,
        id: element.id,
        url: element.href,
        type: "playlist"
      };
      newList.push(k);
    });
    state.popularPlaylists.list.items = newList;
    state.categories.push(state.popularPlaylists);
  },
  load_popularArtists(state, payload) {
    let newList = [];
    payload.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0].url,
        description: element.description,
        id: element.id,
        url: element.href,
        type: "artist"
      };
      newList.push(k);
    });
    state.popularArtists.list.items = newList;
    state.categories.push(state.popularArtists);
  },
  load_personalSections(state) {
    state.likedPlaylists.list.items = playlistModule.state.likedPlaylists;
    state.categories.push(state.likedPlaylists);
  },
  load_tracks(state, list) {
    state.tracks = list;
  },
  setName(state, payload) {
    state.categoryNameHolder = payload.name;
    state.categoryIDHolder = payload.id;
  },
  createCategory(state, payload) {
    let singleCategory = {
      categoryName: "",
      categoryID: "",
      //Used in home
      showSeeAll: true,
      //To provide the card grid with the menu which appear @right click
      list: {
        menuList: [
          { title: "Start Radio" },
          { title: "Save to Your Library" },
          { title: "Copy Playlist Link" }
        ],
        showMenu: false,
        hoveredCardIndex: null,
        //items:the playlists to be shown
        items: []
      }
    };
    singleCategory.categoryName = state.categoryNameHolder;
    singleCategory.categoryID = state.categoryIDHolder;
    singleCategory.list.items = payload;
    state.singleCategory = singleCategory;
    state.categories.push(singleCategory);
  },
  history(state, payload) {
    state.historyResponse = payload;
  },
  setRecentlyPlayed(state, payload) {
    if (payload.length != 0) {
      state.recentlyPlayed.list.items = payload;
      state.categories.push(state.recentlyPlayed);
    }
  },
  setNewReleases(state, payload) {
    state.newReleases.list.items = payload;
    state.categories.push(state.newReleases);
  }
};

const actions = {
  getPopularPlaylists({ commit }) {
    axios
      .get("/v1/me/popularPlaylists")
      .then(response => {
        let playlists = response.data;

        commit("load_popularPlaylists", playlists);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  getPopularArtists({ commit }) {
    axios
      .get("/v1/me/popularArtists")
      .then(response => {
        let artists = response.data;
        commit("load_popularArtists", artists);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  async getGenrePlaylists({ commit, dispatch }, categoryID) {
    await dispatch("getCategory", categoryID);
    await axios
      .get("v1/browse/categories/" + categoryID + "/playlists")
      .then(async response => {
        let genreList = response.data.playlists.items;
        let newList = [];
        for (let index = 0; index < genreList.length; index++) {
          var k = {
            name: genreList[index].name,
            image: genreList[index].images[0],
            description: genreList[index].description,
            id: genreList[index].id,
            url: genreList[index].href,
            type: "playlist"
          };
          newList.push(k);
        }
        await commit("createCategory", newList);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  async loadGenres({ commit, dispatch }) {
    commit("emptyArray");
    let genres_ids = [];
    axios
      .get("/v1/browse/categories")
      .then(async response => {
        let genres = response.data;
        for (let i = 0; i < 4; i++) {
          var id = genres.categories.items[i].id;
          genres_ids.push(id);
        }
        for (let index = 0; index < genres_ids.length; index++) {
          await dispatch("getGenrePlaylists", genres_ids[index]);
        }
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  async loadUserSections({ commit }) {
    await commit("emptyArray");
    commit("load_personalSections");
  },
  getTracks({ commit }, payload) {
    axios
      .get("/v1/me/tracks", {
        headers: {
          Authorization: `Bearer ${payload}`
        }
      })
      .then(response => {
        let list = response.data.tracks.items;
        commit("load_tracks", list);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  async getCategory({ commit }, categoryID) {
    await axios
      .get("v1/browse/categories/" + categoryID)
      .then(async response => {
        let category = response.data;
        commit("setName", category);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  async recentlyPlayed({ commit }, payload) {
    await axios
      .get("/v1/me/recently-played", {
        headers: {
          Authorization: `Bearer ${payload}`
        }
      })
      .then(response => {
        let list = response.data.history;
        commit("history", list);
        let newList = [];
        list.forEach(element => {
          var k = {
            name: element.contextName,
            id: element.contextId,
            image: element.contextImage,
            type: element.contextType
          };
          newList.push(k);
        });
        commit("setRecentlyPlayed", newList);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  newReleases({ commit }) {
    axios
      .get("/v1/browse/new-releases")
      .then(response => {
        let list = response.data.albums.items;
        let newList = [];
        list.forEach(element => {
          var album = {
            name: element.name,
            id: element.id,
            image: element.image,
            type: "album"
          };
          newList.push(album);
        });
        commit("setNewReleases", newList);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  }
};

const getters = {
  categoriesGetter: function(state) {
    return state.categories;
  },
  tracksGetter: state => state.tracks
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
