import axios from "axios";
import { Math } from "core-js";

const state = {
  followedArtists: [],
  artistAlbums: null,
  artistTopTracks: [],
  artistRelatedArtists: [],
  currentArtist: null,
  x: null,
  simplifiedCategories: null,
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
  load_newAlbumTrack: (state, track) => (state.x = track),
  load_simplifiedCategories: (state, list) =>
    (state.simplifiedCategories = list),
};

const getters = {
  currentArtistGetter: (state) => {
    return state.currentArtist;
  },

  allArtistTopTracks: (state) => {
    var newValue = state.artistTopTracks;
    var artists = [];
    newValue.forEach((element) => {
      var k = {
        name: element.name,
        image: element.album.images[0].url,
        duration:
          Math.floor(element.duration_ms / 60000) +
          ":" +
          (Math.floor((element.duration_ms / 1000) % 60) > 9
            ? Math.floor((element.duration_ms / 1000) % 60)
            : "0" + Math.floor((element.duration_ms / 1000) % 60)),
        id: element.id,
        type: element.type,
      };
      artists.push(k);
    });
    return artists;
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
      var k = {
        name: element.name,
        image: element.image,
        id: element.id,
        type: element.type,
      };
      albums.push(k);
    });
    return albums;
  },
};

const actions = {
  addNewAlbum({ commit }, payload) {
    console.log(payload);
    console.log(payload.albumTitle, payload.albumPhoto);
    const FormData = require("form-data");
    const form = new FormData();
    form.append("name", payload.title);
    form.append("image", payload.cover);
    form.append("type", payload.type);
    form.append("releaseDate", payload.date);
    form.append("copyrightsText", payload.copyrightsText);
    form.append("copyrightsType", payload.copyrightsType);

    axios
      .post("/v1/albums", form, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })
      .then((response) => {
        commit("load_newAlbum", response.data);
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

  addTrackToAlbum({ commit }, payload) {
    console.log(payload)
    const FormData = require("form-data");
    const form = new FormData();
    form.append("name", payload.title);
    form.append("track", payload.track);
    form.append("album", payload.album);
    form.append("explicit", payload.explicit);
    form.append("premium", payload.premium);
    // form.append("category",payload.categories.join())
    payload.categories.forEach(category => {
      form.append("category",category)
      console.log(category)
    });
    
    axios
      .post("/v1/users/tracks", form, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
          'Content-Type': 'application/json',
        },
      })
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
          offset: 1,
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
    console.log(payload.id);
    axios
      .get(`/v1/artists/${payload.id}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        params: {
          country: "from_token",
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
