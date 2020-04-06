import axios from "axios";
import { Math } from "core-js";

const state = {
  followedArtists: [],
  artistAlbums: [],
  artistTopTracks: [],
  artistRelatedArtists: []
};

const mutations = {
  load_followed_artists: (state, list) => state.followedArtists = list,
  unfollow_artists: (state, list) => state.followedArtists = state.followedArtists.filter(artist => !list.includes(artist.id)),
  load_artistAlbums:(state, list) => state.artistAlbums = list,
  load_artistTopTracks: (state, list) => state.artistTopTracks = list,
  load_artistRelatedArtists: (state, list) => state.artistRelatedArtists = list,
};

const getters = {

  allArtistTopTracks: (state) => {
    var newValue = state.artistTopTracks;
    console.log("ya raaab",newValue)
    var artists = [];
    newValue.forEach(element => {
      var k = {
        name: element.name,
        image: element.album.images[0].url,
        duration: Math.floor(element.duration_ms/60000) + ":" + (Math.floor((element.duration_ms/1000)%60) > 9 ? Math.floor((element.duration_ms/1000)%60): "0"+Math.floor((element.duration_ms/1000)%60)),
        id: element.id,
        url: "url to be added"
      }
      console.log("k",k)
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
        url: "url to be added"
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
        url: "url to be added"
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
        url: "url to be added"
      }
      albums.push(k);
    });
    return albums;
  }
}



const actions = {
  getFollowedArtists({ commit }, payload) {
    console.log("saad token",payload.token)
    console.log(payload.token)
    axios
      .get("/v1/me/following", {
        headers: {
          Authorization: `Bearer ${payload.token}`
        },
        params: { type: 'artist' }
      })
      .then(response => { console.log("Saad art",response); commit("load_followed_artists", response.data);} )
      .catch(error => {
        console.log("axios caught an error in getFollowedArtists");
        console.log(error);
      });
  },


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
      })
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};