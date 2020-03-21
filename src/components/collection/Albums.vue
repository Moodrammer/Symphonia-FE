<template>
  <div class="content">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
          v-for="(album, index) in albums"
          :key="index"
        >
          <v-menu absolute offset-y style="max-width: 600px" dark>
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
                  :src="album.image"
                ></v-img>

                <v-card-title class="white--text pl-0 pb-0">
                  {{ album.name }}
                </v-card-title>
                <v-layout row wrap>
                  <v-flex>
                    <v-card-text>{{ album.description }}</v-card-text>
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
  name: "Albums",
  methods: {
    customMenu(e, index) {
      this.customMenuIndex = index;
      console.log(index);
    }
  },
  data() {
    return {
      customMenuIndex: 0,
      showMenu: false,
      items: [{ title: "Delete" }, { title: "Copy Album link" }],
      playDisplayIndex: null,
      albums: [
        {
          name: "Amr Diab Collection",
          image:
            "https://direct.rhapsody.com/imageserver/images/alb.195641441/500x500.jpg",
          description: "1 new album"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://direct.rhapsody.com/imageserver/images/alb.195641441/500x500.jpg",
          description: "2 new album"
        },
        {
          name: "Amr Diab Collection",
          image:
            "https://direct.rhapsody.com/imageserver/images/alb.195641441/500x500.jpg",
          description: "3 new album"
        }
      ]
    };
  },
  created() {}
};
</script>

<style></style>
