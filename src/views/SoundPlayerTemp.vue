<template>
  <div>
    <h1 v-for="n in 25" :key="n">hi</h1>
    <sound-player />
  </div>
</template>

<script>
import soundplayer from "../components/TheSoundPlayer/TheSoundPlayer.vue";

export default {
  components: {
    "sound-player": soundplayer
  }
};
</script>
