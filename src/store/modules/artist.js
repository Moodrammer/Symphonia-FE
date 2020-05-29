import axios from "axios";
import { Math } from "core-js";

const state = {
  followedArtists: [],
  artistAlbums: null,
  artistTopTracks: [],
  artistRelatedArtists: [],
  currentArtist: null,
  latestAlbumID: null,
  simplifiedCategories: null,
  percentCompleted: null,
};

const mutations = {
  load_followedArtists: (state, list) => (state.followedArtists = list),
  unfollow_artists: (state, list) =>
    (state.followedArtists = state.followedArtists.filter(
      (artist) => !list.includes(artist._id)
    )),
  load_artistAlbums: (state, list) => (state.artistAlbums = list),
  load_newAlbum: (state, album) => state.artistAlbums.albums.items.push(album),
  load_artistTopTracks: (state, list) => (state.artistTopTracks = list),
  load_artistRelatedArtists: (state, list) =>
    (state.artistRelatedArtists = list),
  load_currentArtist: (state, artist) => (state.currentArtist = artist),
  load_newAlbumTrack: (state, track) => {
    state.latestAlbumID = null;
    for (let i = 0; i < state.artistAlbums.albums.items.length; i++) {
      if (state.artistAlbums.albums.items[i]._id == track.album) {
        state.artistAlbums.albums.items[i].tracks.push({
          name: track.name,
          _id: track._id,
        });
        return;
      }
    }
  },
  load_simplifiedCategories: (state, list) =>
    (state.simplifiedCategories = list),
  set_latestAlbumID: (state, id) => (state.latestAlbumID = id),
  load_renameAlbum: (state, album) => {
    for (let i = 0; i < state.artistAlbums.albums.items.length; i++) {
      if (state.artistAlbums.albums.items[i]._id == album._id) {
        state.artistAlbums.albums.items[i].name = album.name;
        break;
      }
    }
  },
  load_renameTrack: (state, track) => {
    for (let i = 0; i < state.artistAlbums.albums.items.length; i++) {
      if (state.artistAlbums.albums.items[i]._id == track.album) {
        for (
          let j = 0;
          j < state.artistAlbums.albums.items[i].tracks.length;
          j++
        ) {
          if (state.artistAlbums.albums.items[i].tracks[j]._id == track._id) {
            state.artistAlbums.albums.items[i].tracks[j].name = track.name;
            return;
          }
        }
        break;
      }
    }
  },
  delete_album: (state, id) => {
    state.artistAlbums.albums.items = state.artistAlbums.albums.items.filter(
      (x) => x._id != id
    );
  },
  delete_track: (state, id) => {
    for (let i = 0; i < state.artistAlbums.albums.items.length; i++) {
      let len = state.artistAlbums.albums.items[i].tracks.length;
      state.artistAlbums.albums.items[
        i
      ].tracks = state.artistAlbums.albums.items[i].tracks.filter(
        (x) => x._id != id
      );
      if (state.artistAlbums.albums.items[i].tracks.length < len) return;
    }
  },
};

const getters = {
  latestAlbumIDGetter: (state) => state.latestAlbumID,
  uploadingDone: (state) => state.percentCompleted,
  currentArtistGetter: (state) => {
    console.log("artist", state.currentArtist);
    return state.currentArtist;
  },

  allArtistTopTracks: (state) => {
    if (!state.artistTopTracks || state.artistTopTracks.length < 1) return null;
    var newValue = state.artistTopTracks.tracks.items;
    console.log("top tracks", newValue);
    var tracks = [];

    newValue.forEach((element) => {
      var k = {
        album: {
          name: element.album.name,
          _id: element.album._id,
          image: element.album.image,
        },
        durationMs: element.durationMs,
        explicit: element.explicit,
        premium: element.premium,
        _id: element._id,
      };
      tracks.push(k);
    });
    console.log(tracks);
    return tracks;
  },

  allArtistRelatedArtists: (state) => {
    var newValue = state.artistRelatedArtists;
    var artists = [];
    newValue.artists.forEach((element) => {
      console.log("x", element);
      var k = {
        name: element.name,
        image: element.imageUrl,
        description: element.type,
        id: element._id,
        type: element.type,
      };
      artists.push(k);
    });
    return artists;
  },

  allFollowedArtists: (state) => {
    var newValue = state.followedArtists;
    var artists = [];
    newValue.forEach((element) => {
      var k = {
        name: element.name,
        image: element.imageUrl,
        description: element.type,
        id: element._id,
        type: element.type,
      };
      artists.push(k);
    });
    return artists;
  },

  allArtistAlbums: (state) => {
    if (state.artistAlbums == null) return null;
    console.log("sss", state.artistAlbums.albums.items);
    var newValue = state.artistAlbums.albums.items;
    var albums = [];
    newValue.forEach((element) => {
      console.log(element.albumType);
      if (element.albumType == "album") {
        var k = {
          name: element.name,
          image: element.image,
          id: element.id,
          tracks: element.tracks,
        };
        albums.push(k);
      }
    });
    return albums;
  },

  allArtistSingles: (state) => {
    if (state.artistAlbums == null) return null;
    console.log("sss", state.artistAlbums.albums.items);
    var newValue = state.artistAlbums.albums.items;
    var albums = [];
    newValue.forEach((element) => {
      if (element.albumType == "single") {
        var k = {
          name: element.name,
          image: element.image,
          id: element.id,
          tracks: element.tracks,
        };
        albums.push(k);
      }
    });
    return albums;
  },
};

const actions = {
  deleteTrack({ commit }, payload) {
    axios
      .delete(`/v1/users/track/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })
      .then(commit("delete_track", payload.id))
      .catch((error) => {
        console.log("axios caught an error in deleteTrack");
        console.log(error);
      });
  },
  deleteAlbum({ commit }, payload) {
    axios
      .delete(`/v1/albums/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })
      .then(commit("delete_album", payload.id))
      .catch((error) => {
        console.log("axios caught an error in deleteAlbum");
        console.log(error);
      });
  },
  renameAlbum({ commit }, payload) {
    console.log(payload);
    console.log(payload.albumTitle, payload.albumPhoto);

    axios
      .patch(
        `/v1/albums/${payload.id}`,
        {
          name: payload.name,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        commit("load_renameAlbum", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  renameTrack({ commit }, payload) {
    console.log(payload);
    console.log(payload.albumTitle, payload.albumPhoto);

    axios
      .patch(
        `/v1/users/track/${payload.id}`,
        {
          name: payload.name,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        commit("load_renameTrack", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  addNewAlbum({ commit, state }, payload) {
    console.log(payload);
    console.log(payload.albumTitle, payload.albumPhoto);
    const FormData = require("form-data");
    const form = new FormData();
    form.append("name", payload.title);
    form.append("image", payload.cover);
    form.append("albumType", payload.type);
    form.append("releaseDate", payload.date);
    form.append("copyrightsText", payload.copyrightsText);
    form.append("copyrightsType", payload.copyrightsType);
    const config = {
      onUploadProgress: function(progressEvent) {
        var x = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        state.percentCompleted = x == 100 ? 0 : x;
      },
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    };

    axios
      .post("/v1/albums", form, config)
      .then((response) => {
        commit("load_newAlbum", response.data);
        commit("set_latestAlbumID", response.data._id);
        console.log(response);
      })
      .catch((error) => console.log(error));
  },

  getSimplifiedCategories({ commit }, payload) {
    var categories = [];
    axios
      .get("/v1/browse/categories", {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        response.data.categories.items.forEach((element) => {
          categories.push({
            id: element._id,
            name: element.name,
          });
        });
        commit("load_simplifiedCategories", categories);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  addTrackToAlbum({ commit, state }, payload) {
    console.log(payload);
    const FormData = require("form-data");
    const form = new FormData();
    form.append("name", payload.title);
    form.append("track", payload.track);
    form.append("album", payload.album);
    form.append("explicit", payload.explicit);
    form.append("premium", payload.premium);
    payload.categories.forEach((category) => {
      form.append("category", category);
      console.log(category);
    });
    const config = {
      onUploadProgress: function(progressEvent) {
        var x = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        state.percentCompleted = x == 100 ? 0 : x;
      },
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    };

    axios
      .post("/v1/users/tracks", form, config)
      .then((response) => {
        console.log(response);
        commit("load_newAlbumTrack", response.data);
      })
      .catch((error) => console.log(error));
  },

  getCurrentArtist({ commit }, payload) {
    axios
      .get(`v1/artists/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })
      .then((response) => {
        commit("load_currentArtist", response.data);
      })
      .catch((error) => {
        console.log("axios caught an error in getCurrentArtist");
        console.log(error);
      });
  },
  /**
   * called to get followed artists by current user
   * @param {object} payload contains the token
   */
  getFollowedArtists({ commit }, payload) {
    console.log(payload.token);
    axios
      .get("/v1/me/following", {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        params: { type: "artist", limit: 50 },
      })
      .then((response) => {
        commit("load_followedArtists", response.data.artists.items);
      })
      .catch((error) => {
        console.log("axios caught an error in getFollowedArtists");
        console.log(error);
      });
  },

  /**
   * called to get artist's albums
   * @param {object} payload contains the token and the artist id
   */

  getArtistAlbums({ commit }, payload) {
    console.log(payload.id, "its", payload.token);
    axios
      .get(`/v1/artists/${payload.id}/albums`, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        params: {
          //include_groups=appears_on&country=ES&limit=2&offset'
          // country: "from_token",
          limit: 50,
          offset: 0,
          // include_groups: "album"
        },
      })
      .then((response) => {
        commit("load_artistAlbums", response.data);
        console.log("ALBUMS", response);
      })
      .catch((error) => {
        console.log("axios caught an error in getArtistAlbums");
        console.log(error);
      });
  },

  /**
   * called to get artist's top tracks
   * @param {object} payload contains the token and the artist id
   */

  getArtistTopTracks({ commit }, payload) {
    console.log("load", payload);
    axios
      .get(`/v1/artists/${payload.id}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        params: {
          // country: "from_token",
          limit: payload.limit,
          offset: payload.offset,
        },
      })
      .then((response) => {
        console.log("getArtistTopTracks", response.data);
        commit("load_artistTopTracks", response.data);
      })
      .catch((error) => {
        console.log("axios caught an error in getArtistTopTracks");
        console.log(error);
      });
  },

  /**
   * called to get artists related to a certain a artist
   * @param {object} payload contains the token and the artist id
   */

  getArtistRelatedArtists({ commit }, payload) {
    console.log("dsa", payload.id);
    axios
      .get(`/v1/artists/${payload.id}/related-artists`, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })
      .then((response) => {
        console.log("getArtistRelatedArtists", response);
        commit("load_artistRelatedArtists", response.data);
      })
      .catch((error) => {
        console.log("axios caught an error in getArtistTopTracks");
        console.log(error);
      });
  },

  /**
   * called to unfollow artist
   * @param {object} payload contains the token and the artist id
   */

  unfollowArtist({ commit }, payload) {
    axios
      .delete("/v1/me/following", {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        params: {
          type: "artist",
          ids: payload.artists.join(),
        },
      })
      .then(commit("unfollow_artists", payload.artists))
      .catch((error) => {
        console.log("axios caught an error in unfollowArtist");
        console.log(error);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
