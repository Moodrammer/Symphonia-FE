<template>
    <v-container class="pt-0">
      <v-row >
        <v-col lg-4 sm-12 md-12 class="column pr-10">
        <div class="al">
      
          <v-img
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          id="playPhoto"
          ></v-img>
          <h1 class="mt-5 ">Liked Songs</h1>

          <v-btn
            rounded
            class="white--text px-8"
            id="playBtn"
          >Play</v-btn>
        </div>
        </v-col>

        <v-col lg-8 sm-12>
          <h1>ssd</h1>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  
}
</script>

<style scoped>

#playPhoto{
  max-height: 300px;
  max-width: 300px;
}

#playBtn {
  background-color: #1aa34a;
  border-width: 0;
  border-radius: 500px;
  margin-top:10px;
}

#playBtn:hover {
  background-color: #1ed760;
  transform: scale(1.05, 1.05);
}
</style>
