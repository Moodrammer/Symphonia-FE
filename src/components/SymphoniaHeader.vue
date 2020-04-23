<template>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6">
        <v-row justify="center">
          <router-link to="/">
            <v-row>
              <v-img src="/s11.png" max-width="50px"></v-img>
              <h1 display-4 class="black--text">
                Symphonia
              </h1>
            </v-row>
          </router-link>
        </v-row>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: "symphoniaHeader"
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
