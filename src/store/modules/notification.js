import axios from "axios";
import getuserToken from "../../mixins/userService/getUserToken";
import isLoggedIn from "../../mixins/userService/isLoggedIn";
import getuserID from "../../mixins/userService/getuserID";
import { messaging } from "../../firebaseConfig";

const state = {
  notificationData: {
    isNotificationShown: false,
    notificationTitle: "",
    notificationBody: "",
    notificationIcon: "/s11.png",
    color: "",
    timeout: 0,
    pushUrl: ""
  },
  isTokenSentToServer: false,
  historyList: [],
  noNotificationHistory: false,
  isPushNotificationsAllowed: true
};

const mutations = {
  setNotificationState(state, payload) {
    state.notificationData.isNotificationShown = payload.notificationState;
    state.notificationData.notificationTitle = payload.notificationTitle;
    state.notificationData.notificationBody = payload.notificationBody;
    state.notificationData.notificationIcon = payload.notificationIcon;
    state.notificationData.timeout = payload.timeout;
    state.notificationData.color = payload.color;
    state.notificationData.pushUrl = payload.pushUrl;
  },

  setIsNotificationShown(state, payload) {
    state.notificationData.isNotificationShown = payload;
  },

  setIsTokenSentToServer(state, payload) {
    state.isTokenSentToServer = payload;
  },

  setnoNotificationHistory(state, payload) {
    if (payload == true) {
      state.historyList = [];
    }
    state.noNotificationHistory = payload;
  },

  setNotificationHistoryList(state, payload) {
    state.historyList = payload;
  },

  setPushNotificationsPermission(state, payload) {
    state.isPushNotificationsAllowed = payload;
  }
};

const actions = {
  setNotification({ commit }, notificationData) {
    commit("setNotificationState", notificationData);
  },
  //--------------------------------------------------------------------------------------------------------------//
  sendTokenToServer({ commit }, tokens) {
    //Do only the request if the token is not already sent to the server
    if (!state.isTokenSentToServer) {
      axios
        .patch(
          "/v1/me/registration-token",
          {
            token: tokens.registrationToken
          },
          {
            headers: {
              Authorization: `Bearer ${tokens.userToken}`
            }
          }
        )
        .then(() => {
          commit("setIsTokenSentToServer", true);
        })
        .catch(() => {
          commit("setIsTokenSentToServer", false);
        });
    }
  },
  //--------------------------------------------------------------------------------------------------------------//
  unsubscribeUser({ commit }) {
    commit("setIsTokenSentToServer", false);
    const userToken = getuserToken.methods.getuserToken();
    axios
      .patch(
        "/v1/me/registration-token",
        {
          token: undefined
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .then(() => {
        commit("setIsTokenSentToServer", false);
      })
      .catch(err => {
        console.log("couldn't unsubscribe the user due to " + err);
      });
  },
  //--------------------------------------------------------------------------------------------------------------//
  getRegistrationToken({ dispatch, commit }, userToken) {
    messaging
      .getToken()
      .then(currentToken => {
        if (currentToken) {
          const tokens = {
            registrationToken: currentToken,
            userToken: userToken
          };
          dispatch("sendTokenToServer", tokens);
        } else {
          console.log("Token couldnot be retrieved");
          commit("setIsTokenSentToServer", false);
        }
      })
      .catch(err => {
        console.log(err);
        commit("setIsTokenSentToServer", false);
        dispatch("unsubscribeUser");
        commit("setPushNotificationsPermission", false);
        localStorage.setItem("allowNotifications", false);
        //show the user a snackbar
        const notificationData = {
          notificationState: true,
          notificationTitle: "",
          notificationBody:
            "Push notifications are blocked from the browser. You can unblock them later from the browser then enable them from the settings page",
          notificationIcon: "",
          color: "rgba(197, 57, 57, 0.93)",
          timeout: 0,
          pushUrl: "/account/notifications"
        };
        dispatch("setNotification", notificationData);
      });
  },
  //--------------------------------------------------------------------------------------------------------------//
  setRecieveNotificationHandler({ dispatch }) {
    messaging.onMessage(payload => {
      let data = JSON.parse(payload.data.data);
      let notificationTitle = payload.notification.title;
      let notificationUrl;
      //handling NotificationUrl
      if(notificationTitle == "Like Playlist") notificationUrl = `/webhome/user/${data.from}`
      else if(notificationTitle == "Following User") notificationUrl = `/webhome/user/${data.from}`
      else if(notificationTitle == "Tracks Updated") notificationUrl = `/webhome/album/${data.from}`
      else if(notificationTitle == "PlayList Updated") notificationUrl = `/webhome/playlist/${data.from}`
      const notificationData = {
        notificationState: true,
        notificationTitle: notificationTitle,
        notificationBody: payload.notification.body,
        notificationIcon: payload.notification.icon,
        color: "rgba(18, 17, 17, 0.9)",
        timeout: 0,
        pushUrl: notificationUrl
      };

      //make sure a user is logged in
      if (isLoggedIn.methods.isLoggedIn()) {
        // make sure that the sent notification id matches the current user ID
        if (getuserID.methods.getuserID() == data.to) {
          dispatch("setNotification", notificationData);
          //reload the history
          dispatch("getNotificationHistoryList");
        }
      }
    });
  },
  //--------------------------------------------------------------------------------------------------------------//
  setRefreshTokenHandler({ dispatch, commit }) {
    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then(newToken => {
          commit("setIsTokenSentToServer", false);
          const usrToken = getuserToken.methods.getuserToken();
          const tokens = {
            registrationToken: newToken,
            userToken: usrToken
          };
          //send the token to the server
          dispatch("sendTokenToServer", tokens);
        })
        .catch(err => {
          console.log("couldn't retrieve token", err);
        });
    });
  },
  //--------------------------------------------------------------------------------------------------------------//
  getNotificationHistoryList({ commit }) {
    axios
      .get("/v1/me/notifications", {
        headers: {
          Authorization: `Bearer ${getuserToken.methods.getuserToken()}`
        }
      })
      .then(response => {
        let list = response.data.notifications.items;
        let newList = [];
        //options for date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        list.forEach(element => {
          let data = JSON.parse(element.data.data)
          //handling the notification route
          let route;
          if(element.notification.title == "Like Playlist") route = `/webhome/user/${data.from}`
          else if(element.notification.title == "Following User") route = `/webhome/user/${data.from}`
          else if(element.notification.title == "Tracks Updated") route = `/webhome/album/${data.from}`
          else if(element.notification.title == "PlayList Updated") route = `/webhome/playlist/${data.from}`
          //handling the notification date
          let date = new Date(element.date)
          let day = date.toLocaleDateString('en-US', options)
          let time = date.toLocaleTimeString('en-US')
          let notificationDate = `${day} ${time}`
          var notification = {
            title: element.notification.title,
            body: element.notification.body,
            icon: element.notification.icon,
            pushUrl: route,
            date: notificationDate
          };
          newList.push(notification);
        });
        newList.reverse();
        commit("setNotificationHistoryList", newList);
      })
      .catch(() => {
        commit("setnoNotificationHistory", true);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
