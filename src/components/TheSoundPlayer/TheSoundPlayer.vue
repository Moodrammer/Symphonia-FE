<template>
  <v-footer app class="sound-player">
    <audio ref="audiofile" :src="trackUrl" style="display:none;"></audio>
    <!-- song info -->
    <v-row>
      <v-col cols="4">
        <v-toolbar flat color="rgba(0,0,0,0)">
          <v-avatar tile size="56">
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
          <!-- <a @click="saveToLikedSongs()" v-if="!isTrackLiked">
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
          </a> -->
        </v-toolbar>
      </v-col>

      <v-col cols="5">
        <div class="audio-controls">
          <!-- shuffle -->
          <!-- <a
            @click="enableShuffle()"
            v-if="!isShuffleEnabled"
            title="shuffle"
            style="margin-right: 20px;"
          >
            <v-icon small class="icons">
              mdi-shuffle-variant
            </v-icon>
          </a>

          <a
            @click="disableShuffle()"
            v-if="isShuffleEnabled"
            title="shuffle"
            style="margin-right: 20px;"
          >
            <v-icon small color="green">
              mdi-shuffle-variant
            </v-icon>
          </a> -->

          <!-- Previous -->
          <a
            @click="previous()"
            v-if="!isFirstTrackInQueue && isNextAndPreviousFinished"
            title="Previous"
            id="previous"
            style="margin-right: 10px;"
          >
            <v-icon medium class="icons">
              mdi-skip-previous
            </v-icon>
          </a>
          <a
            v-if="isFirstTrackInQueue || !isNextAndPreviousFinished"
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
            @click="next()"
            v-if="!isLastTrackInQueue && isNextAndPreviousFinished"
            title="Next"
            id="next"
            style="margin-left: 10px;"
          >
            <v-icon medium class="icons">
              mdi-skip-next
            </v-icon>
          </a>
          <a
            v-if="isLastTrackInQueue || !isNextAndPreviousFinished"
            title="Next"
            id="next"
            style="margin-left: 10px;"
          >
            <v-icon medium>
              mdi-skip-next
            </v-icon>
          </a>

          <!-- <a
            @click="enableRepeat()"
            v-if="!isRepeatEnabled && !isRepeatOnceEnabled"
            title="Enable repeat"
            style="margin-left: 20px;"
          >
            <v-icon small class="icons">
              mdi-repeat
            </v-icon>
          </a> -->
          <!-- v-if="isRepeatEnabled && !isRepeatOnceEnabled" -->
          <a
            id="enableRepeatOnce"
            @click="toggleRepeatOnceConditionally()"
            v-if="!isRepeatOnceEnabled"
            title="Enable repeat once"
            style="margin-left: 20px;"
          >
            <!-- <v-icon small class="icons" color="green"> -->
            <v-icon small class="icons">
              mdi-repeat
            </v-icon>
          </a>
          <!-- v-if="!isRepeatEnabled && isRepeatOnceEnabled" -->
          <a
            id="disableRepeatOnce"
            @click="toggleRepeatOnceConditionally()"
            v-if="isRepeatOnceEnabled"
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
          />
          <span class="time" style="padding-left: 10px; margin-top:0px;">{{
            duration
          }}</span>
        </v-toolbar>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="2" style="background: rgba(0, 0, 0, 0);">
        <!-- mute or change the volume-->
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
import getuserToken from "../../mixins/userService";

export default {
  name: "soundplayer",

  mixins: [getuserToken],

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
      isLastTrackInQueue: (state) => state.track.isLastTrackInQueue,
      isFirstTrackInQueue: (state) => state.track.isFirstTrackInQueue,
      trackTotalDuration: (state) => state.track.trackTotalDuration,
      audioElement: (state) => state.track.audioElement,
      isTrackPaused: (state) => state.track.isTrackPaused,
      isQueueOpened: (state) => state.track.isQueueOpened,
      isNextAndPreviousFinished: (state) =>
        state.track.isNextAndPreviousFinished,
      isBuffering: (state) => state.track.isBuffering,
      token: (state) => state.track.token,
      isRepeatEnabled: (state) => state.track.isRepeatEnabled,
      isRepeatOnceEnabled: (state) => state.track.isRepeatOnceEnabled,
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
      isShuffleEnabled: false,

      devices: undefined,
      currentDeviceId: undefined,
    };
  },
  methods: {
    ...mapMutations("track", [
      "setTrackData",
      "setTrackUrl",
      "setTrackId",
      "setFirstTrackInQueue",
      "setLastTrackInQueue",
      "setQueueTracks",
      "setTrackTotalDuration",
      "setAudioElement",
      "setIsTrackLoaded",
      "setIsTrackPaused",
      "setIsTrackLiked",
      "setIsBuffering",
      "setToken",
    ]),
    ...mapActions("track", [
      "getTrackInformation",
      "updateQueue",
      "togglePauseAndPlay",
      "next",
      "previous",
      "getCurrentlyPlayingTrackId",
      "playTrackInQueue",
      "toggleRepeatOnce",
    ]),
    /**
     * convert time in seconds to MM:SS format
     * @param {string} value the time in seconds to be converted
     * @public
     */
    convertTimeHHMMSS: function(value) {
      //-val is the time passed from the start of the sound in integer seconds
      //-new Data(val * 1000) get a date from 1970 2:00:00 and advance it with milli seconds
      //-convert it to ISO format YYYY-MM-DDTHH:mm:ss.sssZ
      //-take only the HH:mm:ss part
      let hhmmss = new Date(value * 1000).toISOString().substr(11, 8);
      //-if the hh part is 00: then show only mm:ss part. .indexOf('a')
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
      this.toggleRepeatOnce();
    },
    /**
     * change the liked state of the song
     *
     * @public
     */
    saveToLikedSongs: function() {
      if (!this.isTrackLiked) {
        this.setIsTrackLiked(true);
        //make a request to set the current song to the like ones.
      } else {
        this.setIsTrackLiked(false);
        //make a request to remove the current song from the like ones.
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
     * Enable the shuffle.
     * Invoked after pressing shuffle button
     * while it's disabled
     *
     * @public
     */
    enableShuffle: function() {
      this.isShuffleEnabled = true;
      //make a request to get a shuffled song
      /* send a request to save the option on backend */
    },
    /**
     * Disable the shuffle.
     * Invoked after pressing shuffle button
     * while it's enabled
     *
     * @public
     */
    disableShuffle: function() {
      this.isShuffleEnabled = false;
      //make a request to get a shuffled song
      /* send a request to save the option on backend */
    },
    /**
     * enable repeat
     *
     * @public
     */
    enableRepeat: function() {
      this.isRepeatEnabled = true;
      /* send a request to save the option on backend */
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
     * @public
     */
    _handleEndedTrack: function() {
      if (this.isRepeatOnceEnabled) {
        this.audioElement.play();
      } else {
        this.next();
      }
    },
    /**
     * This is the initialization function
     * which is executed only after the
     * soundplayer is loaded/mounted
     *
     * @public
     */
    init: async function() {
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

      this.audioElement.volume = this.volumeValue / 100;
      this.volumeLevelStyle = `width:${this.volumeValue}%;`;

      this.setToken("Bearer " + this.getuserToken());

      var CurrentlyPlayingTrackId = await this.getCurrentlyPlayingTrackId();
      this.getTrackInformation({
        token: this.token,
        trackId: CurrentlyPlayingTrackId,
      });
      this.playTrackInQueue(CurrentlyPlayingTrackId);

      this.updateQueue(this.token);
    },
  },
  mounted: function() {
    this.setAudioElement(this.$el.querySelectorAll("audio")[0]);
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
