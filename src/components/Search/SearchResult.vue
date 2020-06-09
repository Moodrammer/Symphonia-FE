<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <div>
        <h1>Search for `{{ this.$route.params.name }}`</h1>
      </div>
      <v-row style="margin-top:15px;">
        <h2>Artists</h2>
        <v-spacer></v-spacer>
        <router-link
          class="white--text mt-3"
          :to="
            '/webhome/search/' + encodeURI(this.$route.params.name) + '/Artists'
          "
          ><p id="seeAll">See All</p></router-link
        >
        <CardGrid :cardItems="artists" />
      </v-row>
      <v-row style="margin-top:15px;">
        <h2>Albums</h2>
        <v-spacer></v-spacer>
        <router-link
          class="white--text mt-3"
          :to="
            '/webhome/search/' + encodeURI(this.$route.params.name) + '/Albums'
          "
          ><p id="seeAll">See All</p></router-link
        >
        <CardGrid :cardItems="albums" />
      </v-row>
      <v-row style="margin-top:15px;">
        <h2>Playlist</h2>
        <v-spacer></v-spacer>
        <router-link
          class="white--text mt-3"
          :to="
            '/webhome/search/' + encodeURI(this.$route.params.name) + '/Playlists'
          "
          ><p id="seeAll">See All</p></router-link
        >
        <CardGrid :cardItems="playlist" />
      </v-row>
      <v-row style="margin-top:15px;">
        <h2>Profiles</h2>
        <v-spacer></v-spacer>
        <router-link
          class="white--text mt-3"
          :to="
            '/webhome/search/' + encodeURI(this.$route.params.name) + '/Profiles'
          "
          ><p id="seeAll">See All</p></router-link
        >
        <CardGrid :cardItems="profiles" />
      </v-row>
      <v-row style="margin-top:15px;">
        <h2>Gernes</h2>
        <v-spacer></v-spacer>
        <router-link
          class="white--text mt-3"
          :to="
            '/webhome/search/' + encodeURI(this.$route.params.name) + '/Gernes'
          "
          ><p id="seeAll">See All</p></router-link
        >
        <CardGrid :cardItems="category" />
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import CardGrid from "../general/CardGrid.vue";
export default {
  data() {
    return { contextMenu: { event: null, type: null, id: null } };
  },
  components: {
    CardGrid
  },
  created() {
    this.$store.dispatch("searchFor", encodeURI(this.$route.params.name));
  },
  beforeUpdate() {
    this.$store.dispatch("searchFor", encodeURI(this.$route.params.name));
  },
  computed: {
    albums() {
      return { items: this.$store.state.search.albums };
    },
    category() {
      return { items: this.$store.state.search.category };
    },
    playlist() {
      return { items: this.$store.state.search.playlist };
    },
    artists() {
      return { items: this.$store.state.search.artists };
    },
    profiles() {
      return { items: this.$store.state.search.profiles };
    },
    tracks() {
      return this.$store.state.search.tracks;
    }
  }
};
</script>

<style scoped>
h2 {
  margin-left: 10px;
  margin-bottom: -15px;
}
a:hover {
  opacity: 1;
  cursor: pointer;
  text-decoration: underline;
}

a {
  text-decoration: none;
  opacity: 0.6;
}
</style>
