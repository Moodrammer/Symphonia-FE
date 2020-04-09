import axios from "axios";

const state = {
  trackName: "",
  liked: null,
  trackUrl: null,
  trackId: null,
  imageUrl: null,
  trackAlbumId: null,
  trackArtists: [
    {
      name: "",
      href: "",
    },
  ],
  generalLiked: null,
  firstTrackInQueue: false,
  lastTrackInQueue: false,
  queueTracks: [],
  queueNextTracks: [],
};

const mutations = {
  setTrackData(state, payload) {
    state.trackName = payload.name;
    state.imageUrl = payload.category[0].icons[0].url;
    axios
      .get("/v1/artists/" + payload.artist, {
        headers: {
          Authorization: payload.token,
        },
      })
      .then((response) => {
        let artist = {
          name: undefined,
          href: "",
        };
        artist.name = response.data.name;
        state.trackArtists[0] = artist;
      });
  },
  setLiked(state, payload) {
    if (payload.id == state.trackId) state.liked = payload.status;
    state.generalLiked = payload.status;
  },
  unlikeTrack(state, id) {
    if (id == state.trackId) state.liked = false;
    state.generalLiked = false;
  },
  likeTrack(state, id) {
    if (id == state.trackId) state.liked = true;
    state.generalLiked = true;
  },
  setTrackUrl(state, trackUrl) {
    state.trackUrl = trackUrl;
  },
  setID(state, id) {
    state.trackId = id;
  },
  setFirstTrackInQueue(state, a) {
    state.firstTrackInQueue = a;
  },
  setLastTrackInQueue(state, a) {
    state.lastTrackInQueue = a;
  },
  setQueueTracks(state, queueTracks) {
    state.queueTracks = queueTracks;
  },
  setTrackId(state, trackId) {
    state.trackId = trackId;
  },
};

const actions = {
  async getTrack({ commit }, payload) {
    await commit("setID", payload.id);
    axios
      .get("/v1/users/track/" + payload.id, {
        headers: {
          Authorization: payload.token,
        },
      })
      .then((response) => {
        let trackData = response.data;
        commit("setTrackData", trackData);
      })
      .catch((error) => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  checkSaved({ commit }, payload) {
    axios
      .get("/v1/me/tracks/contains?ids=" + payload.id, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      })
      .then((response) => {
        let liked = response.data;
        commit("setLiked", { status: liked, id: payload.id });
      })
      .catch((error) => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  removeSavedTrack({ commit }, payload) {
    axios
      .delete("/v1/me/tracks", {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        data: payload.id,
      })
      .then(() => {
        //   if(id[0]==state.trackId)           //comment it for now
        commit("unlikeTrack", payload.id);
      })
      .catch((error) => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  saveTrack({ commit }, payload) {
    axios
      .put(
        "/v1/me/tracks",
        { data: payload.id },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      )
      .then(() => {
        //if(id[0]==state.trackId)
        commit("likeTrack", payload.id);
      })
      .catch((error) => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  getQueueStore({ dispatch, state }, token) {
    axios({
      method: "get",
      url: "/v1/me/player/queue",
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      state.queueTracks = response.data.data.queueTracks;

      ///////////////////////////////
      //first time login (temporary behaviour)

      if (state.queueTracks.length == 0) {
        axios({
          method: "post",
          url: "/v1/me/player/tracks/" + "5e7d2ddd3429e24340ff1397",
          headers: {
            Authorization: token,
          },
          data: {
            contextId: "5e8a6d96d4be480ab1d91c95",
            context_type: "playlist",
            context_url: "https://localhost:3000/",
            device: "Chrome",
          },
          responseType: "arraybuffer",
        }).then((response) => {
          var blob = new Blob([response.data], { type: "audio/mpeg" });
          var objectUrl = URL.createObjectURL(blob);
          state.trackUrl = objectUrl;
        });
      } else {
        var tempTrackUrl = response.data.data.currentlyPlaying.currentTrack;
        //If i'm not in mocking
        //get the track id
        var songId = tempTrackUrl.slice(
          tempTrackUrl.indexOf("/tracks/") + "/tracks/".length,
          tempTrackUrl.length
        );
  
        state.trackId = songId;
        
        dispatch("updateQueueNextTracksInfo", token);
      }

      if (response.data.data.previousTrack == null) {
        state.firstTrackInQueue = true;
      } else {
        state.firstTrackInQueue = false;
      }

      if (response.data.data.nextTrack == null) {
        state.lastTrackInQueue = true;
      } else {
        state.lastTrackInQueue = false;
      }
    });
  },
  /**
   *
   * @param payload object contains songId, contextId, token
   */
  playSongStore({ dispatch, state }, payload) {
    //request the song mp3 file
    axios({
      method: "post",
      url: "/v1/me/player/tracks/" + payload.songId,
      data: {
        contextId: payload.contextId,
        context_type: "playlist",
        context_url: "https://localhost:3000/",
        device: "Chrome",
      },
      headers: {
        Authorization: payload.token,
      },
      responseType: "arraybuffer",
    }).then((response) => {
      var blob = new Blob([response.data], { type: "audio/mpeg" });
      var objectUrl = URL.createObjectURL(blob);
      state.trackUrl = objectUrl;

      var payloadTrack = {
        token: payload.token,
        id: payload.songId,
      };
      dispatch("getTrack", payloadTrack);
      dispatch("getQueueStore", payload.token);
    });
  },
  /**
   * update the queue next songs data
   */
  async updateQueueNextTracksInfo({ state }, token) {
    //get the start of next songs
    var i;
    var tempTrackUrl;
    var songId;

    for (i = 0; i < state.queueTracks.length; i++) {
      tempTrackUrl = state.queueTracks[i];

      songId = tempTrackUrl.slice(
        tempTrackUrl.indexOf("/tracks/") + "/tracks/".length,
        tempTrackUrl.length
      );
      if (state.trackId == songId) {
        break;
      }
    }

    var tracks = [];

    //request the data
    for (var j = i + 1; j < state.queueTracks.length; j++) {
      tempTrackUrl = state.queueTracks[j];

      songId = tempTrackUrl.slice(
        tempTrackUrl.indexOf("/tracks/") + "/tracks/".length,
        tempTrackUrl.length
      );

      var track = {
        name: undefined,
        artistName: undefined,
      };

      await axios
        .get("/v1/users/track/" + songId, {
          headers: {
            Authorization: token,
          },
        })
        .then(async (response) => {
          let trackData = response.data;

          track.name = trackData.name;

          //get the artist name
          await axios
            .get("/v1/artists/" + trackData.artist, {
              headers: {
                Authorization: token,
              },
            })
            .then((response) => {
              track.artistName = response.data.name;
            });
        });
      tracks.push(track);
    }
    state.queueNextTracks = tracks;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
