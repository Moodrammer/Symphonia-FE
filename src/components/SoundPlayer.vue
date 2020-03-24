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

        <v-hover v-slot:default="{ hover }">
          <v-toolbar flat color="rgba(0,0,0,0)" height="10">
            <!-- progress bar -->
            <span class="time" style="padding-right: 10px;">{{
              currentTime
            }}</span>
            <div
              id="progressBar"
              v-on:click="setPosition"
              class="playback-time-wrapper"
              title="Time played : Total time"
            >
              <div
                v-bind:style="progressStyle"
                class="playback-time-indicator"
                v-bind:class="{'playback-time-indicator-hover': hover}"
              ></div>

              <div 
              v-if="hover"
              style="position: absolute;" v-bind:style="progressStyle">
                <svg
                  style="
                  top: -4px;
                  right: -9px;
                  position: absolute;
                  "
                  height="12"
                  width="12"
                >
                  <circle cx="6" cy="6" r="5" fill="white" />
                </svg>
              </div>
            </div>

            <!-- time -->
            <span class="time" style="padding-left: 10px;">{{ duration }}</span>
          </v-toolbar>
        </v-hover>
      </v-col>

      <v-spacer></v-spacer>
      <v-col cols="2">
        <!-- mute or change the volume-->
        <div style="padding-top: 20px;">
          <a @click="mute()" title="Mute" style="float: left;">
            <v-icon v-if="isMuted" class="icons">
              mdi-volume-mute
            </v-icon>
            <v-icon v-if="!isMuted" class="icons">
              mdi-volume-high
            </v-icon>
          </a>
          <input
            v-model.lazy="volumeValue"
            v-on:change="updateVolume()"
            type="range"
            min="0"
            max="100"
            class="change-volume"
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
      progressStyle: "",
      currentTime: "00:00",
      innerLoop: undefined,
      audio: undefined,
      totalDuration: 0,
      volumeValue: 50,
      previousVolumeValue: 50
    };
  },
  methods: {
    saveToLikedSongs: function() {
      //stub
      alert("saveToLikedSongs");
    },
    setPosition: function name(e) {
      let target = e.target;
      //getBoundingClientRect(): Return the size of an element and
      //its position relative to the viewport
      const pos = target.getBoundingClientRect();
      //cursor x position of the event relative to the view port -
      //position of the target relative to the view port
      //returns a value from 0 to 1
      const seekPos =
        (e.clientX - pos.left) /
        document.getElementById("progressBar").clientWidth;
      this.audio.currentTime = parseInt(this.audio.duration * seekPos);
    },
    updateVolume: function() {
      this.audio.volume = this.volumeValue / 100;
      if (this.volumeValue / 100 > 0) {
        this.isMuted = this.audio.muted = false;
      }

      if (this.volumeValue / 100 === 0) {
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
      let currTime = parseInt(this.audio.currentTime);
      let percentage = parseInt((currTime / this.totalDuration) * 100);
      this.progressStyle = `width:${percentage}%;`;
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
      this.updateVolume();
    },
    getAudio: function() {
      return this.$el.querySelectorAll("audio")[0];
    }
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
.player {
  height: 30px;
  line-height: 30px;
}

.playback-time-wrapper {
  background: transparent;
  position: relative;
  display: inline-block;
  background: rgb(64, 64, 64);
  height: 3px;
  cursor: pointer;
  font-size: 14px;
  vertical-align: middle;
  width: 100%;
  margin-top: 20px;
}

.playback-time-indicator {
  background: #b3b3b3;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

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

.change-volume {
  padding-top: 5px;
  margin-left: 10px;
}

.playback-time-indicator-hover {
  background: rgb(29, 185, 84);
}
</style>
