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
    },
    style: null
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
    },
    style: null
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
    },
    style: null
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
    },
    style: null
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
    },
    style: "artist"
  },
  categories: [],
  singleCategory: {
    categoryName: "",
    category_id: "",
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
  categoryIDHolder: ""
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
        image: element.images[0].url,
        description: element.description,
        id: element.id,
        url: element.href
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
        url: element.href
      };
      newList.push(k);
    });
    state.popularArtists.list.items = newList;
    state.categories.push(state.popularArtists);
  },
  load_personalSections(state) {
    state.recentlyPlayed.list.items = playlistModule.state.likedPlaylists;
    state.categories.push(state.recentlyPlayed);
    state.heavyRoatation.list.items = playlistModule.state.likedPlaylists;
    state.categories.push(state.heavyRoatation);
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
      category_id: "",
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
    singleCategory.category_id = state.categoryIDHolder;
    singleCategory.list.items = payload;
    state.singleCategory = singleCategory;
    state.categories.push(singleCategory);
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
  async getGenrePlaylists({ commit, dispatch }, category_id) {
    await dispatch("getCategory", category_id);
    await axios
      .get("v1/browse/categories/" + category_id + "/playlists")
      .then(async response => {
        let genreList = response.data;
        let newList = [];
        for (let index = 0; index < genreList.length; index++) {
          var k = {
            name: genreList[index].name,
            image: genreList[index].images[0].url,
            description: genreList[index].description,
            id: genreList[index].id,
            url: genreList[index].href
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
    let genres_ids = ["pop", "folk", "rock", "jazz"];
    for (let index = 0; index < genres_ids.length; index++) {
      await dispatch("getGenrePlaylists", genres_ids[index]);
    }
  },
  async loadUserSections({ dispatch, commit }, payload) {
    commit("emptyArray");
    await dispatch("playlist/getPlaylists", payload, { root: true });
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
        let list = response.data;
        commit("load_tracks", list);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  async getCategory({ commit }, category_id) {
    await axios
      .get("v1/browse/categories/" + category_id)
      .then(async response => {
        let category = response.data;
        commit("setName", category);
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
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};