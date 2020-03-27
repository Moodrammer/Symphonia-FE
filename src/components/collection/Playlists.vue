<template>
  <v-content class="pa-0 mr-5">
    <h1>Playlists</h1>

    <!-- adding custom context menu -->
    <v-menu
      absolute
      offset-y
      style="max-width: 600px"
      dark
      v-model="showMenu"
      :disabled="disableMenu"
    >
      <template v-slot:activator="{ on }">
        <v-container dark @contextmenu.prevent="on.click">
          <!-- adding the page content: -->
          <v-row>
            <v-col
              cols="12"
              lg="4"
              md="6"
              sm="12"
              class="my-4"
              v-if="likedSongs.length > 0"
            >
              <!-- adding the liked songs card -->
              <div class="card">
                <v-card
                  class="gradient-likedsongs-card"
                  width="475"
                  height="270"
                  dark
                  @mouseover="cardHover(-1)"
                  @mouseleave="hoveredCardIndex = null"
                >
                  <!-- card text :liked songs artist and titles -->
                  <div class="card-text likedsongs-card-text">
                    <v-card-text>
                      <span v-for="(song, index) in likedSongs" :key="index">
                        {{ song.artist }}
                        <span class="grey--text">{{ song.title }}.</span>
                      </span>
                    </v-card-text>
                  </div>
                  <div class="card-text">
                    <v-card-title class="white--text my-2">
                      <!-- card title and subtitle -->
                      <h1>Liked Songs</h1>
                    </v-card-title>
                    <v-card-subtitle
                      >{{ likedSongs.length }} liked songs</v-card-subtitle
                    >
                  </div>

                  <!-- card play button -->
                  <v-card-actions class="pr-5 pt-3">
                    <v-spacer></v-spacer>
                    <v-btn
                      v-show="hoveredCardIndex === -1"
                      fab
                      color="success"
                      small
                      id="play"
                    >
                      <v-icon color="white">mdi-play</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-col>

            <!-- setting grid columns system for playlists cards -->
            <v-col
              cols="12"
              lg="2"
              md="4"
              sm="6"
              class="my-4"
              v-for="(playlist, index) in playlists"
              :key="index"
            >
              <!-- adding the playlists cards -->
              <div class="card">
                <v-card
                  class="pa-6"
                  width="200"
                  height="270"
                  color="#282828"
                  @mouseover="cardHover(index)"
                  @mouseleave="hoveredCardIndex = null"
                  dark
                >
                  <!-- playlist image -->
                  <v-img
                    class="mx-auto elevation-6"
                    height="140px"
                    width="140px"
                    :src="playlist.image"
                  ></v-img>

                  <!-- playlist title -->
                  <div class="card-text-title card-text">
                    <v-card-text class="pl-2 pb-0 pt-2 white--text">{{
                      playlist.name
                    }}</v-card-text>
                  </div>

                  <!-- playlist description -->
                  <div class="card-text-subtitle card-text">
                    <v-card-subtitle class="pl-2 pa-0">{{
                      playlist.description
                    }}</v-card-subtitle>
                  </div>

                  <!-- card play button -->
                  <v-card-actions class="pa-0">
                    <v-spacer></v-spacer>
                    <v-btn
                      v-show="hoveredCardIndex === index"
                      fab
                      color="success"
                      small
                      id="play"
                    >
                      <v-icon color="white">mdi-play</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <!-- setting the items of the custom context menu -->
      <v-list>
        <v-list-item v-for="(item, index) in menuList" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-content>
</template>

<script>
export default {
  name: "Playlists",
  data() {
    return {
      // Custom context menu data section
      // menuList: items of the menu to be displayed "set to likedSongsMenu or playlistsMenu"
      // disabledMenu: flag to disable menu on outside card click - showMenu: menu v-model
      menuList: null,
      disableMenu: false,
      showMenu: false,
      likedSongsMenu: [{ title: "Copy Link" }],
      playlistsMenu: [
        { title: "Start Radio" },
        { title: "Make Secret" },
        { title: "Delete" },
        { title: "Copy Playlist link" }
      ],

      // Liked Songs Cards data section
      // likedSongs: hardcoded data "placeholders"
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

      // Playlists Cards data section
      // hoveredCardIndex: index of the hovered card, used to make the play button of the hovered playlist visable - playlists: hardcoded data "placeholders"
      hoveredCardIndex: null,
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
          description: "1 new playlist"
        },
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
          description: "1 new playlist"
        },
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
          description: "1 new playlist"
        },
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
          description: "1 new playlist"
        }
      ]
    };
  },
  created() {},
  methods: {
    // cardHover: called when card is hover to save its index, and close other context menus
    // note: the index of the liked songs card = -1
    cardHover(index) {
      this.hoveredCardIndex = index;
      this.disableMenu = false;
      this.showMenu = false;
    }
  },
  watch: {
    // watching showMenu "context menu v-model" to disable the menu if the click wasn't on playlist card and set the suitable context menu data
    showMenu: function() {
      if (this.showMenu)
        if (this.hoveredCardIndex === null) {
          this.disableMenu = true;
        } else if (this.hoveredCardIndex === -1) {
          this.menuList = this.likedSongsMenu;
        } else {
          this.menuList = this.playlistsMenu;
        }
    }
  }
};
</script>

<style>
/* common card (playlists and liked songs) styles section */

.card {
  height: 270;
  padding: 0;
  overflow: hidden;
  word-break: normal;
}

/* playlist card styles section */

.card-text {
  overflow: hidden;
  word-break: normal;
}

.card-text-title {
  height: 30px;
}

.card-text-subtitle {
  height: 20px;
}

/* liked songs card styles section */

.likedsongs-card-text {
  height: 100px;
}

.gradient-likedsongs-card {
  background: rgb(89, 0, 172);
  background: linear-gradient(
    152deg,
    rgba(89, 0, 172, 1) 0%,
    rgba(107, 107, 221, 1) 92%
  );
}
</style>
