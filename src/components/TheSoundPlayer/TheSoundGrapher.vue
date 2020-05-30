<template>
  <canvas
    ref="soundGrapher"
    style="width: 100%; height: fit-content;"
    :height="canvasHeight"
  ></canvas>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      audioElement: state => state.track.audioElement,
      audioContext: state => state.track.audioContext
    })
  },
  data() {
    return {
      sourceNode: undefined,
      analyserNode: undefined,
      javascriptNode: undefined,
      sampleSize: 1024, // number of samples to collect before analyzing data

      canvasWidth: 600,
      canvasHeight: 20,
      ctx: undefined
    };
  },
  methods: {
    ...mapMutations("track", ["initAudioContext"]),

    /**
     * setup the web audio API nodes
     *
     * @public
     */
    setupAudioNodes: function() {
      this.sourceNode = this.audioContext.createMediaElementSource(
        this.audioElement
      );
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
    /**
     * this function is responsible of graph drawing
     *
     * @public
     */
    drawTimeDomain: function() {
      //clean canvas
      this.ctx.fillStyle = "#282828";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      for (let i = 0; i < this.amplitudeArray.length; i++) {
        let value = this.amplitudeArray[i] / 256;
        let y = this.canvasHeight - this.canvasHeight * value - 1;
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(i, y, 1, 1);
      }
    },
    /**
     * handle onaudioprocess event of javascript node
     *
     * @public
     */
    _handleOnAudioProcess: function() {
      if (!document.hidden) {
        this.analyserNode.getByteTimeDomainData(this.amplitudeArray);
        window.requestAnimFrame(this.drawTimeDomain);
      }
    },
    /**
     * initialize the component
     *
     * @public
     */
    init: function() {
      this.initAudioContext();

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

      this.ctx = this.$refs.soundGrapher.getContext("2d");
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style>
#canvas {
  display: block;
  background-color: black;
  margin: auto;
}
</style>
