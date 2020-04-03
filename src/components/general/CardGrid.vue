<template>
  <!-- adding custom context menu -->
  <v-menu
    absolute
    offset-y
    style="max-width: 600px"
    dark
    v-model="cardItems.showMenu"
    :disabled="disableMenu"
  >
    <template v-slot:activator="{ on }">
      <v-container dark @contextmenu.prevent="on.click">
        <!-- adding the page content: -->

        <v-row v-if="cardStyle === 'artistui'">
          <v-col
            cols="12"
            lg="2"
            md="4"
            sm="6"
            class="my-4"
            v-for="(item, index) in cardItems.items"
            :key="item.id"
          >
            <v-card
              width="240"
              height="240"
              class="mx-auto"
              flat
              :img="item.image"
              style="border-radius:0px"
              @mouseover="cardHover(index, item.id)"
              @mouseleave="cardItems.hoveredCardIndex = null"
            >
              <v-btn
                class="ma-auto"
                width="240"
                height="240"
                color="transparent"
                v-show="cardItems.hoveredCardIndex === index"
                ><v-icon x-large color="white"> mdi-play-circle-outline</v-icon>
              </v-btn>
            </v-card>
            <p class="mt-3 subtitle-2 text-center white--text">
              {{ item.name }}
            </p>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col
            cols="12"
            lg="4"
            md="6"
            sm="12"
            class="my-4"
            v-if="cardStyle === 'playlist' && cardItems.likedSongs.length > 0"
          >
            <!-- adding the liked songs card -->
            <div class="card">
              <v-card
                class="gradient-likedsongs-card"
                width="475"
                height="270"
                dark
                @mouseover="cardHover(-1)"
                @mouseleave="cardItems.hoveredCardIndex = null"
              >
                <!-- card text :liked songs artist and titles -->
                <div class="card-text likedsongs-card-text">
                  <v-card-text>
                    <span
                      v-for="(song, index) in cardItems.likedSongs"
                      :key="index"
                    >
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
                    >{{ cardItems.likedSongs.length }} liked
                    songs</v-card-subtitle
                  >
                </div>

                <!-- card play button -->
                <v-card-actions class="pr-5 pt-3">
                  <v-spacer></v-spacer>
                  <v-btn
                    v-show="cardItems.hoveredCardIndex === -1"
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

          <!-- setting grid columns system for cards -->
          <v-col
            cols="12"
            lg="2"
            md="4"
            sm="6"
            class="my-4"
            v-for="(item, index) in cardItems.items"
            :key="item.id"
          >
            <!-- adding the cards -->
            <div class="card">
              <v-card
                class="pa-6"
                width="200"
                height="270"
                color="#282828"
                @mouseover="cardHover(index, item.id)"
                @mouseleave="cardItems.hoveredCardIndex = null"
                dark
              >
                <!-- card image -->

                <v-img
                  v-if="cardStyle === 'artist'"
                  class="mx-auto elevation-6"
                  style="border-radius: 50%"
                  height="140px"
                  width="140px"
                  :src="item.image"
                ></v-img>

                <v-img
                  v-else
                  class="mx-auto elevation-6"
                  height="140px"
                  width="140px"
                  :src="item.image"
                ></v-img>

                <!-- card title -->
                <div class="card-text-title card-text">
                  <v-card-text class="pl-2 pb-0 pt-2 white--text">{{
                    item.name
                  }}</v-card-text>
                </div>

                <!-- card discription -->
                <div class="card-text-subtitle card-text">
                  <v-card-subtitle class="pl-2 pa-0">{{
                    item.description
                  }}</v-card-subtitle>
                </div>

                <!-- card play button -->
                <v-card-actions class="pa-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    v-show="cardItems.hoveredCardIndex === index"
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
      <v-list-item
        v-for="(item, index) in cardItems.menuList"
        :key="index"
        @click="contextMenuClick(item, index === cardItems.menuList.length - 1)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "CardGrid",
  props: ["cardItems", "cardStyle"],
  data() {
    return {
      lastHoveredCard: null,
      disableMenu: false
    };
  },
  created() {},
  methods: {
    // cardHover: called when card is hover to save its index, and close other context menus
    cardHover(index, id) {
      this.$props.cardItems.hoveredCardIndex = index;
      this.lastHoveredCard = id;
      this.disableMenu = false;
      this.$props.cardItems.showMenu = false;
    },
    contextMenuClick(item, copyToClipboard) {
      this.$emit("order", item.title, this.lastHoveredCard);
      console.log(copyToClipboard);
      if (copyToClipboard) {
        var url = this.$props.cardItems.items.find(
          item => item.id === this.lastHoveredCard
        );
        url = url.url;
        var el = document.createElement("textarea");
        // Set value (string to be copied)
        el.value = url;
        console.log("url", url);
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute("readonly", "");
        el.style = { position: "absolute", left: "-9999px" };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand("copy");
        // Remove temporary element
        document.body.removeChild(el);
      }
    }
  },
  watch: {
    // watching showMenu "context menu v-model" to disable the menu if the click wasn't on card
    "cardItems.showMenu": function() {
      if (
        this.$props.cardItems.showMenu &&
        this.$props.cardItems.hoveredCardIndex === null
      )
        this.disableMenu = true;
      //set the suitable context menu data in case of playlist card
      else if (
        this.$props.cardStyle === "playlist" &&
        this.$props.cardItems.hoveredCardIndex !== null
      ) {
        if (this.$props.cardItems.hoveredCardIndex === -1)
          this.$props.cardItems.menuList = this.$props.cardItems.likedSongsMenu;
        else
          this.$props.cardItems.menuList = this.$props.cardItems.playlistsMenu;
      }
    }
  }
};
</script>

<style>
/* card styles section */

.card {
  height: 270;
  padding: 0;
  overflow: hidden;
  word-break: normal;
}

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
