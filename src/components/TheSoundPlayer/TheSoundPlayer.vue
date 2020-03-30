<template>
  <v-footer app class="sound-player">
    <!-- audio tag -->
    <audio ref="audiofile" :src="file" style="display:none;"></audio>
    <!-- song info -->
    <v-row>
      <v-col cols="4">
        <v-toolbar flat color="rgba(0,0,0,0)">
          <v-avatar tile size="56">
            <img :src="artistPicture" alt="profile pic" />
          </v-avatar>
          <div
            style="padding-left: 14px; padding-top: 14px; margin-right: 14px;"
          >
            <router-link to="/" class="song-name">
              {{ songName }}
            </router-link>
            <router-link to="/" class="singer-name">
              {{ artistName }}
            </router-link>
          </div>
          <a @click="saveToLikedSongs()" v-if="!isSongIsLiked">
            <v-icon small title="save your liked songs" class="icons">
              mdi-heart-outline
            </v-icon>
          </a>
          <a @click="saveToLikedSongs()" v-if="isSongIsLiked">
            <v-icon small title="save your liked songs" class="icons">
              mdi-heart
            </v-icon>
          </a>

        </v-toolbar>
      </v-col>

      <v-col cols="5">
        <div class="audio-controls">
          <a @click="shuffle()" title="shuffle" style="margin-right: 20px;">
            <v-icon small class="icons">
              mdi-shuffle-variant
            </v-icon>
          </a>
          <!-- Previous -->
          <a @click="previous()" title="Previous" style="margin-right: 10px;">
            <v-icon medium class="icons">
              mdi-skip-previous
            </v-icon>
          </a>
          <!-- Start and Pause -->
          <a @click="pause()" v-if="loaded" style="width: 36px; height: 36px;">
            <v-icon v-if="paused" large class="icons" title="play">
              mdi-play-circle-outline
            </v-icon>
            <v-icon v-if="!paused" large class="icons" title="pause">
              mdi-pause-circle-outline
            </v-icon>
          </a>

          <img
            v-if="!loaded"
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
          <a
            @click="queue()"
            title="queue"
            style="margin-right: 10px; float: left;"
          >
            <v-icon small class="icons">
              mdi-format-list-numbered-rtl
            </v-icon>
          </a>
          <a title="devices" style="margin-right: 10px; float: left;">
            <v-icon small class="icons">
              mdi-devices
            </v-icon>
          </a>
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
  </v-footer>
</template>

<script>
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
  name: "vue-audio",

  computed: {
    duration: function() {
      return this.audio ? convertTimeHHMMSS(this.totalDuration) : "";
    }
  },
  data() {
    return {
      //Audio info:
      //file: "", //TODO: make it like this; it's initialized in the init
      file: "/example.mp3",
      currentTime: "00:00",
      audio: undefined,
      totalDuration: 0,
      volumeValue: 50,
      previousVolumeValue: 50,
      currentTimeInSec: 0,

      //Flags:
      isMuted: false,
      loaded: false,
      paused: true,
      isProgressBarPressed: false,
      isVolumePressed: false,
      isRepeatEnabled: false,
      isRepeatOnceEnabled: false,
      isNextPressed: false,
      isPreviousPressed: false,
      isSongIsLiked: false,

      //The song's info:
      artistPicture: "/profile.jpg",
      songName: "Changes",
      artistName: "2PAC",
      songId: "007"
    };
  },
  methods: {
    saveToLikedSongs: function() {
      if (!this.isSongIsLiked) {
        //make a request to set the current song to the like ones.
      } else {
        //make a request to remove the current song from the like ones.
      }
      this.isSongIsLiked = !this.isSongIsLiked;
    },
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
    play: function() {
      if (!this.paused) return;
      this.paused = false;
      this.audio.play();
      this.playing = true;
    },
    pause: function() {
      this.paused = !this.paused;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    next: function() {
      this.isNextPressed = true;
      this.loaded = false;
      this.paused = true; //the sound will be paused upon changing the soruce

      //TODO: is it the current song is the last one in the playlist ?

      var temp = this;
      //this timeout is for simulating the server delay
      //TODO: remove this delay before deployment
      setTimeout(function() {
        //call updateSongInfo()
        //TODO: change this to a url coming from a request.
        temp.file =
          "https://www.bensound.com/bensound-music/bensound-summer.mp3";
      }, 1000);
    },
    //this method will be invoked after changing the song
    //it will change the song info: song name, artist, picture.
    updateSongInfo: function() {
      //stub
    },
    previous: function() {
      this.isPreviousPressed = true;
      this.loaded = false;
      this.paused = true; //the sound will be paused upon changing the soruce

      //TODO: is it the current song is the first one in the playlist ?

      var temp = this;
      //this timeout to simulate the server delay
      //TODO: remove this after delay before deployment
      setTimeout(function() {
        //call updateSongInfo()
        //TODO: change this to a url coming from a request.
        temp.file = "/example.mp3";
      }, 1000);
    },
    shuffle: function() {
      //make a request to get a shuffled song
      /* send a request to save the option on backend */
    },
    enableRepeat: function() {
      this.isRepeatEnabled = true;
      /* send a request to save the option on backend */
    },
    enableRepeatOnce: function() {
      this.isRepeatEnabled = false;
      this.isRepeatOnceEnabled = true;
      /* send a request to save the option on backend */
    },
    disableRepeatOnce: function() {
      this.isRepeatOnceEnabled = false;
      /* send a request to save the option on backend */
    },
    queue: function() {
      //stub
    },
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
    _handleLoaded: function() {
      //The HTMLMediaElement.readyState property indicates the readiness state of the media.
      // (this.audio.readyState >= 2) Data is available
      if (this.audio.readyState >= 2) {
        if (this.isNextPressed) {
          this.play();
          this.isNextPressed = false;
        } else if (this.isPreviousPressed) {
          this.play();
          this.isPreviousPressed = false;
        }

        this.loaded = true; //finished loading the next song.

        this.totalDuration = parseInt(this.audio.duration);
      } else {
        throw new Error("Failed to load sound file");
      }
    },
    _handlePlayingUI: function() {
      //this.audio.currentTime gets the current time of the playing track
      //in terms of how many seconds have been passed.
      var currTime = parseInt(this.audio.currentTime);

      if (!this.isProgressBarPressed) {
        this.currentTimeInSec = currTime;
      }

      this.currentTime = convertTimeHHMMSS(currTime);
    },
    _handlePause: function() {
      this.paused = true; //the song is paused flag
    },
    _handleEndedSong: function() {
      if (this.isRepeatOnceEnabled) {
        this.play();
      } else if (this.isRepeatEnabled) {
        //if (is the current song is the last song in the playlist)?
        //change "file" to the link of the first song of the playlist,
        //then after loading in the loaded handler: invoke play()
      }
    },
    _handlerWaiting: function() {
      this.loaded = false;
    },
    _handlePlayingAfterBuffering: function() {
      this.loaded = true;
    },
    _handleSpaceDown: function(e) {
      if (e.code === "Space") 
      {
        e.preventDefault(); //this is just to prevent the space from scrolling        
      }
    },
    _handleSpaceUp: function(e) {
      if (e.code === "Space") 
      {
        this.pause();
      }
    },
    init: function() {
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
      document.addEventListener('keyup', this._handleSpaceUp);
      document.addEventListener('keydown', this._handleSpaceDown);

      //configure the volume
      this.audio.volume = this.volumeValue / 100;
      this.volumeLevelStyle = `width:${this.volumeValue}%;`;

      //get the last song that user listened to and call updateSongInfo()
      //this.file = "link came from a request"
    },
    getAudio: function() {
      return this.$el.querySelectorAll("audio")[0];
    },
    progressBarPressed: function() {
      this.isProgressBarPressed = true;
    },
    progressBarReleased: function() {
      this.audio.currentTime = this.currentTimeInSec;
      this.isProgressBarPressed = false;
    },
    volumeBarPressed: function() {
      this.isVolumeBarPressed = true;
    },
    volumeBarReleased: function() {
      this.updateVolume();
      this.isVolumeBarPressed = false;
    }
  },
  mounted: function() {
    this.audio = this.getAudio();
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

    document.removeEventListener('keyup', this._handleSpaceUp);
    document.removeEventListener('keydown', this._handleSpaceDown);
  }
};
</script>

<style scoped>
.sound-player {
  height: 90px;
  background-color: #282828 !important;
  padding: 0px 16px 0px 16px;
}

.song-name {
  text-decoration: none;
  font-family: Helvetica, Arial, sans-serif;
  white-space: nowrap;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.015em;
  text-align: left;
  user-select: none;
  color: #fff;
  position: relative;
  text-transform: uppercase;
  display: block;
}

.singer-name {
  text-decoration: none;
  white-space: nowrap;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.015em;
  position: relative;
  color: #b3b3b3;
}

.singer-name:hover {
  color: white;
}

.audio-controls {
  display: block;
  text-align: center;
  margin-bottom: 10px;
  height: 36px;
}

.icons {
  color: #b3b3b3;
}

.icons:hover {
  color: white;
}

.time {
  margin-top: 20px;
  color: #b3b3b3;
  text-transform: none;
  font-family: Helvetica, Arial, sans-serif;
  vertical-align: baseline;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.015em;
  min-width: 40px;
  text-align: center;
}
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
