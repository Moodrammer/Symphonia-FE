<template>
  <div class="content" style="margin-top:120px">
    <v-container>
      <v-row>
        <v-col cols="12" lg="6" md="4" sm="6" v-if="likedSongs.length > 0">
          <v-menu absolute offset-y style="max-width: 600px" dark>
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
                <v-card-title class="white--text pl-0 pb-0">
                  name
                </v-card-title>
                <v-layout row wrap>
                  <v-flex>
                    <v-card-text> description </v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-btn
                      v-if="playDisplayIndex === -1"
                      fab
                      text
                      color="green"
                      class="ml-10"
                    >
                      <v-icon x-large lg-12>mdi-play-circle</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in likedSongsMenu" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
          v-for="(playlist, index) in playlists"
          :key="index"
        >
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
                <v-img
                  class="mx-auto pa-0"
                  height="200px"
                  width="200px"
                  :src="playlist.image"
                >
                </v-img>

                <v-card-title class="white--text pl-0 pb-0">{{
                  playlist.name
                }}</v-card-title>
                <v-layout row wrap>
                  <v-flex>
                    <v-card-text>{{ playlist.description }}</v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-btn
                      v-if="playDisplayIndex === index"
                      fab
                      text
                      color="green"
                      class="ml-10"
                    >
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
      likedSongsMenu: [{ title: "Copy Link" }],
      playlistsMenu: [
        { title: "Start Radio" },
        { title: "Make Secret" },
        { title: "Delete" },
        { title: "Copy Playlist link" }
      ],
      likedSongs: ["Ana m4 Ana"],
      playDisplayIndex: null,
      playlists: [
        {
          name: "Amr Diab Collection",
          image:
            "https://www.shorouknews.com/uploadedimages/Sections/ART/original/amrdianinblack.jpg",
          description: "1 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://www.shorouknews.com/uploadedimages/Sections/ART/original/amrdianinblack.jpg",
          description: "2 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://www.shorouknews.com/uploadedimages/Sections/ART/original/amrdianinblack.jpg",
          description: "3 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://www.shorouknews.com/uploadedimages/Sections/ART/original/amrdianinblack.jpg",
          description: "4 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://www.shorouknews.com/uploadedimages/Sections/ART/original/amrdianinblack.jpg",
          description: "5 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://www.shorouknews.com/uploadedimages/Sections/ART/original/amrdianinblack.jpg",
          description: "6 new playlist"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://www.shorouknews.com/uploadedimages/Sections/ART/original/amrdianinblack.jpg",
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
