<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <!-- Display the recieved notifications in a snackbar -->
      <NotificationPopup></NotificationPopup>
      <!--Display the webplayer home sections if the user logged in-->
      <Category
        v-for="category in categories"
        :key="category.categoryName"
        :categoryName="category.categoryName"
        :genreID="category.categoryID"
        :seeAll="category.showSeeAll"
        :gridItems="category.list"
        :contextMenu="contextMenu"
      />
    </v-container>
  </v-content>
</template>

<script>
import Category from "../general/Category";
import NotificationPopup from "../Notifications/TheNotificationPopUp"
import getuserToken from "../../mixins/userService/getUserToken";
import { messaging } from '../../firebaseConfig'
/**
 * The webplayer home content if the user is logged in
 * @displayName Home Content Login
 * @example [none]
 */
export default {
  components: {
    Category,
    NotificationPopup
  },
  created: function() {
    this.$store.dispatch("category/recentlyPlayedSection", this.getuserToken());
    this.$store.dispatch("category/getNewReleases");
    this.$store.dispatch("category/yourPlaylistsSection", this.getuserToken());
    this.$store.dispatch("category/loadGenres");
    //get registration token from the user if the user is logged in
      messaging.getToken()
      .then((currentToken) => {
      if(currentToken){
        console.log(currentToken)
        const tokens = {
          registrationToken: currentToken,
          userToken: this.getuserToken()
        }
        this.$store.dispatch("notification/sendTokenToServer", tokens)
      }
      else{
        console.log("Token couldnot be retrieved")
      }
      })
      .catch((err) => {
        console.log(err)
      })
      //set up a listener to catch notification messages
      messaging.onMessage((payload) => {
        console.log(payload)
        const notificationData = {
            notificationState: true,
            notificationText: payload.notification.body,
            timeout: 0
        }
        this.$store.dispatch("notification/setNotification", notificationData)
      })
  },
  computed: {
    categories: function() {
      return this.$store.state.category.categories;
    }
  },
  mixins: [getuserToken],
  props: {
    contextMenu: {}
  }
};
</script>
