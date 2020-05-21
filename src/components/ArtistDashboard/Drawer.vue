<template>
      <v-navigation-drawer
        permanent
        dark
        app
      >
        <v-list
          dense
          nav
          class="py-0"
        >
        <v-list-item>
            <v-list-item-avatar size = 200  class="mx-auto">
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>
        </v-list-item>
         <v-list-item>
            <v-list-item-content>
              <p align="center">Application</p>
            </v-list-item-content>
        </v-list-item>  

          <v-divider class="mb-10"></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
  export default {
    name : "Drawer",
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Main', icon: 'mdi-view-dashboard' },
          { title: 'Singles', icon: 'mdi-music-circle' },
          { title: 'Albums', icon: 'mdi-album' },
          { title: 'Back to Symphonia', icon: 'mdi-arrow-left-circle' },
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        permanent: true,
        miniVariant: false,
        expandOnHover: false,
        background: false,
      }
    },
    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
  }
</script>