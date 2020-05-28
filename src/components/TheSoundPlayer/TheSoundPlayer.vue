<template>
  <v-footer app class="sound-player">
    <audio
      ref="audiofile"
      :src="trackUrl"
      style="display:none;"
      preload="auto"
    ></audio>

    <v-row style="min-width: 100%;" flat color="rgba(0,0,0,0)">
      <v-col cols="12" v-bind:class="{ 'no-padding-xs': isXs() }">
        <sound-grapher v-if="isSoundgrapherEnabled" />
      </v-col>
    </v-row>

    <!-- song info -->
    <v-row>
      <v-col
        lg="4"
        md="4"
        sm="12"
        xs="12"
        v-bind:class="{ 'no-padding-xs': isXs() }"
      >
        <v-toolbar flat color="rgba(0,0,0,0)">
          <v-avatar tile size="56" class="hidden-sm-and-down">
            <img :src="trackAlbumImageUrl" />
          </v-avatar>
          <v-avatar tile size="40" class="hidden-md-and-up">
            <img :src="trackAlbumImageUrl" />
          </v-avatar>
          <div
            style="padding-left: 14px; padding-top: 14px; margin-right: 14px;"
          >
            <router-link to="#" class="song-name">
              {{ trackName }}
            </router-link>
            <router-link to="#" class="singer-name">
              {{ trackArtistName }}
            </router-link>
          </div>

          <!-- Like -->
          <a @click="saveToLikedSongs()" v-if="!isTrackLiked">
            <v-icon small title="save your liked songs" class="icons">
              mdi-heart-outline
            </v-icon>
          </a>
          <a @click="saveToLikedSongs()" v-if="isTrackLiked">
            <v-icon
              small
              title="save your liked songs"
              class="icons"
              color="green"
            >
              mdi-heart
            </v-icon>
          </a>

          <!-- share -->

          <v-menu offset-y top transition="slide-y-transition">
            <template v-slot:activator="{ on }">
              <v-btn :ripple="false" id="no-background-hover" text v-on="on">
                <span class="mdi mdi-18px mdi-share icons"></span>
              </v-btn>
            </template>

            <v-list style="background-color: #282828 !important">
              <v-list-item>
                <v-list-item-title>
                  <!-- Your share button code -->
                  <a
                    style="text-decoration: none;"
                    target="_blank"
                    :href="facebookUrl"
                  >
                    <v-icon color="blue">mdi-facebook</v-icon></a
                  >
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>
                  <!-- Your share button code -->
                  <a
                    style="text-decoration: none;"
                    target="_blank"
                    :href="twitterUrl"
                  >
                    <v-icon color="cyan">mdi-twitter</v-icon></a
                  >
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <a @click="copyLink">
                  <v-icon color="white" title="copy link"
                    >mdi-content-copy</v-icon
                  >
                </a>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- picture-in-picture -->
          <a @click="picInPic">
            <v-icon class="icons">mdi-picture-in-picture-bottom-right</v-icon>
          </a>
        </v-toolbar>
      </v-col>

      <v-col
        lg="5"
        md="5"
        sm="5"
        xs="5"
        v-bind:class="{ 'no-padding-xs': isXs() }"
      >
        <div class="audio-controls">
          <!-- shuffle -->
          <a
            @click="toggleShuffle()"
            v-if="!isShuffleEnabled"
            title="shuffle"
            style="margin-right: 20px;"
          >
            <v-icon small class="icons">
              mdi-shuffle-variant
            </v-icon>
          </a>

          <a
            @click="toggleShuffle()"
            v-if="isShuffleEnabled"
            title="shuffle"
            style="margin-right: 20px;"
          >
            <v-icon small color="green">
              mdi-shuffle-variant
            </v-icon>
          </a>

          <!-- Previous -->
          <a
            @click="previousConditionally()"
            v-if="!isFirstTrackInQueue || isRepeatEnabled"
            title="Previous"
            id="previous"
            style="margin-right: 10px;"
          >
            <v-icon medium class="icons">
              mdi-skip-previous
            </v-icon>
          </a>
          <a
            v-if="isFirstTrackInQueue && !isRepeatEnabled"
            title="Previous"
            id="previous"
            style="margin-right: 10px;"
          >
            <v-icon medium>
              mdi-skip-previous
            </v-icon>
          </a>

          <!-- Start and Pause -->
          <a
            @click="togglePauseAndPlay()"
            v-if="!isBuffering"
            style="width: 36px; height: 36px;"
            disabled
            id="playPause"
          >
            <v-icon v-if="isTrackPaused" large class="icons" title="play">
              mdi-play-circle-outline
            </v-icon>
            <v-icon v-if="!isTrackPaused" large class="icons" title="pause">
              mdi-pause-circle-outline
            </v-icon>
          </a>
          <img
            v-if="isBuffering"
            style="width: 36px; height: 36px; vertical-align: middle;"
            src="/loadingPlay.gif"
          />

          <!-- Next -->
          <a
            @click="nextConditionally()"
            title="Next"
            id="next"
            style="margin-left: 10px;"
          >
            <v-icon medium class="icons">
              mdi-skip-next
            </v-icon>
          </a>

          <!-- Repeat -->
          <a
            @click="toggleRepeatConditionally()"
            v-if="!isRepeatEnabled && !isRepeatOnceEnabled"
            title="Enable repeat"
            style="margin-left: 20px;"
          >
            <v-icon small class="icons">
              mdi-repeat
            </v-icon>
          </a>

          <a
            id="enableRepeatOnce"
            @click="
              toggleRepeatConditionally();
              toggleRepeatOnceConditionally();
            "
            v-if="isRepeatEnabled && !isRepeatOnceEnabled"
            title="Enable repeat once"
            style="margin-left: 20px;"
          >
            <!-- <v-icon small class="icons" color="green"> -->
            <v-icon small class="icons" color="green">
              mdi-repeat
            </v-icon>
          </a>
          <!-- v-if="!isRepeatEnabled && isRepeatOnceEnabled" -->
          <a
            id="disableRepeatOnce"
            @click="toggleRepeatOnceConditionally()"
            v-if="!isRepeatEnabled && isRepeatOnceEnabled"
            title="Disable repeat once"
            style="margin-left: 20px;"
          >
            <v-icon small class="icons" color="green">
              mdi-repeat-once
            </v-icon>
          </a>
        </div>

        <!-- progress bar -->
        <v-toolbar flat color="rgba(0,0,0,0)" height="10">
          <span class="time" style="padding-right: 10px; margin-top:0px;">{{
            currentTime
          }}</span>
          <input
            id="songBar"
            type="range"
            min="0"
            v-bind:max="trackTotalDuration"
            @mousedown="isProgressBarPressed = true"
            @mouseup="
              audioElement.currentTime = currentTimeInSec;
              isProgressBarPressed = false;
            "
            v-model="currentTimeInSec"
            class="hidden-sm-and-down"
          />

          <input
            id="songBar"
            type="range"
            min="0"
            v-bind:max="trackTotalDuration"
            @mousedown="isProgressBarPressed = true"
            @mouseup="
              audioElement.currentTime = currentTimeInSec;
              isProgressBarPressed = false;
            "
            v-model="currentTimeInSec"
            class="progress-slider-sm hidden-md-and-up"
          />

          <span class="time" style="padding-left: 10px; margin-top:0px;">{{
            duration
          }}</span>
        </v-toolbar>
      </v-col>

      <v-col
        lg="2"
        md="2"
        sm="7"
        xs="7"
        style="background: rgba(0, 0, 0, 0);"
        v-bind:class="{ 'no-padding-xs': isXs() }"
      >
        <div style="padding-top: 20px;">
          <router-link
            to="/webhome/collection/queue"
            title="queue"
            id="queue"
            style="margin-right: 10px; float: left; text-decoration: none;"
          >
            <v-icon
              small
              v-bind:class="{
                'green-icon': isQueueOpened,
                icons: !isQueueOpened,
              }"
            >
              mdi-format-list-numbered-rtl
            </v-icon>
          </router-link>
          <!-- mute -->
          <a
            @click="mute()"
            title="Mute"
            id="mute"
            style="float: left; margin-right: 10px;"
          >
            <v-icon v-if="isMuted" class="icons">
              mdi-volume-mute
            </v-icon>
            <v-icon v-if="!isMuted" class="icons">
              mdi-volume-high
            </v-icon>
          </a>
          <input
            id="volumeBar"
            type="range"
            min="0"
            max="100"
            class="volume-slider"
            v-model="volumeValue"
            v-on:mousdown="isVolumeBarPressed = true"
            v-on:mouseup="
              updateVolume();
              isVolumeBarPressed = false;
            "
          />
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
/**
 * The Sound player content after logging in.
 * @version 1.0.0
 */

import { mapMutations, mapActions, mapState } from "vuex";
import getuserToken from "../../mixins/userService/getUserToken";
import SoundGrapher from "./TheSoundGrapher.vue";
import getDeviceSize from "../../mixins/getDeviceSize";

export default {
  name: "soundplayer",

  components: {
    SoundGrapher,
  },

  mixins: [getuserToken, getDeviceSize],

  computed: {
    duration: function() {
      return this.audioElement
        ? this.convertTimeHHMMSS(this.trackTotalDuration)
        : "";
    },

    ...mapState({
      isTrackLiked: (state) => state.track.isTrackLiked,
      trackUrl: (state) => state.track.trackUrl,
      trackName: (state) => state.track.trackName,
      trackArtistName: (state) => state.track.trackArtistName,
      trackAlbumImageUrl: (state) => state.track.trackAlbumImageUrl,
      isFirstTrackInQueue: (state) => state.track.isFirstTrackInQueue,
      trackTotalDuration: (state) => state.track.trackTotalDuration,
      trackId: (state) => state.track.trackId,
      audioElement: (state) => state.track.audioElement,
      isTrackPaused: (state) => state.track.isTrackPaused,
      isQueueOpened: (state) => state.track.isQueueOpened,
      isNextAndPreviousFinished: (state) =>
        state.track.isNextAndPreviousFinished,
      isBuffering: (state) => state.track.isBuffering,
      token: (state) => state.track.token,
      isRepeatOnceEnabled: (state) => state.track.isRepeatOnceEnabled,
      isRepeatEnabled: (state) => state.track.isRepeatEnabled,
      isShuffleEnabled: (state) => state.track.isShuffleEnabled,
      isLastTrackInQueue: (state) => state.track.isLastTrackInQueue,
      historyResponse: (state) => state.category.historyResponse,
      facebookUrl: (state) => state.track.facebookUrl,
      twitterUrl: (state) => state.track.twitterUrl,
      picInPicCanvas: (state) => state.track.picInPicCanvas,
      isPicInPicCanvasRdy: (state) => state.track.isPicInPicCanvasRdy,
    }),
  },
  data() {
    return {
      //Audio info:
      currentTime: "00:00",
      volumeValue: 50,
      previousVolumeValue: 50,
      currentTimeInSec: 0,

      //Flags:
      isMuted: false,
      isProgressBarPressed: false,
      isVolumePressed: false,
      isSoundgrapherEnabled: false,

      devices: undefined,
      currentDeviceId: undefined,

      picInPicVideo: undefined,
    };
  },
  methods: {
    ...mapMutations("track", [
      "setTrackData",
      "setTrackUrl",
      "setTrackId",
      "setFirstTrackInQueue",
      "setQueueTracks",
      "setTrackTotalDuration",
      "setAudioElement",
      "setIsTrackLoaded",
      "setIsTrackPaused",
      "setIsTrackLiked",
      "setIsBuffering",
      "setToken",
      "setContextType",
      "setContextId",
      "setContextUrl",
      "setPicInPicCanvas",
    ]),
    ...mapActions("track", [
      "getTrackInformation",
      "initQueueStatus",
      "updateQueue",
      "togglePauseAndPlay",
      "next",
      "previous",
      "getCurrentlyPlayingTrackId",
      "playTrackInQueue",
      "toggleRepeatOnce",
      "toggleRepeat",
      "toggleShuffle",
      "saveTrack",
      "removeSavedTrack",
      "copyLink",
    ]),
    ...mapActions("category", ["recentlyPlayed"]),
    /**
     * convert time in seconds to MM:SS format
     * @param {string} value the time in seconds to be converted
     * @public
     */
    convertTimeHHMMSS: function(value) {
      /*val is the time passed from the start of the sound in integer seconds
      new Data(val * 1000) get a date from 1970 2:00:00 and advance it with 
      milli seconds convert it to ISO format YYYY-MM-DDTHH:mm:ss.sssZ
      take only the HH:mm:ss part */
      var hhmmss = new Date(value * 1000).toISOString().substr(11, 8);

      //if the hh part is 00: then show only mm:ss part. .indexOf('a')
      //returns the index of the first element in an array starts with 'a'
      return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
    },
    /**
     * invoke toggleRepeatOnce in case the next and previous
     * procedures are finished.
     *
     * @public
     */
    toggleRepeatOnceConditionally: function() {
      if (this.isNextAndPreviousFinished) {
        this.toggleRepeatOnce();
      }
    },
    /**
     * invoke toggleRepeat in case the next and previous
     * procedures are finished.
     *
     * @public
     */
    toggleRepeatConditionally: function() {
      if (this.isNextAndPreviousFinished) {
        this.toggleRepeat();
      }
    },
    /**
     * play the next track in case previous and next are finished
     *
     * @public
     */
    nextConditionally: function() {
      if (this.isNextAndPreviousFinished && this.trackId != null) {
        this.next();
      }
    },
    /**
     * play the previous track in case previous and next are finished
     *
     * @public
     */
    previousConditionally: function() {
      if (
        (!this.isFirstTrackInQueue || this.isRepeatEnabled) &&
        this.isNextAndPreviousFinished &&
        this.trackId != null
      ) {
        this.previous();
      }
    },
    /**
     * change the liked state of the song
     *
     * @public
     */
    saveToLikedSongs: async function() {
      try {
        if (this.trackId != null) {
          if (!this.isTrackLiked) {
            await this.saveTrack({
              token: this.getuserToken(),
              id: this.trackId,
            });
            this.$store.commit("track/changeUpdateTracks");
          } else {
            await this.removeSavedTrack({
              token: this.getuserToken(),
              id: this.trackId,
            });
            this.$store.commit("track/changeUpdateTracks");
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Update the volume
     *
     * @public
     */
    updateVolume: function() {
      if (this.volumeValue < 0 || this.volumeValue > 100) {
        return;
      } else {
        this.audioElement.volume = this.volumeValue / 100;
        if (this.volumeValue != 0) {
          if (this.isMuted) {
            this.previousVolumeValue = this.volumeValue;
            this.mute();
          } else {
            return;
          }
        } else {
          if (!this.isMuted) {
            //the case when slide to 0 more than one time in a
            //consecutive way
            this.mute();
          } else {
            return;
          }
        }
      }
    },
    /**
     * mute the sound. Invoked when the sound icon
     * is pressed or the volume slider went to 0 position.
     *
     * @public
     */
    mute: function() {
      this.isMuted = !this.isMuted;
      this.audioElement.muted = this.isMuted;
      if (this.isMuted) {
        if (this.volumeValue == 0)
          //the case when the sound is muted due to the slider
          this.previousVolumeValue = 50;
        else this.previousVolumeValue = this.volumeValue;
      }
      this.volumeValue = this.isMuted ? 0 : this.previousVolumeValue;
      this.audioElement.volume = this.volumeValue / 100; //update the volume
    },
    /**
     * open the picture in picture window
     *
     * @public
     */
    picInPic: async function() {
      try {
        if (this.isPicInPicCanvasRdy == true) {
          await this.picInPicVideo.play();
          await this.picInPicVideo.requestPictureInPicture();
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * This handler is invoked after track is loaded
     *
     * @public
     */
    _handleLoaded: function() {
      //The HTMLMediaElement.readyState property indicates the
      //readiness state of the media. (this.audioElement.readyState >= 2)
      // Data is available
      if (this.audioElement.readyState >= 2) {
        this.setIsTrackLoaded(true);
        this.setIsBuffering(false);

        this.setTrackTotalDuration(parseInt(this.audioElement.duration));
      } else {
        return;
      }
    },
    /**
     * This handler is invoked when the track
     * time is changed due to playing.
     *
     * @public
     */
    _handlePlayingUI: function() {
      //this.audioElement.currentTime gets the current time of the playing track
      //in terms of how many seconds have been passed.
      var currTime = parseInt(this.audioElement.currentTime);

      if (!this.isProgressBarPressed) {
        this.currentTimeInSec = currTime;
      }

      this.currentTime = this.convertTimeHHMMSS(currTime);
    },
    /**
     * This handler is invoked when the track is paused
     *
     * @public
     */
    _handlePause: function() {
      this.setIsTrackPaused(true);
    },
    /**
     * This handler is invoked when the track is played
     *
     * @public
     */
    _handlePlay: function() {
      this.setIsTrackPaused(false);
    },
    /**
     * This handler is invoked when the track started
     * buffering.
     *
     * @public
     */
    _handlerWaiting: function() {
      this.setIsBuffering(true);
    },
    /**
     * This handler is invoked when track finsihed buffering
     *
     * @public
     */
    _handlePlayingAfterBuffering: function() {
      this.setIsBuffering(false);
    },
    /**
     * This handler is invoked when the track is finished
     *
     * @public
     */
    _handleEndedTrack: function() {
      if (this.isRepeatOnceEnabled) {
        this.audioElement.play();
      } else if (this.isLastTrackInQueue && this.isRepeatEnabled) {
        this.next();
      } else if (!this.isLastTrackInQueue) {
        this.next();
      } else {
        return;
      }
    },
    /**
     * This handler is invoked when there's an error in audio
     *
     * @public
     */
    _handleAudioError: function() {
      let errorCode = this.audioElement.error.code;
      if (errorCode == 4) {
        //song token expired
        this.playTrackInQueue(this.trackId);
      } else {
        console.log(this.audioElement.error.code);
      }
    },
    /**
     * when user press play in PicInPic canvas
     *
     * @public
     */
    _handlePicInPicPlay: function() {
      this.togglePauseAndPlay();
      if (document.pictureInPictureElement)
        document.pictureInPictureElement.play();
    },
    /**
     * when user press pause in PicInPic canvas
     *
     * @public
     */
    _handlePicInPicPause: function() {
      this.togglePauseAndPlay();
      if (document.pictureInPictureElement)
        document.pictureInPictureElement.pause();
    },
    /**
     * This is the initialization function
     * which is executed only after the
     * soundplayer is loaded/mounted
     *
     * @public
     */
    init: async function() {
      try {
        this.audioElement.addEventListener("timeupdate", this._handlePlayingUI);
      this.audioElement.addEventListener("loadeddata", this._handleLoaded);
      this.audioElement.addEventListener("pause", this._handlePause);
      this.audioElement.addEventListener("play", this._handlePlay);
      this.audioElement.addEventListener("ended", this._handleEndedTrack);
      this.audioElement.addEventListener("waiting", this._handlerWaiting);
      this.audioElement.addEventListener(
        "playing",
        this._handlePlayingAfterBuffering
      );
      this.audioElement.addEventListener(
        "error",
        this._handleAudioError,
        false
      );

      //keysocket feature
      //add keysocket extension to google chrome to enable this feature
      document.addEventListener("MediaPlayPause", this.togglePauseAndPlay);
      document.addEventListener("MediaPrev", this.previousConditionally);
      document.addEventListener("MediaNext", this.nextConditionally);

      this.audioElement.volume = this.volumeValue / 100;
      this.volumeLevelStyle = `width:${this.volumeValue}%;`;

      /* Picture-in-Picture Feature */
      var picInPicCanvasTemp = document.createElement("canvas");
      picInPicCanvasTemp.width = picInPicCanvasTemp.height = 512;

      this.setPicInPicCanvas(picInPicCanvasTemp);

      this.picInPicVideo = document.createElement("video");
      this.picInPicVideo.srcObject = this.picInPicCanvas.captureStream();
      this.picInPicVideo.muted = true;

      /* Play & Pause */
      navigator.mediaSession.setActionHandler("play", this._handlePicInPicPlay);
      navigator.mediaSession.setActionHandler(
        "pause",
        this._handlePicInPicPause
      );

      /* Previous Track & Next Track */
      navigator.mediaSession.setActionHandler(
        "previoustrack",
        this.previousConditionally
      );
      navigator.mediaSession.setActionHandler(
        "nexttrack",
        this.nextConditionally
      );

      this.setToken("Bearer " + this.getuserToken());

      var CurrentlyPlayingTrackId = await this.getCurrentlyPlayingTrackId();
      this.getTrackInformation({
        token: this.token,
        trackId: CurrentlyPlayingTrackId,
      });

      await this.initQueueStatus(this.token);
      await this.updateQueue(this.token);

      await this.recentlyPlayed(this.getuserToken());
      if (this.historyResponse.length != 0) {
        this.setContextId(this.historyResponse[0].contextId);
        this.setContextType(this.historyResponse[0].contextType);
        this.setContextUrl(this.historyResponse[0].contextUrl);
      }

      this.playTrackInQueue(CurrentlyPlayingTrackId);
      
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted: function() {
    this.setAudioElement(this.$el.querySelectorAll("audio")[0]);
    this.isSoundgrapherEnabled = true;
    this.init();
  },
  beforeDestroy: function() {
    this.audioElement.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audioElement.removeEventListener("loadeddata", this._handleLoaded);
    this.audioElement.removeEventListener("pause", this._handlePause);
    this.audioElement.removeEventListener("play", this._handlePlay);
    this.audioElement.removeEventListener("ended", this._handleEndedTrack);
    this.audioElement.removeEventListener("waiting", this._handlerWaiting);
    this.audioElement.removeEventListener(
      "playing",
      this._handlePlayingAfterBuffering
    );
    this.audioElement.removeEventListener(
      "error",
      this._handleAudioError,
      false
    );

    document.removeEventListener("MediaPlayPause", this.togglePauseAndPlay);
    document.removeEventListener("MediaPrev", this.previousConditionally);
    document.removeEventListener("MediaNext", this.nextConditionally);
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

<style lang="scss" scoped>
//for sliders
@import "./slider.scss";
</style>
