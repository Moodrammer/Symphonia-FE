import axios from "axios";

const state = {
  followedArtists: []
};

const mutations = {
  load_followed_artists: (state, list) => state.followedArtists = list,
  unfollow_artists: (state, list) => state.followedArtists = state.followedArtists.filter(artist => !list.includes(artist.id))
};

const getters = {
  allFollowedArtists: function (state) {
    var newValue = state.followedArtists;
    var artists = [];
    newValue.forEach(element => {
      var k = {
        name: element.name,
        image: element.images[0].url,
        description: element.type,
        id: element.id,
        url: element.href
      }
      artists.push(k);
    });
    return artists;
  }
}


const token = localStorage.getItem("userToken");

const actions = {
  getFollowedArtists({ commit }) {
    axios
      .get("/v1/me/following", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { type: 'artist' }
      })
      .then(response => commit("load_followed_artists", response.data))
      .catch(error => {
        console.log("axios caught an error in getFollowedArtists");
        console.log(error);
      });
  },



  unfollowArtist({ commit }, artists) {

    axios.delete('/v1/me/following', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { type: 'artist' },
      data: artists
    }).then(
      commit("unfollow_artists", artists)
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