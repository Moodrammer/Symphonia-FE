<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <h1 class="mb-3">Recently played</h1>

      <v-row>
        <v-col md="2" lg="2" sm="6" xl="2">
          <v-card
            color="#282828"
            class="white--text pa-4"
            height="257"
            @mouseover="hover = true"
            @mouseleave="hover = false"
          >
            <v-img
              src="https://source.unsplash.com/HU-uL54pfQI"
              class="elevation-6"
            ></v-img>

            <p class="mb-0 py-2 font-weight-medium">Rasha Rizk</p>
            <h5 class="font-weight-light">
              Lorem ipsum dolor sit amet, consectetur adipisci
            </h5>

            <v-card-actions>
              <v-btn
                v-if="hover"
                fab
                color="success"
                small
                right
                absolute
                id="play"
              >
                <v-icon color="white" class="ma-2">mdi-play</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      hover: "false"
    };
  }
};
</script>
