<template>
  <!-- adding custom context menu -->

      <v-container dark>
        <!-- adding the page content: -->
        <v-list
          v-if="cardStyle === 'artistUIList'"
          dark
          color="#1a1a1a"
          max-width="1800"
          class="mx-auto"
        >
          <v-list-item-group v-model="cardItems.selectedItem" color="#b3b3b3">
            <v-list-item
              v-for="(item, index) in cardItems.items.slice(0, 5)"
              @mouseenter="hoveredCardIndex = index"
              @mouseleave="hoveredCardIndex = null"
              :key="index"
            >
              <v-list-item-icon>
                <v-icon v-if="cardItems.selectedItem === index" color="white"
                  >mdi-pause</v-icon
                >
                <v-icon
                  v-else-if="hoveredCardIndex === index"
                  color="white"
                  >mdi-play</v-icon
                >
                <v-icon v-else>mdi-music-note</v-icon>
              </v-list-item-icon>
              <v-img :src="item.image" max-width="50" class="mr-5"></v-img>
              <v-list-item-title v-text="cardItems.name"></v-list-item-title>
              <v-list-item-subtitle class="text-end"
                ><span
                  v-show="hoveredCardIndex === index"
                  class="mr-5 display-1"
                  >...</span
                >{{ item.duration }}</v-list-item-subtitle
              >
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <div v-else-if="cardStyle === 'artistUICard'">
          <v-row>
            <v-col
              cols="12"
              lg="2"
              md="4"
              sm="6"
              class="my-4"
              v-for="(item, index) in AUIitems"
              :key="item.id"
            >
              <v-card
                width="240"
                height="240"
                class="mx-auto"
                flat
                :img="item.image"
                style="border-radius:0px"
                @mouseover="hoveredCardIndex = index"
                @mouseleave="hoveredCardIndex = null"
              >
                <v-btn
                  class="ma-auto"
                  width="240"
                  height="240"
                  color="transparent"
                  v-show="hoveredCardIndex === index"
                  ><v-icon x-large color="white">
                    mdi-play-circle-outline</v-icon
                  >
                </v-btn>
              </v-card>
              <p class="mt-3 subtitle-2 text-center white--text">
                {{ item.name }}
              </p>
            </v-col>
          </v-row>
          <div v-if="cardItems.items.length > 12" class="text-center">
            <v-btn
              v-if="showMoreBtn"
              text
              color="white"
              class="mx-auto"
              @click="showMore"
              >Show More <v-icon>mdi-chevron-down</v-icon></v-btn
            >
            <v-btn v-else text color="white" class="mx-auto" @click="showMore"
              >Show Less <v-icon>mdi-chevron-up</v-icon></v-btn
            >
          </div>
        </div>
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
                @mouseover="hoveredCardIndex = -1"
                @mouseleave="cardItems.hoveredCardIndex = null"
              >
                <!-- card text :liked songs artist and titles -->
                <div class="card-text likedsongs-card-text">
                  <v-card-text>
                    <span
                      v-for="(song, index) in cardItems.likedSongs"
                      :key="index"
                    >
                      <span v-for="(artist,index) in song.artists" :key="index"> {{ artist.name }} </span>
                      <span class="grey--text">{{ song.name }}.</span>
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
                @mouseover="hoveredCardIndex = index"
                @mouseleave="hoveredCardIndex = null"
                dark
                @click="cardClicked(item.id, item.type, false)"
                @contextmenu.prevent="menuClick($event, item.id, item.type)"

              >
                <!-- card image -->

                <v-img
                  v-if="item.type === 'artist'"
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
                    v-show="hoveredCardIndex === index"
                    fab
                    color="success"
                    small
                    id="play"
                    @click="cardClicked(item.id, name, true)"
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

<script>
export default {
  name: "CardGrid",
  props: [
    /**
     * Object consists of
     * items: array of objects contains the components of cards the grid
     * menuList: array of strings contains the context menu options
     * showMenu: boolean to know if context menu is shown
     * hoveredCardIndex: int to know the index of the hovered card
     */
    "cardItems",
    /**
     * style of the card
     * @values artist, artistUIList, artistUICard, none (default)
     */
    "cardStyle",
    "name",
    "contextMenu",
  ],
  data() {
    return {
      playBTNFlag: false,
      hoveredCardIndex: null,
      disableMenu: false,
      AUIitems: null,
      showMoreBtn: false
    };
  },
  created() {
    this.AUIitems = this.$props.cardItems.items;
    if (this.cardStyle==="artist" && this.AUIitems && this.AUIitems.length > 12) this.AUIitems = this.AUIitems.slice(0, 12);
    this.showMoreBtn = true;
  },
  methods: {
    menuClick(e,i,t){
      this.$props.contextMenu.event = e;
      this.$props.contextMenu.id = i;
      this.$props.contextMenu.type= t;
    },
    cardClicked(id, name, play) {
      if (this.playBTNFlag) {
        this.playBTNFlag = false;
        return;
      }
      if (play) {
        this.playBTNFlag = true;
      } else {
        this.$router.push(`/webhome/${name}/${id}`);
      }
    },
    /**
     * used in artist ui cards if there is more than 12 cards
     */
    showMore() {
      this.AUIitems = this.$props.cardItems.items;
      this.showMoreBtn = !this.showMoreBtn;
      if (this.showMoreBtn) this.AUIitems = this.AUIitems.slice(0, 12);
    },
    /**
     * called when card is hover to save its index, and close other context menus
     */

    // cardHover(index, id) {
    //   this.$props.cardItems.hoveredCardIndex = index;
    //   this.lastHoveredCard = id;
    //   this.disableMenu = false;
    //   this.$props.cardItems.showMenu = false;
    // },
    /**
     * called when user choose option from the context menu, it copy the url to user's clipboard if he chose the last option
     */
    // contextMenuClick(item, copyToClipboard) {
    //   this.$emit("order", item.title, this.lastHoveredCard, this.$props.name);
    //   console.log(copyToClipboard);
    //   if (copyToClipboard) {
    //     var url = this.$props.cardItems.items.find(
    //       item => item.id === this.lastHoveredCard
    //     );
    //     url = `https://zasymphonia.ddns.net/webhome/${url.type}/${url.id}`;
    //     var el = document.createElement("textarea");
    //     // Set value (string to be copied)
    //     el.value = url;
    //     // Set non-editable to avoid focus and move outside of view
    //     el.setAttribute("readonly", "");
    //     el.style = { position: "absolute", left: "-9999px" };
    //     document.body.appendChild(el);
    //     // Select text inside element
    //     el.select();
    //     // Copy text to clipboard
    //     document.execCommand("copy");
    //     // Remove temporary element
    //     document.body.removeChild(el);
    //   }
    // }
  },
  watch: {
    // watching showMenu "context menu v-model" to disable the menu if the click wasn't on card
    // "cardItems.showMenu": function() {
    //   if (
    //     this.$props.cardItems.showMenu &&
    //     this.$props.cardItems.hoveredCardIndex === null
    //   )
    //     this.disableMenu = true;
    //   //set the suitable context menu data in case of playlist card
    //   else if (
    //     this.$props.cardStyle === "playlist" &&
    //     this.$props.cardItems.hoveredCardIndex !== null
    //   ) {
    //     if (this.$props.cardItems.hoveredCardIndex === -1)
    //       this.$props.cardItems.menuList = this.$props.cardItems.likedSongsMenu;
    //     else
    //       this.$props.cardItems.menuList = this.$props.cardItems.playlistsMenu;
    //   }
    // },
    "cardItems.items": function() {
      this.AUIitems = this.$props.cardItems.items;
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
