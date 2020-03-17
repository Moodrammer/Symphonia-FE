<template>
  <div class="content">
    <v-container>
      <v-row>
        <v-col cols="12" lg="6" v-if="likedSongs.length > 0">
          <v-menu absolute offset-y style="max-width: 600px" dark v-model="showMenu">
            <template v-slot:activator="{ on }">
              <v-card
                @mouseover="playDisplayIndex = -1"
                @mouseleave="playDisplayIndex = null"
                @contextmenu.prevent="on.click"
                class="pa-6 gradient"
                width="547"
                height="340"
                color="#282828"
                dark
              >
                <div style="height:150px">
                  <v-card-text max-height="500">
                    <span v-for="(song, index)  in likedSongs" :key="index">
                      {{song.artist}}
                      <span class="grey--text">{{song.title}}.</span>
                    </span>
                  </v-card-text>
                </div>
                <div>
                  <v-card-title class="white--text pl-0 pb-0">
                    <h1>Liked Songs</h1>
                  </v-card-title>
                </div>
                <v-card-subtitle class="pl-0">{{likedSongs.length}} liked songs</v-card-subtitle>
                <v-btn
                  v-if="playDisplayIndex === -1"
                  fab
                  text
                  color="green"
                  class="ml-10 float-right"
                >
                  <v-icon x-large lg-12>mdi-play-circle</v-icon>
                </v-btn>
              </v-card>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in likedSongsMenu" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6" v-for="(playlist, index) in playlists" :key="index">
          <v-menu absolute offset-y style="max-width: 600px" dark>
            <template v-slot:activator="{ on }">
              <v-card
                @mouseover="playDisplayIndex = index"
                @mouseleave="playDisplayIndex = null"
                @contextmenu.prevent="on.click"
                class="pa-6"
                width="250"
                height="340"
                color="#282828"
                dark
              >
                <v-img class="mx-auto pa-0" height="200px" width="200px" :src="playlist.image"></v-img>

                <v-card-title class="white--text pl-0 pb-0">
                  {{
                  playlist.name
                  }}
                </v-card-title>
                <v-layout row wrap>
                  <v-flex>
                    <v-card-text>{{ playlist.description }}</v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-btn v-if="playDisplayIndex === index" fab text color="green" class="ml-10">
                      <v-icon x-large lg-12>mdi-play-circle</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in playlistsMenu" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Playlists",
  data() {
    return {
      showMenu: false,
      likedSongsMenu: [{ title: "Copy Link" }],
      playlistsMenu: [
        { title: "Start Radio" },
        { title: "Make Secret" },
        { title: "Delete" },
        { title: "Copy Playlist link" }
      ],
      likedSongs: [
        { title: "Lose your self", artist: "Eminem" },
        { title: "Lose your self", artist: "Eminem" },
        { title: "Lose your self", artist: "Eminem" },
        { title: "Lose your self", artist: "Eminem" },
        { title: "Lose your self", artist: "Eminem" },
        { title: "Lose your self", artist: "Eminem" },
        { title: "Lose your self", artist: "Eminem" },
        { title: "Lose your self", artist: "Eminem" },
        { title: "Lose your self", artist: "Eminem" },
        { title: "Lose your self", artist: "Eminem" }
      ],
      playDisplayIndex: null,
      playlists: [
        {
          name: "Amr Diab Collection",
          image:
            "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
          description: "1 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
          description: "2 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
          description: "3 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
          description: "4 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
          description: "5 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
          description: "6 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://cdn.platinumlist.net/upload/artist/tamer_hosny_451-mobile1514454683.jpeg",
          description: "7 new playlist"
        }
      ]
    };
  },
  created() {}
};
</script>

<style>
.gradient {
  background: rgb(89, 0, 172);
  background: linear-gradient(
    152deg,
    rgba(89, 0, 172, 1) 0%,
    rgba(107, 107, 221, 1) 92%
  );
}
</style>
