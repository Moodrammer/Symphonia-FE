<template>
  <v-navigation-drawer
    permanent
    dark
    app
    :mini-variant="$vuetify.breakpoint.mdAndDown"
  >
    <v-list dense nav class="py-0">
      <!-- Displaying artist info -->
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
      <!-- Displaying routing buttons -->
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.route"
        :id="item.id"
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
/**
 * @displayName Artist Dashboard Drawer
 * @example [none]
 */
export default {
  mixins: [getusername, getimageUrl],
  name: "Drawer",
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Main",
          icon: "mdi-view-dashboard",
          route: "main",
          id: "main"
        },
        {
          title: "Singles",
          icon: "mdi-music-circle",
          route: "singles",
          id: "singles"
        },
        { title: "Albums", icon: "mdi-album", route: "albums", id: "albums" },
        {
          title: "Back to Symphonia",
          icon: "mdi-arrow-left-circle",
          route: "/webhome",
          id: "backtoSymphonia"
        }
      ]
    };
  },

  /**
   * Function to get username
   * @public This is a public method
   * @param {none}
   */

  computed: {
    name: function() {
      return this.getusername();
    },
    /**
     * Function to get user profile photo
     * @public This is a public method
     * @param {none}
     */

    image: function() {
      return this.getimageUrl();
    }
  }
};
</script>
