import axios from "axios";
import { Promise } from "core-js";

const state = {
  searchText: "",
  albums: [],
  artists: [],
  category: [],
  playlist: [],
  profiles: [],
  tracks: [],
  next: null
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
    state.tracks = payload;
  },
  setNext(state, payload) {
    state.next = payload;
  },
  clearState(state, payload) {
    state.artists = payload;
    state.playlist = payload;
    state.profiles = payload;
    state.tracks = payload;
    state.category = payload;
    state.albums = payload;
    console.log(state);
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
          if (
            response.status == 200 ||
            response.status == 201 ||
            response.status == 203
          ) {
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
            profiles.forEach(element => {
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
  },
  searchByType({ state, commit }, payload) {
    if (payload.offset == 0) {
      //commit("clearState", []);
      commit("setNext", null);
    }
    return new Promise((resolve, reject) => {
      axios
        .get(payload.q)
        .then(response => {
          // the user is exist then put his data in the status to make the view take the required data
          if (
            response.status == 200 ||
            response.status == 201 ||
            response.status == 203
          ) {
            switch (payload.type) {
              case "artist": {
                let count = 0;
                commit("setNext", response.data.artist.next);
                response.data.artist.items.forEach(element => {
                  if (state.artists.length == 6 && count < 6) {
                    count += 1;
                  } else {
                    element.id = element._id;
                    element.image = element.imageUrl;
                    state.artists.push(element);
                    count += 1;
                  }
                });
                break;
              }
              case "playlist": {
                let count = 0;
                commit("setNext", response.data.playlist.next);
                response.data.playlist.items.forEach(element => {
                  if (state.playlist.length == 6 && count < 6) {
                    count += 1;
                  } else {
                    element.image = element.images[0];
                    element.type = "playlist";
                    state.playlist.push(element);
                    count += 1;
                  }
                });
                break;
              }
              case "category": {
                let count = 0;
                commit("setNext", response.data.category.next);

                response.data.category.items.forEach(element => {
                  if (state.category.length == 6 && count < 6) {
                    count += 1;
                  } else {
                    element.type = "gerne";
                    element.description = "Gerne";
                    element.image = element.icons[0].url;
                    state.category.push(element);
                    count += 1;
                  }
                });
                break;
              }
              case "album": {
                let count = 0;
                commit("setNext", response.data.album.next);
                response.data.album.items.forEach(element => {
                  if (state.albums.length == 6 && count < 6) {
                    count += 1;
                  } else {
                    element.description = "";
                    state.albums.push(element);
                    count += 1;
                  }
                });
                break;
              }
              case "profile": {
                let count = 0;
                commit("setNext", response.data.profile.next);
                response.data.profile.items.forEach(element => {
                  if (state.profiles.length == 6 && count < 6) {
                    count += 1;
                  } else {
                    element.image = element.imageUrl;
                    element.id = element._id;
                    state.profiles.push(element);
                    count += 1;
                  }
                });
                break;
              }
              case "track": {
                let count = 0;
                commit("setNext", response.data.track.next);
                response.data.track.items.forEach(element => {
                  if (state.tracks.length == 6 && count < 6) {
                    count += 1;
                  } else {
                    state.tracks.push(element);
                    count += 1;
                  }
                });
                break;
              }
            }
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
