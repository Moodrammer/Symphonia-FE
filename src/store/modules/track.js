import axios from "axios";

const state = {
  token: "",
  trackToken: "",

  audioElement: undefined,

  trackName: "",
  trackUrl: null,
  trackId: null,
  trackArtistName: "",
  trackTotalDuration: 0,
  trackTotalDurationMs: 0,
  isTrackLiked: null,
  isTrackPaused: true,
  isTrackLoaded: false,
  isCurTrkReady: false,
  isFirstTrackInQueue: true,
  isLastTrackInQueue: true,
  isNextAndPreviousFinished: true,
  isBuffering: true,

  contextType: "",
  contextId: "",
  contextUrl: "",

  trackAlbumImageUrl: null,
  trackAlbumId: null,
  trackAlbumName: "",

  isQueueOpened: false,
  queueTracks: [],
  queueNextTracks: [],
  isRepeatEnabled: false,
  isRepeatOnceEnabled: false,
  isShuffleEnabled: false,

  generalLiked: null,

  facebookUrl: "#",
  twitterUrl: "#",

  picInPicCanvas: undefined,
  isPicInPicCanvasRdy: false,
  savedTracks: [],
  savedTracksNum: null,
  updateSavedTracks:false
};

const mutations = {
  setLiked(state, payload) {
    if (payload.id == state.trackId) state.isTrackLiked = payload.status[0];
    state.generalLiked = payload.status[0];
  },
  unlikeTrack(state, id) {
    if (id == state.trackId) state.isTrackLiked = false;
    state.generalLiked = false;
  },
  likeTrack(state, id) {
    if (id == state.trackId) state.isTrackLiked = true;
    state.generalLiked = true;
  },
  setTrackUrl(state, trackUrl) {
    state.audioElement.load();
    state.trackUrl = trackUrl;
  },
  setId(state, id) {
    state.trackId = id;
  },
  setFirstTrackInQueue(state, a) {
    state.isFirstTrackInQueue = a;
  },
  setLastTrackInQueue(state, a) {
    state.isLastTrackInQueue = a;
  },
  setQueueTracks(state, queueTracks) {
    state.queueTracks = queueTracks;
  },
  setTrackId(state, trackId) {
    state.trackId = trackId;
  },
  setTrackTotalDuration(state, trackTotalDuration) {
    state.trackTotalDuration = trackTotalDuration;
  },
  setAudioElement(state, audioElement) {
    state.audioElement = audioElement;
  },
  setIsTrackPaused(state, isTrackPaused) {
    state.isTrackPaused = isTrackPaused;
  },
  setIsQueueOpened(state, isQueueOpened) {
    state.isQueueOpened = isQueueOpened;
  },
  setIsTrackLoaded(state, isTrackLoaded) {
    state.isTrackLoaded = isTrackLoaded;
  },
  setIsTrackLiked(state, isTrackLiked) {
    state.isTrackLiked = isTrackLiked;
  },
  setIsBuffering(state, isBuffering) {
    state.isBuffering = isBuffering;
  },
  setToken(state, token) {
    state.token = token;
  },
  setContextType(state, contextType) {
    state.contextType = contextType;
  },
  setContextId(state, contextId) {
    state.contextId = contextId;
  },
  setContextUrl(state, contextUrl) {
    state.contextUrl = contextUrl;
    state.facebookUrl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      contextUrl +
      "&amp;src=sdkpreparse";
    state.twitterUrl = "https://twitter.com/intent/tweet?url=" + contextUrl;
  },
  setPicInPicCanvas(state, picInPicCanvas) {
    state.picInPicCanvas = picInPicCanvas;
  },
  load_tracks(state, list) {
    state.savedTracks = list;
  },
  setTracksNum(state, num) {
    state.savedTracksNum = num;
  },
  changeUpdateTracks(state) {
    state.updateSavedTracks=!state.updateSavedTracks;
  }
};

const actions = {
  async getTrackInformation({ state, dispatch }, payload) {
    if (payload.trackId != null) {
      await axios
        .get("/v1/users/track/" + payload.trackId, {
          headers: {
            Authorization: payload.token
          }
        })
        .then(async response => {
          let trackData = response.data;

          state.trackName = trackData.name;
          state.trackTotalDurationMs = trackData.durationMs;
          state.trackId = trackData._id;
          state.trackAlbumImageUrl = trackData.album.image;

          //configure PicInPicCanvasRdy
          state.isPicInPicCanvasRdy = false;

          const image = new Image();
          image.crossOrigin = true;
          image.src = trackData.album.image;
          await image.decode();
          var ctx = state.picInPicCanvas.getContext("2d");
          ctx.drawImage(image, 0, 0, 512, 512);

          ctx.font = "30px Comic Sans MS";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText(trackData.name, 512 / 2, 512 / 2);

          state.isPicInPicCanvasRdy = true;

          state.trackAlbumName = trackData.album.name;
          state.trackArtistName = trackData.artist.name;

          var token = payload.token.slice(
            payload.token.indexOf("Bearer ") + "Bearer ".length,
            payload.token.length
          );

          dispatch("checkSaved", {
            token: token,
            id: state.trackId
          });
        })
        .catch(error => {
          console.log("axios caught an error");
          console.log(error);
        });
    }
  },
  async checkSaved({ commit }, payload) {
    if (payload.token == null) {
      commit("unlikeTrack", payload.id);
    } else {
      await axios
        .get("/v1/me/tracks/contains?ids=" + payload.id, {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        })
        .then(response => {
          let isTrackLiked = response.data;
          commit("setLiked", { status: isTrackLiked, id: payload.id });
        })
        .catch(error => {
          console.log("axios caught an error");
          console.log(error);
        });
    }
  },
  async removeSavedTrack({ commit }, payload) {
    await axios
      .delete("/v1/me/tracks?ids=" + payload.id, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .then(() => {
        commit("unlikeTrack", payload.id);
        console.log("from track");
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  async saveTrack({ commit }, payload) {
    await axios
      .put(
        "/v1/me/tracks?ids=" + payload.id,
        {},
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      .then(() => {
        commit("likeTrack", payload.id);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  },
  /**
   * update the queue
   * @public
   * @param {string} token the authorization token with the Bearer prefix
   */
  async updateQueue({ state, dispatch }, token) {
    await axios({
      method: "get",
      url: "/v1/me/player/queue",
      headers: {
        Authorization: token
      }
    }).then(response => {
      state.queueTracks = response.data.data.queueTracks;

      dispatch("updateQueueTracksInfo", token);

      if (state.queueTracks.length == 0) {
        state.isLastTrackInQueue = false;
        state.isFirstTrackInQueue = false;
      } else {
        if (
          response.data.data.previousTrack == null ||
          state.queueTracks[0] ==
            response.data.data.currentlyPlaying.currentTrack
        ) {
          state.isFirstTrackInQueue = true;
        } else {
          state.isFirstTrackInQueue = false;
        }

        if (
          response.data.data.nextTrack == null ||
          state.queueTracks[state.queueTracks.length - 1] ==
            response.data.data.currentlyPlaying.currentTrack
        ) {
          state.isLastTrackInQueue = true;
        } else {
          state.isLastTrackInQueue = false;
        }
      }
    });
  },
  /**
   * initialize the queue status (repeat, repeatOnce, shuffle)
   * @public
   * @param {string} token the authorization token with the Bearer prefix
   */
  async initQueueStatus({ state }, token) {
    await axios({
      method: "get",
      url: "/v1/me/player/queue",
      headers: {
        Authorization: token
      }
    }).then(response => {
      state.queueTracks = response.data.data.queueTracks;

      state.isRepeatOnceEnabled = response.data.data.repeatOnce;
      state.isRepeatEnabled = response.data.data.repeat;
      state.isShuffleEnabled = response.data.data.shuffle;
    });
  },
  /**
   * update the queue next songs data
   * @public
   */
  async updateQueueTracksInfo({ state }, token) {
    state.queueNextTracks = [];

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
        artistName: undefined
      };

      await axios
        .get("/v1/users/track/" + songId, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          let trackData = response.data;

          track.name = trackData.name;
          track.durationMs = trackData.durationMs;

          track.artistName = trackData.artist.name;

          track.trackAlbumName = trackData.album.name;
        });
      tracks.push(track);
    }
    state.queueNextTracks = tracks;

    state.isCurTrkReady = true;
  },
  /**
   * toggle soundplayer pause and play
   * @public
   */
  togglePauseAndPlay({ state }) {
    if (!state.isBuffering) {
      if (!state.isTrackPaused) {
        state.audioElement.pause();
      } else {
        state.audioElement.play();
      }
    }
  },
  /**
   * get the currently playing track id
   *
   * @public
   * @returns {string} the track id
   */
  async getCurrentlyPlayingTrackId({ state }) {
    //get the currently playing track
    var songId;
    await axios({
      method: "get",
      url: "/v1/me/player/currently-playing",
      headers: {
        Authorization: state.token
      }
    }).then(response => {
      //get the track url
      var tempTrackUrl = response.data.data.currentTrack;
      //get the track id
      if (tempTrackUrl != null) {
        songId = tempTrackUrl.slice(
          tempTrackUrl.indexOf("/tracks/") + "/tracks/".length,
          tempTrackUrl.length
        );
      } else {
        songId = null;
      }
    });
    return songId;
  },
  /**
   * get the next song
   *
   * @public
   */
  async next({ state, dispatch, commit }) {
    state.isNextAndPreviousFinished = false;
    state.isCurTrkReady = false;

    if (state.isRepeatOnceEnabled) {
      await dispatch("toggleRepeatOnce");
    }

    state.isBuffering = true;
    state.audioElement.autoplay = true;

    var tempTrackUrl;

    if (state.isShuffleEnabled) {
      var randomTrackNo = Math.floor(Math.random() * state.queueTracks.length);
      tempTrackUrl = state.queueTracks[randomTrackNo];
    } else if (state.isLastTrackInQueue) {
      tempTrackUrl = state.queueTracks[0];
    }

    if (state.isLastTrackInQueue || state.isShuffleEnabled) {
      var trackId = tempTrackUrl.slice(
        tempTrackUrl.indexOf("/tracks/") + "/tracks/".length,
        tempTrackUrl.length
      );

      await dispatch("getTrackInformation", {
        token: state.token,
        trackId: trackId
      });

      await dispatch("playTrackInQueue", trackId);
      await dispatch("updateQueue", state.token);

      state.isNextAndPreviousFinished = true;
    } else {
      await axios({
        method: "post",
        url: "/v1/me/player/next",
        headers: {
          Authorization: state.token
        }
      }).then(async () => {
        var CurrentlyPlayingTrackId = await dispatch(
          "getCurrentlyPlayingTrackId"
        );
        await dispatch("getTrackInformation", {
          token: state.token,
          trackId: CurrentlyPlayingTrackId
        });
        await dispatch("updateQueue", state.token);

        var audioSource =
          axios.defaults.baseURL +
          "/v1/me/player/tracks/" +
          CurrentlyPlayingTrackId +
          "/" +
          state.trackToken;

        commit("setTrackUrl", audioSource);

        state.isNextAndPreviousFinished = true;
      });
    }
  },
  /**
   * get the previous song
   *
   * @public
   */
  async previous({ state, dispatch, commit }) {
    state.isNextAndPreviousFinished = false;
    state.isCurTrkReady = false;

    if (state.isRepeatOnceEnabled) {
      await dispatch("toggleRepeatOnce");
    }

    state.isBuffering = true;
    state.audioElement.autoplay = true;

    var tempTrackUrl;

    if (state.isShuffleEnabled) {
      var randomTrackNo = Math.floor(Math.random() * state.queueTracks.length);
      tempTrackUrl = state.queueTracks[randomTrackNo];
    } else if (state.isFirstTrackInQueue) {
      tempTrackUrl = state.queueTracks[state.queueTracks.length - 1];
    }

    if (state.isFirstTrackInQueue || state.isShuffleEnabled) {
      var trackId = tempTrackUrl.slice(
        tempTrackUrl.indexOf("/tracks/") + "/tracks/".length,
        tempTrackUrl.length
      );

      await dispatch("getTrackInformation", {
        token: state.token,
        trackId: trackId
      });

      await dispatch("playTrackInQueue", trackId);
      await dispatch("updateQueue", state.token);

      state.isNextAndPreviousFinished = true;
    } else {
      await axios({
        method: "post",
        url: "/v1/me/player/previous",
        headers: {
          Authorization: state.token
        }
      }).then(async () => {
        var CurrentlyPlayingTrackId = await dispatch(
          "getCurrentlyPlayingTrackId"
        );
        await dispatch("getTrackInformation", {
          token: state.token,
          trackId: CurrentlyPlayingTrackId
        });
        await dispatch("updateQueue", state.token);

        var audioSource =
          axios.defaults.baseURL +
          "/v1/me/player/tracks/" +
          CurrentlyPlayingTrackId +
          "/" +
          state.trackToken;

        commit("setTrackUrl", audioSource);

        state.isNextAndPreviousFinished = true;
      });
    }
  },
  /**
   * play a song in the queue
   *
   * @public
   *
   * @param {string} trackId the track Id to be played
   */
  async playTrackInQueue({ state, dispatch, commit }, trackId) {
    if (trackId != null) {
      await axios({
        method: "post",
        url: "/v1/me/player/tracks/" + trackId,
        data: {
          contextId: state.contextId,
          context_type: state.contextType,
          context_url: state.contextUrl,
          device: "Chrome"
        },
        headers: {
          Authorization: state.token
        }
      }).then(response => {
        axios({
          method: "get",
          url: "/v1/me/player/queue",
          headers: {
            Authorization: state.token
          }
        }).then(response => {
          if (response.data.data.repeat != state.isRepeatEnabled) {
            state.isRepeatEnabled = false;
            dispatch("toggleRepeat");
          } else if (response.data.data.repeat != state.isRepeatEnabled) {
            state.isRepeatEnabled = false;
            dispatch("toggleRepeatOnce");
          }

          if (response.data.data.shuffle != state.isShuffleEnabled) {
            state.isShuffleEnabled = false;
            dispatch("toggleShuffle");
          }
        });

        state.trackToken = response.data.data;
        var audioSource =
          axios.defaults.baseURL +
          "/v1/me/player/tracks/" +
          trackId +
          "/" +
          state.trackToken;
        commit("setTrackUrl", audioSource);
      });
    }
  },
  /**
   * toggle repeat once
   *
   * @public
   */
  async toggleRepeatOnce({ state }) {
    await axios({
      method: "patch",
      url: "/v1/me/player/repeatOnce",
      headers: {
        Authorization: state.token
      }
    }).then(() => {
      state.isRepeatOnceEnabled = !state.isRepeatOnceEnabled;
    });
  },
  /**
   * toggle repeat
   *
   * @public
   */
  async toggleRepeat({ state }) {
    await axios({
      method: "patch",
      url: "/v1/me/player/repeat",
      headers: {
        Authorization: state.token
      }
    }).then(() => {
      state.isRepeatEnabled = !state.isRepeatEnabled;
    });
  },
  /**
   * enable the shuffle feature
   * @public
   */
  toggleShuffle({ state }) {
    axios({
      method: "patch",
      url: "/v1/me/player/shuffle",
      headers: {
        Authorization: state.token
      }
    }).then(() => {
      state.isShuffleEnabled = !state.isShuffleEnabled;
    });
  },
  /**
   * copy the context Url
   * @public
   */
  copyLink({ state }) {
    const dummyTextAreaElement = document.createElement("textarea");
    dummyTextAreaElement.value = state.contextUrl;
    document.body.appendChild(dummyTextAreaElement);
    dummyTextAreaElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyTextAreaElement);
  },
  getTracks({ commit }, payload) {
    axios
      .get("/v1/me/tracks", {
        headers: {
          Authorization: `Bearer ${payload}`
        }
      })
      .then(response => {
        let list = response.data.tracks.items;
        commit("setTracksNum", response.data.tracks.total);
        commit("load_tracks", list);
      })
      .catch(error => {
        console.log("axios caught an error");
        console.log(error);
      });
  }
};

const getters = {
  tracksGetter: state => state.savedTracks
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
