import axios from 'axios'
import getuserToken from "../../mixins/userService/getUserToken"
import { messaging } from '../../firebaseConfig'

const state = {
    notificationData:{
        isNotificationShown: false,
        notificationTitle: '',
        notificationBody: '',
        notificationIcon: '/s11.png',
        timeout: 0
    },
    isTokenSentToServer: false,
    historyList: [],
    noNotificationHistory: false
}

const mutations = {
    setNotificationState(state, payload) {
        state.notificationData.isNotificationShown = payload.notificationState
        state.notificationData.notificationTitle = payload.notificationTitle
        state.notificationData.notificationBody = payload.notificationBody
        state.notificationData.notificationIcon = payload.notificationIcon
        state.notificationData.timeout = payload.timeout
    },

    setIsTokenSentToServer(state, payload){
        state.isTokenSentToServer = payload
    },

    setnoNotificationHistory(state, payload){
        state.noNotificationHistory = payload
    },

    setNotificationHistoryList(state, payload){
        state.historyList = payload
    }
}

const actions = {
    setNotification({ commit }, notificationData){
        commit("setNotificationState", notificationData)
    },
//--------------------------------------------------------------------------------------------------------------//
    sendTokenToServer({commit}, tokens){
        //Do only the request if the token is not already sent to the server
        if(!state.isTokenSentToServer){
            axios.patch("/v1/me/registration-token", {
                token: tokens.registrationToken
            }, {
                headers: {
                    Authorization: `Bearer ${tokens.userToken}`
                }
            })
            .then(() => {
                commit("setIsTokenSentToServer", true)
            })
            .catch(() => {
                commit("setIsTokenSentToServer", false)
            }) 
        }
    },
//--------------------------------------------------------------------------------------------------------------//
    unsubscribeUser({commit}){
        commit("setIsTokenSentToServer", false)
        const userToken = getuserToken.methods.getuserToken();
        axios.patch("/v1/me/registration-token", {
            token: undefined
        }, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then(() => {
            commit("setIsTokenSentToServer", false)
        }).catch((err) => {
            console.log("couldn't unsubscribe the user due to " + err)
        })
    },
//--------------------------------------------------------------------------------------------------------------//
    getRegistrationToken({dispatch, commit}, userToken) {
        messaging.getToken()
        .then((currentToken) => {
        if(currentToken){
          const tokens = {
            registrationToken: currentToken,
            userToken: userToken
          }
          dispatch("sendTokenToServer", tokens)
        }
        else{
          console.log("Token couldnot be retrieved")
          commit("setIsTokenSentToServer", false)
        }
        })
        .catch((err) => {
          console.log(err)
          commit("setIsTokenSentToServer", false)
        })
      },
//--------------------------------------------------------------------------------------------------------------//
      setRecieveNotificationHandler({dispatch}){
          messaging.onMessage((payload) => {
              console.log(payload)
              const notificationData = {
                  notificationState: true,
                  notificationTitle: payload.notification.title,
                  notificationBody: payload.notification.body,
                  notificationIcon: payload.notification.icon,
                  timeout: 0
                }
                dispatch("setNotification", notificationData)
            })
        },
//--------------------------------------------------------------------------------------------------------------//
     setRefreshTokenHandler({dispatch, commit}){
         messaging.onTokenRefresh(() => {
            messaging.getToken()
            .then((newToken) =>
            {
                commit("setIsTokenSentToServer", false)
                const usrToken = getuserToken.methods.getuserToken();
                const tokens = {
                    registrationToken: newToken,
                    userToken: usrToken
                }
                //send the token to the server
                dispatch("sendTokenToServer", tokens)
            })
            .catch((err) => {
                console.log("couldn't retrieve token", err)
            })
         })
     },
//--------------------------------------------------------------------------------------------------------------//
     getNotificationHistoryList({commit}){
        axios.get("/v1/me/notifications",{
            headers: {
                Authorization: `Bearer ${getuserToken.methods.getuserToken()}`
            }
        })
        .then((response) => {
            let list = response.data.notifications.items
            let newList = [];
            list.forEach(element => {
                var notification = {
                    title: element.notification.title,
                    body: element.notification.body,
                    icon: element.notification.icon
                }
                newList.push(notification)
            });
            commit("setNotificationHistoryList", newList)
        })
        .catch(() => {
            commit("setnoNotificationHistory", true)
        })
     }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
};