<template>
  <v-footer app class="sound-player">
    <!-- audio tag -->
    <audio ref="audiofile" :src="file" style="display:none;"></audio>
    <!-- song info -->
    <v-row>
      <v-col cols="3">
        <v-toolbar flat color="rgba(0,0,0,0)">
          <v-avatar tile size="56">
            <img src="http://localhost:8080/profile.jpg" alt="profile pic" />
          </v-avatar>
          <div
            style="padding-left: 14px; padding-top: 14px; margin-right: 14px;"
          >
            <router-link to="/" class="song-name">
              Song Name
            </router-link>
            <router-link to="/" class="singer-name">
              hi
            </router-link>
          </div>
          <a @click="saveToLikedSongs()">
            <v-icon small title="save your liked songs" class="icons">
              mdi-heart-outline
            </v-icon>
          </a>
        </v-toolbar>
      </v-col>

      <v-col cols="6">
        <div class="audio-controls">
          <!-- Start and Pause -->
          <a @click="pause()" title="Play">
            <v-icon v-if="paused" large class="icons">
              mdi-play-circle-outline
            </v-icon>
            <v-icon v-if="!paused" large class="icons">
              mdi-pause-circle-outline
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
            class="rangeslider"
            v-model="currentTimeInSec"
          />

          <!-- time -->
          <span class="time" style="padding-left: 10px; margin-top:0px;">{{ duration }}</span>
        </v-toolbar>
      </v-col>

      <v-spacer></v-spacer>
      <v-col cols="2">
        <!-- mute or change the volume-->
        <div style="padding-top: 20px;">
          <a @click="mute()" title="Mute" style="float: left; margin-right: 10px;">
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
            class="rangeslider"
            v-model="volumeValue"
            style="width: 100px; margin-right: 0px;"
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
  props: {
    file: {
      type: String,
      default: null
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    duration: function() {
      return this.audio ? convertTimeHHMMSS(this.totalDuration) : "";
    }
  },
  data() {
    return {
      isMuted: false,
      loaded: false,
      playing: false,
      paused: true,
      currentTime: "00:00",
      innerLoop: undefined,
      audio: undefined,
      totalDuration: 0,
      volumeValue: 50,
      previousVolumeValue: 50,
      currentTimeInSec: 0,
      isProgressBarPressed: false
    };
  },
  methods: {
    saveToLikedSongs: function() {
      //stub
      alert("saveToLikedSongs");
    },
    updateVolume: function() {
      this.audio.volume = this.volumeValue / 100;
      if (this.volumeValue / 100 > 0) {
        this.isMuted = this.audio.muted = false;
      }
      else if (this.volumeValue / 100 === 0) {
        this.isMuted = this.audio.muted = true;
      }
    },
    play: function() {
      if (this.playing && !this.paused) return;
      this.paused = false;
      this.audio.play();
      this.playing = true;
    },
    pause: function() {
      this.paused = !this.paused;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    mute: function() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
      if (this.isMuted) {
        this.previousVolumeValue = this.volumeValue;
      }
      this.volumeValue = this.isMuted ? 0 : this.previousVolumeValue;
    },
    _handleLoaded: function() {
      //The HTMLMediaElement.readyState property indicates the readiness state of the media.
      // (this.audio.readyState >= 2) Data is available
      if (this.audio.readyState >= 2) {
        if (this.autoPlay) this.play();

        this.loaded = true;
        this.totalDuration = parseInt(this.audio.duration);
      } else {
        throw new Error("Failed to load sound file");
      }
    },
    _handlePlayingUI: function() {
      //this.audio.currentTime gets the current time of the playing track
      //in terms of how many seconds have been passed.
      var currTime = parseInt(this.audio.currentTime);

      this.updateVolume();

      if (!this.isProgressBarPressed)
      {
        this.currentTimeInSec = currTime;
      }

      this.currentTime = convertTimeHHMMSS(currTime);
    },
    _handlePlayPause: function(e) {
      if (e.type === "pause" && this.playing === false) {
        this.paused = true;
      }
    },
    init: function() {
      this.audio.addEventListener("timeupdate", this._handlePlayingUI);
      //The loadeddata event is fired when the frame at the current playback
      //position of the media has finished loading; often the first frame.
      this.audio.addEventListener("loadeddata", this._handleLoaded);
      this.audio.addEventListener("pause", this._handlePlayPause);
      this.audio.addEventListener("play", this._handlePlayPause);
      this.audio.volume = this.volumeValue / 100;
      this.volumeLevelStyle = `width:${this.volumeValue}%;`;
    },
    getAudio: function() {
      return this.$el.querySelectorAll("audio")[0];
    },
    progressBarPressed: function () {
      console.log("pressed")
      this.isProgressBarPressed = true;
    },
    progressBarReleased: function () {
      console.log("released")
      this.audio.currentTime = this.currentTimeInSec;
      this.isProgressBarPressed = false;
    },
  },
  mounted: function() {
    this.audio = this.getAudio();
    this.innerLoop = this.loop;
    this.init();
  },
  beforeDestroy: function() {
    this.audio.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
  }
};
</script>

<style scoped>
.sound-player {
  height: 90px;
  background-color: #282828;
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
/* The style of a slider */

/* sass package */
@import "bourbon";

$slider-width-number: 1500; //TODO: make it responsive
$slider-width: #{$slider-width-number}px;
$slider-height: 2px;
$background-slider: rgb(65, 65, 65);
$background-filled-slider: rgb(180, 180, 180);
$thumb-width: 12px;
$thumb-height: 12px;
$thumb-radius: 5px;
$thumb-background: rgba(0, 0, 0, 0);
$shadow-size: -5px; //must be equal to -$thumb-radius
$fit-thumb-in-slider: -5px; //must be equal to -$thumb-radius

@function makelongshadow($color, $size) {
  $val: 5px 0 0 $size $color;

  @for $i from 6 through $slider-width-number {
    $val: #{$val}, #{$i}px 0 0 $size #{$color};
  }

  @return $val;
}

input:hover::-webkit-slider-thumb {
  background: white;
}

input:hover::-webkit-slider-runnable-track {
    background: rgb(29, 185, 84);
}

input {
  align-items: center;
  appearance: none;
  background: none;
  cursor: pointer;
  display: flex;
  height: 25px;
  min-height: 25px;
  overflow: hidden;
  width: $slider-width;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    background: $background-filled-slider;
    content: "";
    height: $slider-height;
    pointer-events: none;
  }

  &::-webkit-slider-thumb {
    @include size($thumb-width, $thumb-height);

    appearance: none;
    background: $thumb-background;
    border-radius: $thumb-radius;
    box-shadow: makelongshadow($background-slider, $shadow-size);
    margin-top: $fit-thumb-in-slider;
  }

  &::-moz-range-track {
    width: $slider-width;
    height: $slider-height;
  }

  &::-moz-range-thumb {
    @include size($thumb-width, $thumb-height);

    background: $thumb-background;
    border-radius: $thumb-radius;
    position: relative;
  }

  &::-moz-range-progress {
    height: $slider-height;
    background: $background-filled-slider;
    border: 0;
    margin-top: 0;
  }

  &::-ms-track {
    background: transparent;
    border: 0;
    border-color: transparent;
    border-radius: 0;
    border-width: 0;
    color: transparent;
    height: $slider-height;
    margin-top: 10px;
    width: $slider-width;
  }

  &::-ms-thumb {
    @include size($thumb-width, $thumb-height);

    background: $thumb-background;
    border-radius: $thumb-radius;
  }

  &::-ms-fill-lower {
    background: $background-filled-slider;
    border-radius: 0;
  }

  &::-ms-fill-upper {
    background: $background-slider;
    border-radius: 0;
  }

  &::-ms-tooltip {
    display: none;
  }
}
</style>
