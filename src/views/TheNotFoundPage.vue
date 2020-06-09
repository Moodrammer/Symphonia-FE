<template>
  <div class="root">
    <v-col cols="12">
    <v-row 
    justify="center"
    align-content="center"
    class="centering"
    >
      <p class="display-1" style="text-align: center; overflow: hidden;">
        <strong> Sorry we couldn't find that page 😔</strong>
      </p>
    </v-row>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "notfound"
};
</script>

<style scoped>
  .root {
    background-color: lightblue;
    height: 100%;
    width: 100%;
  }

  .centering {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  height: 50%;
  width: 95%;
  margin: auto;
}

</style>
