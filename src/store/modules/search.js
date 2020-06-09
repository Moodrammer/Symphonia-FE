import axios from "axios";
import { Promise } from "core-js";

const state = {
  searchText: "",
  albums: [],
  artists: [],
  category: [],
  playlist: [],
  profiles: [],
  tracks: []
};
const mutations = {
  setSearchText(state, payload) {
    state.searchText = payload;
  },
  setAlbums(state, payload) {
    state.albums = payload;
  },
  setArtists(state, payload) {
    state.artists = payload;
  },
  setCategory(state, payload) {
    state.category = payload;
  },
  setPlaylist(state, payload) {
    state.playlist = payload;
  },
  setProfiles(state, payload) {
    state.profiles = payload;
  },
  setTracks(state, payload) {
    state.Tracks = payload;
  }
};

const actions = {
  searchFor({ commit, state }, payload) {
    commit("setSearchText", payload);
    return new Promise((resolve, reject) => {
      axios
        .get("/v1/search/" + state.searchText + "?limit=6")
        .then(response => {
          // the user is exist then put his data in the status to make the view take the required data
          if (response.status == 200 || response.status == 201 || response.status ==203) {
            let albums = response.data.albums;
            let category = response.data.category;
            let playlist = response.data.playlist;
            let artists = response.data.artists;
            let tracks = response.data.tracks;
            let profiles = response.data.profiles;
            albums.forEach(element => {
              element.description = "";
            });
            category.forEach(element => {
              element.type = "gerne";
              element.description = "Gerne";
              element.image = element.icons[0].url;
            });
            artists.forEach(element => {
              element.id = element._id;
              element.image = element.imageUrl;
            });
            playlist.forEach(element => {
              element.image = element.images[0];
              element.type = "playlist";
            });
            profiles.forEach(element =>{
              element.image = element.imageUrl;
              element.id = element._id;
            });
            commit("setAlbums", albums);
            commit("setCategory", category);
            commit("setPlaylist", playlist);
            commit("setArtists", artists);
            commit("setTracks", tracks);
            commit("setProfiles", profiles);
            resolve(true);
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
