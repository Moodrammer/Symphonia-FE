<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <div>
        <h1>
          Hello {{ this.$route.params.name }}
        </h1>
      </div>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  created() {
    this.search = this.$route.paramsname;
  }
};
</script>

<style scoped></style>
