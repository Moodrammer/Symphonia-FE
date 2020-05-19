<template>
  <v-row>
    <v-col>
        <canvas id="canvas" width="512" height="256"></canvas>      
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState({
      audioElement: (state) => state.track.audioElement,
    })
  },
  data() {
    return {
      // Global Variables for Audio
      audioContext: undefined,
      sourceNode: undefined,
      analyserNode: undefined,
      javascriptNode: undefined,
      sampleSize: 1024, // number of samples to collect before analyzing data
      amplitudeArray: undefined, // array to hold time domain data
      
      canvasWidth: 512,
      canvasHeight: 256,
      ctx: undefined,
    };
  },
  mounted: function() {
    // the AudioContext is the primary 'container' for all your audio node objects
    if (!this.audioContext) {
      try {
        this.audioContext = new AudioContext();
      } catch (e) {
        alert(e);
        alert("Web Audio API is not supported in this browser");
      }
    }

    // Set up the audio Analyser, the Source Buffer and javascriptNode
    this.setupAudioNodes();
    // setup the event handler that is triggered every time enough samples have been collected
    // trigger the audio analysis and draw the results
    this.javascriptNode.onaudioprocess = this._handleOnAudioProcess;
  
    // Hacks to deal with different function names in different browsers
    window.requestAnimFrame = (function() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();
    window.AudioContext = (function() {
      return (
        window.webkitAudioContext ||
        window.AudioContext ||
        window.mozAudioContext
      );
    })();

    this.ctx = document.querySelector("#canvas").getContext("2d");    
  },
  methods: {
    // When the Start button is clicked, finish setting up the audio nodes, play the sound,
    // gather samples for the analysis, update the canvas
    
    setupAudioNodes: function() {
      //this.sourceNode = this.audioContext.createBufferSource();
      this.sourceNode = this.audioContext.createMediaElementSource(this.audioElement);
      this.analyserNode = this.audioContext.createAnalyser();
      this.javascriptNode = this.audioContext.createScriptProcessor(
        this.sampleSize,
        1,
        1
      );
      // Create the array for the data values
      this.amplitudeArray = new Uint8Array(this.analyserNode.frequencyBinCount);
      // Now connect the nodes together
      this.sourceNode.connect(this.audioContext.destination);
      this.sourceNode.connect(this.analyserNode);
      this.analyserNode.connect(this.javascriptNode);
      this.javascriptNode.connect(this.audioContext.destination);
    },

    drawTimeDomain: function() {
      //clean canvas
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      for (let i = 0; i < this.amplitudeArray.length; i++) {
        let value = this.amplitudeArray[i] / 256;
        let y = this.canvasHeight - this.canvasHeight * value - 1;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(i, y, 1, 1);
      }
    },
    /**
     * handle onaudioprocess event of javascript node
     * 
     * @public
     */
    _handleOnAudioProcess: function() {
      this.analyserNode.getByteTimeDomainData(this.amplitudeArray);
      window.requestAnimFrame(this.drawTimeDomain);
    },
  },
};
</script>


<style>
#canvas {
  margin-left: auto;
  margin-right: auto;
  display: block;
  background-color: black;
}
#controls {
  text-align: center;
}
#start_button,
#stop_button {
  font-size: 16pt;
}
#msg {
  text-align: center;
}
</style>
