<template>
  <v-footer app class="sound-player">
    <!-- audio tag -->
    <audio ref="audiofile" :src="trackUrl" style="display:none;"></audio>
    <!-- song info -->
    <v-row>
      <v-col cols="4">
        <v-toolbar flat color="rgba(0,0,0,0)">
          <v-avatar tile size="56">
            <img :src="imageUrl" />
          </v-avatar>
          <div
            style="padding-left: 14px; padding-top: 14px; margin-right: 14px;"
          >
            <router-link to="/" class="song-name">
              {{ songName }}
            </router-link>
            <router-link
              v-for="(artist, index) in artists"
              :key="index"
              :to="artist.href"
              class="singer-name"
            >
              {{ artist.name }}
            </router-link>
          </div>
          <a @click="saveToLikedSongs()" v-if="!isSongIsLiked">
            <v-icon small title="save your liked songs" class="icons">
              mdi-heart-outline
            </v-icon>
          </a>
          <a @click="saveToLikedSongs()" v-if="isSongIsLiked">
            <v-icon
              small
              title="save your liked songs"
              class="icons"
              color="green"
            >
              mdi-heart
            </v-icon>
          </a>
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
            v-if="!firstTrackInQueue"
            title="Previous"
            style="margin-right: 10px;"
          >
            <v-icon medium class="icons">
              mdi-skip-previous
            </v-icon>
          </a>
          <a
            v-if="firstTrackInQueue"
            title="Previous"
            style="margin-right: 10px;"
          >
            <v-icon medium>
              mdi-skip-previous
            </v-icon>
          </a>
          <!-- Start and Pause -->
          <a
            @click="pauseAndPlay()"
            v-if="isBuffering"
            style="width: 36px; height: 36px;"
            disabled
          >
            <v-icon v-if="paused" large class="icons" title="play">
              mdi-play-circle-outline
            </v-icon>
            <v-icon v-if="!paused" large class="icons" title="pause">
              mdi-pause-circle-outline
            </v-icon>
          </a>

          <img
            v-if="!isBuffering"
            style="width: 36px; height: 36px; vertical-align: middle;"
            src="/loadingPlay.gif"
          />

          <!-- Next -->
          <a @click="next()" title="Next" style="margin-left: 10px;">
            <v-icon medium class="icons">
              mdi-skip-next
            </v-icon>
          </a>

          <a
            @click="enableRepeat()"
            v-if="!isRepeatEnabled && !isRepeatOnceEnabled"
            title="Enable repeat"
            style="margin-left: 20px;"
          >
            <v-icon small class="icons">
              mdi-repeat
            </v-icon>
          </a>

          <a
            @click="enableRepeatOnce()"
            v-if="isRepeatEnabled && !isRepeatOnceEnabled"
            title="Enable repeat once"
            style="margin-left: 20px;"
          >
            <v-icon small class="icons" color="green">
              mdi-repeat
            </v-icon>
          </a>

          <a
            @click="disableRepeatOnce()"
            v-if="!isRepeatEnabled && isRepeatOnceEnabled"
            title="Disable repeat once"
            style="margin-left: 20px;"
          >
            <v-icon small class="icons" color="green">
              mdi-repeat-once
            </v-icon>
          </a>
        </div>

        <v-toolbar flat color="rgba(0,0,0,0)" height="10">
          <!-- progress bar -->
          <span class="time" style="padding-right: 10px; margin-top:0px;">{{
            currentTime
          }}</span>

          <input
            type="range"
            min="0"
            v-bind:max="totalDuration"
            @mousedown="progressBarPressed"
            @mouseup="progressBarReleased"
            v-model="currentTimeInSec"
          />

          <!-- time -->
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
            style="margin-right: 10px; float: left; text-decoration: none;"
          >
            <v-icon
              small
              v-bind:class="{
                'green-icon': isQueueOpened,
                icons: !isQueueOpened
              }"
            >
              mdi-format-list-numbered-rtl
            </v-icon>
          </router-link>

          <!-- devices -->

          <!-- <v-menu
            offset-y
            top
            transition="slide-y-transition"
            style="clear: left;"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                :ripple="false"
                id="no-background-hover"
                text
                v-on="on"
                class="devices-icon"
              >
                <span class="mdi mdi-18px mdi-devices icons"></span>
              </v-btn>
            </template>

            <v-list style="background-color: #282828 !important">
              <v-list-item
                v-for="(device, index) in devices"
                :key="index"
                v-on:click="chooseDevice(device._id)"
              >
                <v-list-item-title
                  style="color: white;"
                  v-bind:class="{
                    'green-icon-w-hover': device._id == currentDeviceId
                  }"
                  >{{ index + 1 }} {{ device.devicesName }}</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu> -->

          <!-- mute -->
          <a
            @click="mute()"
            title="Mute"
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
            type="range"
            min="0"
            max="100"
            class="volume-slider"
            v-model="volumeValue"
            v-on:mousdown="volumeBarPressed"
            v-on:mouseup="volumeBarReleased"
          />
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" style="bottom: 100px;">
      <span>Please, choose your first song.</span>
    </v-snackbar>
  </v-footer>
</template>

<script>
/**
 * The Sound player content after logging in.
 * @version 1.0.0
 */

import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
import axios from "axios";
import getuserToken from "../../mixins/userService";

//import io from 'socket.io-client';

export const convertTimeHHMMSS = val => {
  //-val is the time passed from the start of the sound in integer seconds
  //-new Data(val * 1000) get a date from 1970 2:00:00 and advance it with milli seconds
  //-convert it to ISO format YYYY-MM-DDTHH:mm:ss.sssZ
  //-take only the HH:mm:ss part
  let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);
  //-if the hh part is 00: then show only mm:ss part. .indexOf('a')
  //returns the index of the first element in an array starts with 'a'
  return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
};

export default {
  name: "soundplayer",

  mixins: [getuserToken],

  computed: {
    ...mapGetters("playlist", ["audio", "paused", "isQueueOpened"]),

    duration: function() {
      return this.audio ? convertTimeHHMMSS(this.totalDuration) : "";
    },

    ...mapState({
      isSongIsLiked: state => state.track.liked,
      trackUrl: state => state.track.trackUrl,
      songName: state => state.track.trackName,
      artists: state => state.track.trackArtists,
      imageUrl: state => state.track.imageUrl,
      lastTrackInQueue: state => state.track.lastTrackInQueue,
      firstTrackInQueue: state => state.track.firstTrackInQueue,
      queueTracks: state => state.track.queueTracks
    })
  },
  data() {
    return {
      //Audio info:
      currentTime: "00:00",
      totalDuration: 0,
      volumeValue: 50,
      previousVolumeValue: 50,
      currentTimeInSec: 0,

      //Flags:
      isMuted: false,
      isBuffering: false,
      isProgressBarPressed: false,
      isVolumePressed: false,
      isRepeatEnabled: false,
      isShuffleEnabled: false,
      isRepeatOnceEnabled: false,
      isFirstSong: true,
      isMocking: false,

      devices: undefined,
      currentDeviceId: undefined,

      token: undefined,

      snackbar: false
    };
  },
  methods: {
    ...mapMutations("playlist", ["setAudio", "setPaused", "setIsSongLoaded"]),
    ...mapMutations("track", [
      "setLiked",
      "setTrackData",
      "setTrackUrl",
      "setFirstTrackInQueue",
      "setLastTrackInQueue",
      "setQueueTracks"
    ]),
    ...mapActions("playlist", ["pauseAndPlay"]),
    ...mapActions("track", ["getTrack", "playSongStore"]),

    /**
     * choose the device you want.
     *
     * @public
     */
    chooseDevice: function(id) {
      this.currentDeviceId = id;
    },
    getQueue: function() {
      axios({
        method: "get",
        url: "/v1/me/player/queue",
        headers: {
          Authorization: this.token
        }
      }).then(async response => {
        this.setQueueTracks(response.data.data.queueTracks);
        ///////////////////////////////
        //first time login (temporary behaviour)

        if (this.queueTracks.length == 0) {
          axios({
            method: "post",
            url: "/v1/me/player/tracks/" + "5e7d2ddd3429e24340ff1397",
            headers: {
              Authorization: this.token
            },
            data: {
              contextId: "5e8a6d96d4be480ab1d91c95",
              context_type: "playlist",
              context_url: "https://localhost:3000/",
              device: "Chrome"
            },
            responseType: "arraybuffer"
          }).then(response => {
            var blob = new Blob([response.data], { type: "audio/mpeg" });
            var objectUrl = URL.createObjectURL(blob);
            this.setTrackUrl(objectUrl);
          });
        }
        ///////////////////////////////
        if (response.data.data.previousTrack == null) {
          this.setFirstTrackInQueue(true);
        } else {
          this.setFirstTrackInQueue(false);
        }

        if (response.data.data.nextTrack == null) {
          this.setLastTrackInQueue(true);
        } else {
          this.setLastTrackInQueue(false);
        }
      });
    },
    getCurrentlyPlaying: function() {
      if (!this.isMocking) {
        //get the currently playing track
        axios({
          method: "get",
          url: "/v1/me/player/currently-playing",
          headers: {
            Authorization: this.token
          }
        }).then(response => {
          //get the track url
          var tempTrackUrl = response.data.data.currentTrack;

          //If i'm not in mocking
          if (tempTrackUrl != null) {
            //get the track id
            var songId = tempTrackUrl.slice(
              tempTrackUrl.indexOf("/tracks/") + "/tracks/".length,
              tempTrackUrl.length
            );

            //request the track data
            this.getTrack({
              token: this.token,
              id: songId
            });

            //request the song mp3 file
            axios({
              method: "post",
              url: "/v1/me/player/tracks/" + songId,
              data: {
                device: "Chrome"
              },
              headers: {
                Authorization: this.token
              },
              responseType: "arraybuffer"
            }).then(response => {
              var blob = new Blob([response.data], { type: "audio/mpeg" });
              var objectUrl = URL.createObjectURL(blob);
              this.setTrackUrl(objectUrl);
            });
          }
        });
      } else {
        //#MOCK

        this.setTrackUrl(
          "https://www.bensound.com/bensound-music/bensound-ukulele.mp3"
        );
      }
    },
    /**
     * change the liked state of the song
     *
     * @public
     */
    saveToLikedSongs: function() {
      if (!this.isSongIsLiked) {
        this.setLiked(true);
        //make a request to set the current song to the like ones.
      } else {
        this.setLiked(false);
        //make a request to remove the current song from the like ones.
      }
    },
    /**
     * Update the volume
     *
     * @public
     */
    updateVolume: function() {
      this.audio.volume = this.volumeValue / 100;
      if (this.volumeValue / 100 > 0) {
        if (this.isMuted) {
          this.previousVolumeValue = this.volumeValue;
          this.mute();
        }
      } else if (this.volumeValue / 100 === 0) {
        if (!this.isMuted) {
          //the case when slide to 0 more than one time in a
          //consecutive way
          this.mute();
        }
      }
    },
    /**
     * Play the current track
     *
     * @public
     */
    play: function() {
      if (!this.paused) return;
      this.setPaused(false);
      this.audio.play();
    },
    /**
     * get the next song
     *
     * @public
     */
    next: function() {
      //////////////////////
      if (!this.isMocking) {
        //If i'm not in mocking
        this.isBuffering = false;
        this.setPaused(true); //the sound will be paused upon changing the soruce

        if (this.lastTrackInQueue == false) {
          axios({
            method: "post",
            url: "/v1/me/player/next",
            headers: {
              Authorization: this.token
            }
          }).then(() => {
            this.getQueue();
            this.getCurrentlyPlaying();
          });
        } else {
          var tempTrackUrl = this.queueTracks[0];

          var songId = tempTrackUrl.slice(
            tempTrackUrl.indexOf("/tracks/") + "/tracks/".length,
            tempTrackUrl.length
          );

          //request the track data
          this.getTrack({
            token: this.token,
            id: songId
          });

          //request the song mp3 file
          axios({
            method: "post",
            url: "/v1/me/player/tracks/" + songId,
            data: {
              contextId: "5e8a6d96d4be480ab1d91c95",
              context_type: "playlist",
              context_url: "https://localhost:3000/",
              device: "Chrome"
            },
            headers: {
              Authorization: this.token
            },
            responseType: "arraybuffer"
          }).then(response => {
            var blob = new Blob([response.data], { type: "audio/mpeg" });
            var objectUrl = URL.createObjectURL(blob);
            this.setTrackUrl(objectUrl);

            this.getQueue();
          });
          ////////////////////
        }
      } else {
        //#MOCK
        if (
          this.trackUrl !=
          "https://www.bensound.com/bensound-music/bensound-summer.mp3"
        ) {
          this.isBuffering = false;
          this.setPaused(true); //the sound will be paused upon changing the soruce

          var temp = this;

          setTimeout(function() {
            temp.setTrackUrl(
              "https://www.bensound.com/bensound-music/bensound-summer.mp3"
            );
          }, 1000);
        }
      }
    },
    /**
     * get the previous song
     *
     * @public
     */
    previous: function() {
      if (!this.isMocking) {
        this.isBuffering = false;
        this.setPaused(true); //the sound will be paused upon changing the soruce

        axios({
          method: "post",
          url: "/v1/me/player/previous",
          headers: {
            Authorization: this.token
          }
        }).then(() => {
          this.getQueue();
          this.getCurrentlyPlaying();
        });
      } else {
        //#MOCK
        if (
          this.trackUrl !=
          "https://www.bensound.com/bensound-music/bensound-ukulele.mp3"
        ) {
          this.isBuffering = false;
          this.setPaused(true); //the sound will be paused upon changing the soruce

          var temp = this;

          setTimeout(function() {
            temp.setTrackUrl(
              "https://www.bensound.com/bensound-music/bensound-ukulele.mp3"
            );
          }, 1000);
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
     * enable repeat once
     *
     * @public
     */
    enableRepeatOnce: function() {
      this.isRepeatEnabled = false;
      this.isRepeatOnceEnabled = true;
      /* send a request to save the option on backend */
    },
    /**
     * disable repeat once
     *
     * @public
     */
    disableRepeatOnce: function() {
      this.isRepeatOnceEnabled = false;
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
      this.audio.muted = this.isMuted;
      if (this.isMuted) {
        if (this.volumeValue == 0)
          //the case when the sound is muted due to the slider
          this.previousVolumeValue = 50;
        else this.previousVolumeValue = this.volumeValue;
      }
      this.volumeValue = this.isMuted ? 0 : this.previousVolumeValue;
      this.audio.volume = this.volumeValue / 100; //update the volume
    },
    /**
     * This handler is invoked after track is loaded
     *
     * @public
     */
    _handleLoaded: function() {
      //The HTMLMediaElement.readyState property indicates the readiness state of the media.
      // (this.audio.readyState >= 2) Data is available
      if (this.audio.readyState >= 2) {
        if (!this.isFirstSong) {
          this.play();
        } else {
          this.isFirstSong = false;
        }

        this.setIsSongLoaded(true);
        this.isBuffering = true; //finished loading the next song.

        this.totalDuration = parseInt(this.audio.duration);
      } else {
        throw new Error("Failed to load sound file");
      }
    },
    /**
     * This handler is invoked when the track
     * time is changed due to playing.
     *
     * @public
     */
    _handlePlayingUI: function() {
      //this.audio.currentTime gets the current time of the playing track
      //in terms of how many seconds have been passed.
      var currTime = parseInt(this.audio.currentTime);

      if (!this.isProgressBarPressed) {
        this.currentTimeInSec = currTime;
      }

      this.currentTime = convertTimeHHMMSS(currTime);
    },
    /**
     * This handler is invoked when the track is paused
     *
     * @public
     */
    _handlePause: function() {
      this.setPaused(true); //the song is paused flag
    },
    /**
     * This handler is invoked when the track is finsihed
     *
     * @public
     */
    _handleEndedSong: function() {
      if (this.isRepeatOnceEnabled) {
        this.play();
      } else if (this.isRepeatEnabled) {
        //if (is the current song is the last song in the playlist)?
        //change "file" to the link of the first song of the playlist,
        //then after loading in the loaded handler: invoke play()
      }
    },
    /**
     * This handler is invoked when the track started
     * buffering.
     *
     * @public
     */
    _handlerWaiting: function() {
      this.isBuffering = false;
    },
    /**
     * This handler is invoked when track insihed buffering
     *
     * @public
     */
    _handlePlayingAfterBuffering: function() {
      this.isBuffering = true;
    },
    /**
     * This handler is invoked after
     * pressing down the space key
     *
     * @public
     */
    _handleSpaceDown: function(e) {
      if (e.code === "Space") {
        e.preventDefault(); //this is just to prevent the space from scrolling
      }
    },
    /**
     * This handler is invoked after
     * pressing up the space key
     *
     * @public
     */
    _handleSpaceUp: function(e) {
      if (e.code === "Space") {
        if (!this.isBuffering) return;
        this.pauseAndPlay();
      }
    },
    /**
     * This is the initialization function
     * which is executed only after the
     * soundplayer is loaded/mounted
     *
     * @public
     */
    init: function() {
      this.isBuffering = true; //I don't want a loading icon upon the loading of the page.
      this.isMocking = process.env.NODE_ENV === "development";
      //this.isMocking = false;

      //set the listeners:
      this.audio.addEventListener("timeupdate", this._handlePlayingUI);
      //The loadeddata event is fired when the frame at the current playback
      //position of the media has finished loading; often the first frame.
      this.audio.addEventListener("loadeddata", this._handleLoaded);
      this.audio.addEventListener("pause", this._handlePause);
      this.audio.addEventListener("ended", this._handleEndedSong); //the song is ended

      this.audio.addEventListener("waiting", this._handlerWaiting); //the song is stopped due to buffering
      this.audio.addEventListener("playing", this._handlePlayingAfterBuffering);

      //space key to pause and play the song
      document.addEventListener("keyup", this._handleSpaceUp);
      document.addEventListener("keydown", this._handleSpaceDown);

      //configure the volume
      this.audio.volume = this.volumeValue / 100;
      this.volumeLevelStyle = `width:${this.volumeValue}%;`;

      this.token = "Bearer " + this.getuserToken();

      if (!this.isMocking) {
        //get the device
        axios({
          method: "patch",
          url: "/v1/me/player/devices",
          data: {
            device: "Chrome" //TODO: get the browser name
          },
          headers: {
            Authorization: this.token
          }
        }).then(response => {
          this.devices = response.data.devices;
          this.currentDeviceId = this.devices[this.devices.length - 1]._id;
        });

        this.getQueue();
      }
      this.getCurrentlyPlaying();
    },
    /**
     * returns the audio tag element.
     *
     * @public
     */
    getAudio: function() {
      return this.$el.querySelectorAll("audio")[0];
    },
    /**
     * This handler is invoked after
     * pressing down on the progress bar
     *
     * @public
     */
    progressBarPressed: function() {
      this.isProgressBarPressed = true;
    },
    /**
     * This handler is invoked after
     * pressing up on the progress bar
     *
     * @public
     */
    progressBarReleased: function() {
      this.audio.currentTime = this.currentTimeInSec;
      this.isProgressBarPressed = false;
    },
    /**
     * This handler is invoked after
     * pressing down on the volume bar
     *
     * @public
     */
    volumeBarPressed: function() {
      this.isVolumeBarPressed = true;
    },
    /**
     * This handler is invoked after
     * pressing up on the volume bar
     *
     * @public
     */
    volumeBarReleased: function() {
      this.updateVolume();
      this.isVolumeBarPressed = false;
    }
  },
  mounted: function() {
    this.setAudio(this.getAudio());
    this.init();
  },
  beforeDestroy: function() {
    this.audio.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePause);
    this.audio.removeEventListener("ended", this._handleEndedSong);

    this.audio.removeEventListener("waiting", this._handlerWaiting);
    this.audio.removeEventListener(
      "playing",
      this._handlePlayingAfterBuffering
    );

    document.removeEventListener("keyup", this._handleSpaceUp);
    document.removeEventListener("keydown", this._handleSpaceDown);

    // STUB
    /*
    var thisTemp = this;
    axios({
      method: "delete",
      url: "/api/v1/me/player/devices",
      data: {
        deviceId: thisTemp.currentDeviceId
      }
    });
    */
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

<style lang="scss" scoped>
//for sliders
@import "./slider.scss";

.volume-slider {
  max-width: 84px;
  width: -webkit-fill-available;
  width: -moz-available;
  margin-right: 0px;
}
</style>
