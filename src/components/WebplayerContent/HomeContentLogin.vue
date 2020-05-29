<template>
  <v-content color="#b3b3b3" class="root white--text" fluid fill-height>
    <v-container class="ma-5">
      <!-- Display the recieved notifications in a snackbar -->
      <NotificationPopup
      :snackbar= showNotification
      :text= text
      :timeout= timeout
      @closeNotification="hideNotification"
      ></NotificationPopup>
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
import axios from 'axios'
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
  data(){
    return{
        showNotification: false,
        text: '',
        timeout: 0
    }
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
        this.sendTokenToServer(currentToken)
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
        this.text = payload.notification.body
        this.showNotification = true
      })
  },
  computed: {
    categories: function() {
      return this.$store.state.category.categories;
    }
  },
  methods:{
  /**
   * @public
   * used to send the registration token to the back and server if the user agrees to recieve tokens,
   * The token is used later to send notifications to the user
   * @param {string} currentToken
   */
    sendTokenToServer(currentToken){
      const userToken = this.getuserToken();
      axios.patch("/v1/me/registration-token", {
        token: currentToken
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
    },
    hideNotification(){
      this.showNotification = false
    }

  },
  mixins: [getuserToken],
  props: {
    contextMenu: {}
  }
};
</script>
