<template>
  <v-navigation-drawer
    permanent
    dark
    app
    :mini-variant="$vuetify.breakpoint.mdAndDown"
  >
    <v-list dense nav class="py-0">
      <v-list-item v-show="$vuetify.breakpoint.lgAndUp">
        <v-list-item-avatar size="200" class="mx-auto mt-4">
          <img :src="image" />
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item v-show="$vuetify.breakpoint.lgAndUp">
        <v-list-item-content>
          <p align="center">{{ name }}</p>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-10"></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.route"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content v-show="$vuetify.breakpoint.lgAndUp">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import getusername from "../../mixins/userService/getusername";
import getimageUrl from "../../mixins/userService/getimageUrl";

export default {
  mixins: [getusername, getimageUrl],
  name: "Drawer",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Main", icon: "mdi-view-dashboard", route: "main" },
        { title: "Singles", icon: "mdi-music-circle", route: "singles" },
        { title: "Albums", icon: "mdi-album", route: "albums" },
        {
          title: "Back to Symphonia",
          icon: "mdi-arrow-left-circle",
          route: "/webhome"
        }
      ]
    };
  },

  computed: {
    name: function() {
      return this.getusername();
    },
    image: function() {
      return this.getimageUrl();
    }
  }
};
</script>
