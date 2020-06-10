import axios from "axios";
import { Math } from "core-js";

const state = {
  followedArtists: null,
  artistAlbums: null,
  artistTopTracks: [],
  artistRelatedArtists: [],
  currentArtist: null,
  latestAlbumID: null,
  simplifiedCategories: null,
  percentCompleted: null,
  FollowingArtistsBool: null
};

const mutations = {
  setFollowedArtists: (state, artists) => {
    if (!state.followedArtists || artists.offset == 0) {
      state.followedArtists = artists;
    } else {
      state.followedArtists.items = state.followedArtists.items.concat(
        artists.items
      );
      state.followedArtists.offset = artists.offset;
    }
  },
  unfollowMutation: (state, list) => {
    if (state.followedArtists && state.followedArtists.items)
      state.followedArtists.items = state.followedArtists.items.filter(
        artist => !list.includes(artist._id)
      );
    state.FollowingArtistsBool = [false];
    if (state.currentArtist && state.currentArtist.followersCount)
      state.currentArtist.followersCount--;
  },
  followMutation: state => {
    state.FollowingArtistsBool = [true];
    if (state.currentArtist) state.currentArtist.followersCount++;
  },
  setArtistAlbums: (state, list) => {
    if (
      !state.artistAlbums ||
      list.albums.offset == 0 ||
      list.albums.offset == state.artistAlbums.albums.offset
    ) {
      state.artistAlbums = list;
    } else {
      state.artistAlbums.albums.items = state.artistAlbums.albums.items.concat(
        list.albums.items
      );
      state.artistAlbums.albums.limit = state.artistAlbums.albums.items.length;
    }
  },
  setNewAlbum: (state, album) => state.artistAlbums.albums.items.push(album),
  setArtistTopTracks: (state, list) => (state.artistTopTracks = list),
  setArtistRelatedArtists: (state, list) => (state.artistRelatedArtists = list),
  setCurrentArtist: (state, artist) => (state.currentArtist = artist),
  setNewAlbumTrack: (state, track) => {
    state.latestAlbumID = null;
    for (let i = 0; i < state.artistAlbums.albums.items.length; i++) {
      if (state.artistAlbums.albums.items[i]._id == track.album) {
        state.artistAlbums.albums.items[i].tracks.push({
          name: track.name,
          _id: track._id
        });
        return;
      }
    }
  },
  setSimplifiedCategories: (state, list) => (state.simplifiedCategories = list),
  setLatestAlbumID: (state, id) => (state.latestAlbumID = id),
  editAlbumName: (state, album) => {
    for (let i = 0; i < state.artistAlbums.albums.items.length; i++) {
      if (state.artistAlbums.albums.items[i]._id == album._id) {
        state.artistAlbums.albums.items[i].name = album.name;
        break;
      }
    }
  },
  editTrackName: (state, track) => {
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
  removeAlbum: (state, id) => {
    state.artistAlbums.albums.items = state.artistAlbums.albums.items.filter(
      x => x._id != id
    );
  },
  removeTrack: (state, id) => {
    for (let i = 0; i < state.artistAlbums.albums.items.length; i++) {
      let len = state.artistAlbums.albums.items[i].tracks.length;
      state.artistAlbums.albums.items[
        i
      ].tracks = state.artistAlbums.albums.items[i].tracks.filter(
        x => x._id != id
      );
      if (state.artistAlbums.albums.items[i].tracks.length < len) return;
    }
  },
  setIsFollowing: (state, booleans) => (state.FollowingArtistsBool = booleans)
};

const getters = {
  latestAlbumIDGetter: state => state.latestAlbumID,
  uploadingDone: state => state.percentCompleted,
  currentArtistGetter: state => {
    return state.currentArtist;
  },

  allArtistTopTracks: state => {
    if (!state.artistTopTracks || state.artistTopTracks.length < 1) return null;
    var newValue = state.artistTopTracks.tracks.items;
    var tracks = [];

    newValue.forEach(element => {
      if (element && element.album) {
        var k = {
          album: {
            name: element.album.name,
            _id: element.album._id,
            image: element.album.image
          },
          durationMs: element.durationMs,
          explicit: element.explicit,
          premium: element.premium,
          _id: element._id,
          name: element.name
        };
        tracks.push(k);
      }
    });
    return tracks;
  },

  allArtistRelatedArtists: state => {
    var newValue = state.artistRelatedArtists;
    if (!newValue || !newValue.artists) return;
    var artists = [];
    newValue.artists.forEach(element => {
      var k = {
        name: element.name,
        image: element.imageUrl,
        description: element.type,
        id: element._id,
        type: element.type
      };
      artists.push(k);
    });
    return artists;
  },

  allFollowedArtists: state => {
    if (!state.followedArtists || !state.followedArtists.items) return;
    var artists = [];
    state.followedArtists.items.forEach(element => {
      var k = {
        name: element.name,
        image: element.imageUrl,
        description: element.type,
        id: element._id,
        type: element.type
      };
      artists.push(k);
    });
    return artists;
  },

  allArtistAlbums: state => {
    if (state.artistAlbums == null) return null;
    var newValue = state.artistAlbums.albums.items;
    var albums = [];
    newValue.forEach(element => {
      if (element.albumType == "album") {
        var k = {
          name: element.name,
          image: element.image,
          id: element.id,
          tracks: element.tracks
        };
        albums.push(k);
      }
    });
    return albums;
  },

  allArtistSingles: state => {
    if (state.artistAlbums == null) return null;
    var newValue = state.artistAlbums.albums.items;
    var albums = [];
    newValue.forEach(element => {
      if (element.albumType == "single") {
        var k = {
          name: element.name,
          image: element.image,
          id: element.id,
          tracks: element.tracks
        };
        albums.push(k);
      }
    });
    return albums;
  },

  isFollowed: state => state.FollowingArtistsBool
};

const actions = {
  /**
   * Delete artist's track
   * @param {object} payload contains token, id: track id
   */

  deleteTrack({ commit }, payload) {
    axios
      .delete(`/v1/users/track/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(commit("removeTrack", payload.id))
      .catch(error => {
        console.log("axios caught an error in deleteTrack");
        console.log(error);
      });
  },

  /**
   * Delete artist's album/single
   * @param {object} payload contains token, id: album/single id
   */

  deleteAlbum({ commit }, payload) {
    axios
      .delete(`/v1/albums/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(commit("removeAlbum", payload.id))
      .catch(error => {
        console.log("axios caught an error in deleteAlbum");
        console.log(error);
      });
  },

  /**
   * Rename artist's album/single
   * @param {object} payload contains token, id: album/single id, name: new name
   */

  renameAlbum({ commit }, payload) {
    axios
      .patch(
        `/v1/albums/${payload.id}`,
        {
          name: payload.name
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      .then(response => {
        commit("editAlbumName", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * Rename artist's track
   * @param {object} payload contains token, id: track id, name: new name
   */

  renameTrack({ commit }, payload) {
    axios
      .patch(
        `/v1/users/track/${payload.id}`,
        {
          name: payload.name
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      .then(response => {
        commit("editTrackName", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * Add new artist's album/single
   * @param {object} payload contains token, name: album/single name, cover: album/single image, type: 'album'/'single', copyrightsType: C/P, copyrightsText, releaseDate
   */

  addNewAlbum({ commit, state }, payload) {
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
        Authorization: `Bearer ${payload.token}`
      }
    };

    axios
      .post("/v1/albums", form, config)
      .then(response => {
        commit("setNewAlbum", response.data);
        commit("setLatestAlbumID", response.data._id);
      })
      .catch(error => console.log(error));
  },

  /**
   * Get track's categories, simplified: only name and id of each category
   * @param {object} payload contains token
   */

  getSimplifiedCategories({ commit }, payload) {
    var categories = [];
    axios
      .get("/v1/browse/categories", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(response => {
        response.data.categories.items.forEach(element => {
          categories.push({
            id: element._id,
            name: element.name
          });
        });
        commit("setSimplifiedCategories", categories);
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * Add new track to artist's album/single
   * @param {object} payload contains token, name: track name, track: mp3 track file, explicit: boolean, premium: boolean, categories
   */

  addTrackToAlbum({ commit, state }, payload) {
    const FormData = require("form-data");
    const form = new FormData();
    form.append("name", payload.title);
    form.append("track", payload.track);
    form.append("album", payload.album);
    form.append("explicit", payload.explicit);
    form.append("premium", payload.premium);
    payload.categories.forEach(category => {
      form.append("category", category);
    });
    const config = {
      onUploadProgress: function(progressEvent) {
        var x = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        state.percentCompleted = x == 100 ? 0 : x;
      },
      headers: {
        Authorization: `Bearer ${payload.token}`
      }
    };

    axios
      .post("/v1/users/tracks", form, config)
      .then(response => {
        commit("setNewAlbumTrack", response.data);
      })
      .catch(error => console.log(error));
  },

  /**
   * Get artist info
   * @param {object} payload contains token, id: artist id
   */

  getCurrentArtist({ commit }, payload) {
    axios
      .get(`v1/artists/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(response => {
        commit("setCurrentArtist", response.data);
      })
      .catch(error => {
        console.log("axios caught an error in getCurrentArtist");
        console.log(error);
      });
  },
  /**
   * Get followed artists by current user
   * @param {object} payload contains token
   */
  getFollowedArtists({ commit, dispatch }, payload) {
    const limit = 50;
    axios
      .get("/v1/me/following", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: { type: "artist", limit: limit, after: payload.after }
      })
      .then(response => {
        commit("setFollowedArtists", {
          items: response.data.artists.items,
          offset: payload.offset
        });
        if (response.data.next) {
          dispatch("getFollowedArtists", {
            token: payload.token,
            offset: payload.offset + limit,
            after: response.data.cursors.after
          });
        }
      })
      .catch(error => {
        console.log("axios caught an error in getFollowedArtists");
        console.log(error);
      });
  },

  /**
   * Get artist's albums
   * @param {object} payload contains token and artist id
   */

  getArtistAlbums({ commit, dispatch }, payload) {
    const limit = 50;
    axios
      .get(`/v1/artists/${payload.id}/albums`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: {
          limit: limit,
          offset: payload.offset
        }
      })
      .then(response => {
        commit("setArtistAlbums", response.data);
        if (response.data.albums.items.length >= limit) {
          dispatch("getArtistAlbums", {
            token: payload.token,
            id: payload.id,
            offset: payload.offset + limit
          });
        }
      })
      .catch(error => {
        console.log("axios caught an error in getArtistAlbums");
        console.log(error);
      });
  },

  /**
   * Get artist's top tracks
   * @param {object} payload contains token and artist id
   */

  getArtistTopTracks({ commit }, payload) {
    axios
      .get(`/v1/artists/${payload.id}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: {
          limit: payload.limit,
          offset: payload.offset
        }
      })
      .then(response => {
        commit("setArtistTopTracks", response.data);
      })
      .catch(error => {
        console.log("axios caught an error in getArtistTopTracks");
        console.log(error);
      });
  },

  /**
   * Fet artists related to a certain a artist
   * @param {object} payload contains token and artist id
   */

  getArtistRelatedArtists({ commit }, payload) {
    axios
      .get(`/v1/artists/${payload.id}/related-artists`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(response => {
        commit("setArtistRelatedArtists", response.data);
      })
      .catch(error => {
        console.log("axios caught an error in getArtistTopTracks");
        console.log(error);
      });
  },

  /**
   * Follow artist/user
   * @param {object} payload contains token, id: user/artist id,type: 'user'/'artist'
   */

  followArtist({ commit, dispatch }, payload) {
    axios
      .put(
        "v1/me/following",
        {
          type: payload.type,
          ids: payload.artists.join()
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          },

          params: {
            ids: payload.artists.join()
          }
        }
      )
      .then(() => {
        commit("followMutation");
        dispatch("getFollowedArtists", { token: payload.token });
      })
      .catch(error => {
        console.log("axios caught an error in followArtist");
        console.log(error);
      });
  },

  /**
   * Unfollow artist/user
   * @param {object} payload contains token, id: user/artist id,type: 'user'/'artist'
   */

  unfollowArtist({ commit }, payload) {
    axios
      .delete("/v1/me/following", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: {
          type: payload.type,
          ids: payload.artists.join()
        }
      })
      .then(commit("unfollowMutation", payload.artists))
      .catch(error => {
        console.log("axios caught an error in unfollowArtist");
        console.log(error);
      });
  },

  /**
   * Know if the current user following artists/users
   * @param {object} payload contains token, ids: list of users/artists ids
   */

  isFollowingArtists({ commit }, payload) {
    axios
      .get("/v1/me/following/contains", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: {
          ids: payload.artists.join()
        }
      })
      .then(response => {
        commit("setIsFollowing", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
