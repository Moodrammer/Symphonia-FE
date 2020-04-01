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
        <v-row>
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
                @mouseover="cardHover(index,item.id)"
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
                  :src="item.images[0].url"
                ></v-img>

                <v-img
                  v-else
                  class="mx-auto elevation-6"
                  height="140px"
                  width="140px"
                  :src="item.images[0].url"
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
      <v-list-item v-for="(item, index) in cardItems.menuList" :key="index" @click="$emit('order', item.title, lastHoveredCard)">
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
      lastHoveredCard:null,
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
</style>
