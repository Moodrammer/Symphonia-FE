// this module to handle the array of objects to be rendered in the home page of the webplayer
import axios from "axios";
import playlistModule from "./playlist.js";

const state = {
  categories: [],
  recentlyPlayed: {
    categoryName: "Recently Played",
    showSeeAll: false,
    list: {
      items: []
    }
  },
  newReleases: {
    categoryName: "Popular new releases",
    showSeeAll: false,
    list: {
      items: []
    }
  },
  likedPlaylists: {
    categoryName: "Your playlists",
    showSeeAll: false,
    list: {
      items: []
    }
  },
  categoryNameHolder: "",
  categoryIDHolder: "",
  historyResponse: [],
  newReleasesAlbums: [],
  genresList: [],
  pushAgain: true
};

const mutations = {
  emptyArray(state) {
    state.categories = [];
  },
  togglePushAgain(state) {
    state.pushAgain = !state.pushAgain;
  },
  setGenresList(state, genresList) {
    state.genresList = genresList;
  },
  setSingleCategoryData(state, payload) {
    let singleCategory = {
      categoryName: "",
      categoryID: "",
      showSeeAll: true,
      list: {
        items: []
      }
    };
    singleCategory.categoryName = state.categoryNameHolder;
    singleCategory.categoryID = state.categoryIDHolder;
    singleCategory.list.items = payload;
    state.categories.push(singleCategory);
  },
  setGenreName(state, payload) {
    state.categoryNameHolder = payload.name;
    state.categoryIDHolder = payload.id;
  },
  setHistory(state, payload) {
    state.historyResponse = payload;
  },
  setRecentlyPlayed(state) {
    let list = state.historyResponse;
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
    if (newList.length != 0) {
      state.recentlyPlayed.list.items = newList;
      state.categories.push(state.recentlyPlayed);
    }
  },
  setUserPlaylists(state) {
    state.likedPlaylists.list.items = playlistModule.state.userSavedPlaylists;
    if (state.likedPlaylists.list.items.length != 0)
      state.categories.push(state.likedPlaylists);
  },
  setNewReleases(state, newReleasesList) {
    state.newReleases.list.items = newReleasesList;
    state.categories.push(state.newReleases);
  }
};

const actions = {
  //-------------------------------------------------
  //         Get a single category\genre
  //-------------------------------------------------
  async getCategory({ commit }, categoryID) {
    await axios
      .get("v1/browse/categories/" + categoryID)
      .then(async response => {
        commit("setGenreName", response.data);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  //-------------------------------------------------
  //         Get a category's playlist
  //-------------------------------------------------
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
            type: "playlist"
          };
          newList.push(k);
        }
        await commit("setSingleCategoryData", newList);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  //-------------------------------------------------
  //         Get a list of categories
  //-------------------------------------------------
  async loadGenres({ state, commit, dispatch }) {
    if (state.pushAgain) {
      commit("togglePushAgain");
      commit("emptyArray");
      let genresIDs = [];
      axios
        .get("/v1/browse/categories")
        .then(async response => {
          let genres = response.data.categories.items;
          for (let i = 0; i < genres.length; i++) {
            var id = genres[i].id;
            genresIDs.push(id);
          }
          commit("setGenresList", genresIDs);
          for (let index = 0; index < genresIDs.length; index++) {
            await dispatch("getGenrePlaylists", genresIDs[index]);
          }
          commit("togglePushAgain");
        })
        .catch(error => {
          console.log("axios caught an error");
          console.log(error);
        });
    }
  },
  //-------------------------------------------------
  //      Get user's recently played list
  //-------------------------------------------------
  async recentlyPlayed({ commit }, payload) {
    await axios
      .get("/v1/me/recently-played", {
        headers: {
          Authorization: `Bearer ${payload}`
        }
      })
      .then(response => {
        commit("setHistory", response.data.history);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  //-------------------------------------------------
  //      Get a list of new releases albums
  //-------------------------------------------------
  async getNewReleases({ commit }) {
    await axios
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
  },
  //-------------------------------------------------
  //        Webplayer home user's sections
  //-------------------------------------------------
  async recentlyPlayedSection({ commit, dispatch }, payload) {
    await dispatch("recentlyPlayed", payload);
    commit("setRecentlyPlayed");
  },
  async yourPlaylistsSection({ commit, dispatch }, payload) {
    await dispatch("playlist/getPlaylists", payload, { root: true });
    commit("setUserPlaylists");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
