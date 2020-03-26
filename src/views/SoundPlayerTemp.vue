<template>
  <div>
    <h1 v-for="n in 25" :key="n">hi</h1>
    <sound-player file="http://localhost:8080/example.mp3" />
  </div>
</template>


<script>
import soundplayer from "../components/SoundPlayer.vue"

export default ({
  components: {
    "sound-player": soundplayer
  }
})
</script>