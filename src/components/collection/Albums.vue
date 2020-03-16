<template>
  <div class="content" style="margin-top:120px">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
          v-for="(playlist, index) in playlists"
          :key="index"
        >
          <v-menu
            v-model="showMenu"
            absolute
            offset-y
            style="max-width: 600px"
            dark
          >
            <template v-slot:activator="{ on }">
              <v-card
                @mouseover="playDisplayIndex = index"
                @mouseleave="playDisplayIndex = null"
                @contextmenu.prevent="on.click"
                class="mx-auto pa-6"
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
              <v-list-item v-for="(item, index) in items" :key="index">
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
      items: [
        { title: "Start Radio" },
        { title: "Make Secret" },
        { title: "Delete" },
        { title: "Copy Playlist link" }
      ],
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

<style></style>
