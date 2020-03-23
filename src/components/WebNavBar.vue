<template>
  <v-app-bar color="rgba(0, 0, 0, 0.6)" class="bar" app flat>
    <!--To angle brackets to navigate with-->
    <v-btn
      fab
      x-small
      color="black"
      class="mr-4 ml-6"
      @click="prev"
      id="backward"
    >
      <v-icon color="grey darken-1" large>mdi-chevron-left</v-icon>
    </v-btn>

    <v-btn
      fab
      x-small
      color="black"
      class="hidden-md-and-down"
      @click="next"
      id="forward"
    >
      <v-icon color="grey darken-1" large>mdi-chevron-right</v-icon>
    </v-btn>

    <v-text-field
      hide-details
      prepend-inner-icon="mdi-magnify"
      placeholder="Search for Artists,Songs"
      solo
      color="black"
      class="tf ml-3 py-0"
      v-show="showSearch"
    ></v-text-field>

    <div class="mx-3" style="min-width:220px" v-show="showCollection">
      <v-btn text color="white" class="mx-2" :to="{ name: 'Playlists' }">
        <span class="text-capitalize white--text">Playlists</span>
      </v-btn>

      <v-menu offset-y dark v-model="showMenu">
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            :text="selectedItem == 'More..'"
            width="100"
            v-on="on"
            class="hidden-lg-and-up"
          >
            <span class="text-capitalize white--text">{{ selectedItem }}</span>
            <v-icon v-if="showMenu" color="grey" right>mdi-menu-up</v-icon>
            <v-icon v-else color="grey" right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in moreMenu"
            :key="index"
            :to="{ name: item }"
          >
            <v-list-item-title class="text-capitalize white--text">
              {{ item }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        text
        color="white"
        class="mx-2 hidden-md-and-down"
        :to="{ name: 'Artists' }"
      >
        <span class="text-capitalize white--text">Artists</span>
      </v-btn>
      <v-btn
        text
        color="white"
        class="mx-2 hidden-md-and-down"
        :to="{ name: 'Albums' }"
      >
        <span class="text-capitalize white--text">Albums</span>
      </v-btn>
    </div>

    <!--Spacer to make the next elements start from the end-->
    <v-spacer></v-spacer>

    <!--Button which routes to the preimum form-->
    <v-btn
      outlined
      rounded
      class="upgarde white--text px-8 py-2 hidden-sm-and-down"
      id="upgarde"
      v-show="showUpgrade"
    >
      UPGRADE
    </v-btn>

    <!--A menu of account, upgarde to premium ,logout -->
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <!--Button to activate the menu-->
        <v-btn
          rounded
          color="rgb(0,0,0,0.7)"
          class="profile white--text pa-0"
          v-on="on"
          id="dropMenu"
        >
          <v-btn fab x-small color="rgb(0,0,0,0.7)" class="ml-1">
            <v-icon color="white" class="mx-2">mdi-account-outline</v-icon>
          </v-btn>

          <span class="hidden-md-and-down">UserName</span>
          <!--This to handle the icon changes when the menu is opened and closed-->
          <v-icon color="white" class="hidden-md-and-down" v-if="on">
            mdi-menu-down
          </v-icon>
          <v-icon color="white" class="hidden-md-and-down" v-else>
            mdi-menu-up
          </v-icon>
        </v-btn>
      </template>
      <!--Menu list-->
      <v-list color="#282828" dark class="mt-3">
        <v-list-item id="account" to="/account/">
          <v-list-item-title color="#b3b3b3">Account</v-list-item-title>
        </v-list-item>

        <v-list-item
          class="hidden-md-and-up"
          id="upgardepremium"
          v-show="showUpgrade"
        >
          <v-list-item-title>Upgarde to premium</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item id="logout">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data: function() {
    return {
      hover: false,
      showSearch: false,
      showCollection: false,
      showUpgrade: false,
      showMenu: false,
      selectedItem: "More..",
      moreMenu: ["More..", "Artists", "Albums"]
    };
  },
  created() {
    this.itemChosen(this.$route.name);
    this.handleTabs(this.$route.name);
  },
  watch: {
    $route: function() {
      this.handleTabs(this.$route.name);
      this.itemChosen(this.$route.name);
    }
  },
  methods: {
    //Some validations are needed
    prev: function() {
      //the way to go backward             todo :Add the validation and change the buttons to disabled..
      this.$router.go(-1);
    },
    next: function() {
      //the way to go forward
      this.$router.go(1);
    },
    handleTabs: function(item) {
      if (item === "search") {
        this.showSearch = true;
        this.showCollection = false;
        this.showUpgrade = false;
      } else if (
        item === "Playlists" ||
        item === "Artists" ||
        item === "Albums"
      ) {
        this.showSearch = false;
        this.showCollection = true;
        this.showUpgrade = false;
      } else {
        this.showCollection = false;
        this.showSearch = false;
        this.showUpgrade = true;
      }
    },
    itemChosen(item) {
      if (item == "Artists") {
        this.selectedItem = "Artists";
        this.moreMenu = ["Albums"];
      } else if (item == "Albums") {
        this.selectedItem = "Albums";
        this.moreMenu = ["Artists"];
      } else {
        this.selectedItem = "More..";
        this.moreMenu = ["Artists", "Albums"];
      }
    }
  }
};
</script>

<style scoped>
.upgarde {
  border: 2px solid #fff;
  font-size: 12px;
  border-radius: 500px;
  margin-right: 30px;
}

.upgarde:hover {
  transform: scale(1.1, 1.1);
}

.profile {
  border-radius: 23px;
  font-size: 10px;
}

.tf {
  border-radius: 500px;
  margin-left: 5px;
  text-overflow: ellipsis;
}
</style>
