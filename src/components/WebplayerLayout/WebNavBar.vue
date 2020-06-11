<template>
  <!--The navigation bar of the webplayer-->
  <v-app-bar class="bar" app flat :color="handleTransparency()">
    <!--Two angle brackets to navigate with-->
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

    <!--input field for serach -->
    <v-text-field
      hide-details
      prepend-inner-icon="mdi-magnify"
      placeholder="Search for Artists,Songs"
      solo
      color="black"
      class="tf ml-3 py-0"
      v-show="showSearch"
      v-model="search"
      @input="request()"
    ></v-text-field>
    <!--The tabs of the the library-->
    <div
      class="mx-3"
      style="min-width:220px"
      v-show="showCollection"
      v-if="isLoggedIn()"
    >
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
      v-if="isLoggedIn() && !isPremium()"
      to="/premium/?checkout=false"
    >
      UPGRADE
    </v-btn>
    <!-- notification menu for history list-->
    <notification-historylist v-if="isLoggedIn()"></notification-historylist>
    <!--A menu of account, upgarde to premium ,logout -->
    <v-menu offset-y v-if="isLoggedIn()">
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
            <v-icon color="white" class="mx-2">
              mdi-account-outline
            </v-icon>
          </v-btn>

          <span class="hidden-md-and-down"> {{ getusername() }}</span>
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
          v-if="isLoggedIn() && !isPremium()"
          to="/premium/?checkout=false"
        >
          <v-list-item-title>Upgarde to premium</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          id="logout"
          @click="logOutAndRerender()"
          to="/webhome"
          exact
        >
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!--The next two buttons will be shown if the user hasen't logged in yet -->
    <v-btn v-if="!isLoggedIn()" outlined color="white" id="signUp" to="/signup">
      SIGN UP
    </v-btn>

    <v-btn
      v-if="!isLoggedIn()"
      color="white"
      id="logIn"
      class="mx-5"
      rounded
      to="/login"
    >
      LOG IN
    </v-btn>
  </v-app-bar>
</template>

<script>
import isLoggedIn from "../../mixins/userService/isLoggedIn";
import getusername from "../../mixins/userService/getusername";
import logOut from "../../mixins/userService/logOut";
import NotificationHistorylist from "../Notifications/NotificationHistorylist";
import isPremium from "../../mixins/userService/isPremium";
/**
 * @displayName Webplayer Navigation Bar
 * @example [none]
 */
export default {
  data: function() {
    return {
      hover: false,
      showSearch: false,
      showCollection: false,
      showUpgrade: false,
      showMenu: false,
      selectedItem: "More..",
      moreMenu: ["More..", "Artists", "Albums"],
      scrollPosition: null,
      scrolled: null,
      search: ""
    };
  },
  components: {
    NotificationHistorylist
  },
  created() {
    this.itemChosen(this.$route.name);
    this.handleTabs(this.$route.name);
    this.search = this.$route.params.name;
  },
  watch: {
    $route: function() {
      this.handleTabs(this.$route.name);
      this.itemChosen(this.$route.name);
    }
  },
  methods: {
    //Some validations are needed
    /**
     * Gets called when the user clicks on the left chevron icon to go backward
     * @public This is a public method
     * @param {none}
     */
    prev: function() {
      //the way to go backward             todo :Add the validation and change the buttons to disabled..
      this.$router.go(-1);
    },
    /**
     * Gets called when the user clicks on the right chevron icon to go forward
     * @public This is a public method
     * @param {none}
     */
    next: function() {
      this.$router.go(1);
    },
    /**
     * Handle which tabs will be displayed according to the route
     * @public This is a public method
     * @param {string} item route name
     */
    handleTabs: function(item) {
      if (item === "search" || item === "searchItem" || item == "searchNone") {
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
        this.search = "";
      } else if (item === "searchSeeAll") {
        this.showSearch = false;
        this.showCollection = false;
        this.showUpgrade = false;
      } else {
        this.showCollection = false;
        this.showSearch = false;
        this.showUpgrade = true;
        this.search = "";
      }
    },
    /**
     * Handle the menu list items according to the rout names
     * @public This is a public method
     * @param {string} item route name
     */
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
    },
    /**
     * Calculate the scrolled amount in the page to handle the transparency of the navigation bar
     * @public This is a public method
     * @param {none}
     */
    updateScroll() {
      var winScroll = window.scrollY;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      this.scrolled = winScroll / height;
    },
    /**
     * Changing the opacity of the navigation bar according to the scrolled amount
     * @public This is a public method
     * @param {none}
     */
    handleTransparency() {
      var opactiy = this.scrolled * 3;
      return "rgb(26, 26, 26," + opactiy + ")";
    },
    /**
     * Gets called when the user logs out
     * @public This is a public method
     * @param {none}
     */
    logOutAndRerender() {
      this.logOut();
      this.$forceUpdate();
      this.$store.commit("category/changeLogoutUpdate");
    },
    /**
     * Gets called when the user input text for search
     * @public This is a public method
     * @param {none}
     */
    request() {
      if (this.search === "") {
        this.$router.push("/webhome/search/");
      } else {
        this.$router.push({
          name: "searchItem",
          params: {
            name: encodeURI(this.search)
          }
        });
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
    this.handleTransparency();
  },
  //Remove the listerner when the component is destroied
  beforeDestroy() {
    window.removeEventListener("scroll", this.updateScroll);
  },
  mixins: [isLoggedIn, getusername, logOut, isPremium]
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
.bar {
  color: blue;
}
.tf {
  border-radius: 500px;
  margin-left: 5px;
  text-overflow: ellipsis;
}
#signUp {
  border-width: 0;
}
#signUp:hover,
#logIn:hover {
  transform: scale(1.1, 1.1);
}
#logIn {
  border-radius: 500px;
  padding-left: 35px;
  padding-right: 35px;
}
</style>
