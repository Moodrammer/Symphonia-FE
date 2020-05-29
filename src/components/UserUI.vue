<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-row align="center" justify="center">
      <v-avatar size="200" class="my-8"
        ><v-img :src="user.image"></v-img
      ></v-avatar>
    </v-row>
    <v-row align="center" justify="center">
      <h1>{{ user.name }}</h1>
    </v-row>
    <v-container align="center" justify="center">
      <CardGrid :cardItems="cardItems" :contextMenu="contextMenu" />
    </v-container>
  </v-content>
</template>

<script>
import CardGrid from "./general/CardGrid";
import getuserToken from "../mixins/userService/getUserToken";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserUI",
  props: ["contextMenu"],
  components: {
    CardGrid
  },
  mixins: [getuserToken],
  data() {
    return {
      user: {
        name: "",
        image: ""
      },
      cardItems: {
        items: []
      }
    };
  },
  created() {
    console.log("token", this.getuserToken());
    try {
      this.getUserInfo({
        token: this.getuserToken(),
        id: this.$route.params.id
      });
      this.getPublicPlaylists({
        token: this.getuserToken(),
        id: this.$route.params.id
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    ...mapActions("userPublicProfile", ["getUserInfo"]),
    ...mapActions("userPublicProfile", ["getPublicPlaylists"])
  },
  computed: {
    ...mapGetters("userPublicProfile", ["allInfo"]),
    ...mapGetters("userPublicProfile", ["allPublicPlaylists"])
  },
  watch: {
    allInfo(newValue) {
      this.user = newValue;
    },
    allPublicPlaylists(newValue) {
      this.cardItems.items = newValue;
    }
  }
};
</script>

<style></style>
