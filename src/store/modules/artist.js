import axios from "axios";
import { Math } from "core-js";

const state = {
  followedArtists: [],
  artistAlbums: [],
  artistTopTracks: [],
  artistRelatedArtists: [],
  currentArtist: null
};

const mutations = {
  load_followedArtists: (state, list) => state.followedArtists = list,
  unfollow_artists: (state, list) => state.followedArtists = state.followedArtists.filter(artist => !list.includes(artist.id)),
  load_artistAlbums:(state, list) => state.artistAlbums = list,
  load_artistTopTracks: (state, list) => state.artistTopTracks = list,
  load_artistRelatedArtists: (state, list) => state.artistRelatedArtists = list,
  load_currentArtist: (state, artist) => state.currentArtist = artist,
};

const getters = {

  currentArtistGetter: (state) => {
    console.log("haha",state.currentArtist)
    return state.currentArtist
  },

  allArtistTopTracks: (state) => {
    var newValue = state.artistTopTracks;
    var artists = [];
    newValue.forEach(element => {
      var k = {
        name: element.name,
        image: element.album.images[0].url,
        duration: Math.floor(element.duration_ms/60000) + ":" + (Math.floor((element.duration_ms/1000)%60) > 9 ? Math.floor((element.duration_ms/1000)%60): "0"+Math.floor((element.duration_ms/1000)%60)),
        id: element.id,
        type: element.type
      }
      artists.push(k);
    });
    return artists;
  },

  allArtistRelatedArtists: (state) => {
    var newValue = state.artistRelatedArtists;
    var artists = [];
    newValue.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0].url,
        description: element.type,
        id: element.id,
        type: element.type
      }
      artists.push(k);
    });
    return artists;
  },

  allFollowedArtists: (state) => {
    var newValue = state.followedArtists;
    var artists = [];
    newValue.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0].url,
        description: element.type,
        id: element.id,
        type: element.type
      }
      artists.push(k);
    });
    return artists;
  },
  
  allArtistAlbums: (state) => {
    var newValue = state.artistAlbums;
    var albums = [];
    newValue.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0].url,
        id: element.id,
        type: element.type
      }
      albums.push(k);
    });
    return albums;
  }
};


const actions = {

  getCurrentArtist({commit}, payload){
    axios
    .get(`v1/artists/${payload.id}`, {
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  })
  .then(response => { console.log("Saad art",response); commit("load_currentArtist", response.data);} )
  .catch(error => {
    console.log("axios caught an error in getCurrentArtist");
    console.log(error);
  });
  },
/**
 * called to get followed artists by current user
 * @param {object} payload contains the token 
 */
  getFollowedArtists({ commit }, payload) {
    console.log("saad token",payload.token)
    console.log(payload.token)
    axios
      .get("/v1/me/following", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: { type: "artist" }
      })
      .then(response => { console.log("Saad art",response); commit("load_followedArtists", response.data);} )
      .catch(error => {
        console.log("axios caught an error in getFollowedArtists");
        console.log(error);
      });
  },

/**
 * called to get artist's albums 
 * @param {object} payload contains the token and the artist id 
 */

  getArtistAlbums({ commit }, payload) {
    console.log("token",payload.token)
    console.log(payload.id)
    axios
      .get(`/v1/artists/${payload.id}/albums`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: {
          //include_groups=appears_on&country=ES&limit=2&offset'
          country: "from_token",
          limiy: 50,
          include_groups:"album"
        }
      })
      .then(response => { console.log("Saad art",response); commit("load_artistAlbums", response.data);} )
      .catch(error => {
        console.log("axios caught an error in getArtistAlbums");
        console.log(error);
      });
  },

  /**
   * called to get artist's top tracks 
   * @param {object} payload contains the token and the artist id
   */

  getArtistTopTracks({ commit }, payload) {
    console.log("token",payload.token)
    console.log(payload.id)
    axios
      .get(`/v1/artists/${payload.id}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: {
          country: "from_token",
        }
      })
      .then(response => { console.log("getArtistTopTracks",response.data); commit("load_artistTopTracks", response.data);} )
      .catch(error => {
        console.log("axios caught an error in getArtistTopTracks");
        console.log(error);
      });
  },

    /**
   * called to get artists related to a certain a artist 
   * @param {object} payload contains the token and the artist id
   */

  getArtistRelatedArtists({ commit }, payload) {
    console.log("token art",payload.token)
    console.log(payload.id)
    axios
      .get(`/v1/artists/${payload.id}/related-artists`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
      })
      .then(response => { console.log("getArtistRelatedArtists",response); commit("load_artistRelatedArtists", response.data);} )
      .catch(error => {
        console.log("axios caught an error in getArtistTopTracks");
        console.log(error);
      });
  },


  /**
   * called to unfollow artist
   * @param {object} payload contains the token and the artist id
   */

  unfollowArtist({ commit }, payload) {

    axios.delete('/v1/me/following', {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
      params: { type: 'artist' },
      data: payload.artists
    }).then(
      commit("unfollow_artists", payload.artists)
    )
      .catch(error => {
        console.log("axios caught an error in unfollowArtist");
        console.log(error);
      });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
