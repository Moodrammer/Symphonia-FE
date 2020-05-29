import axios from 'axios'

const state = {
    notificationData:{
        isNotificationShown: false,
        text: '',
        timeout: 0
    },
    isTokenSentToServer: false
}

const mutations = {
    setNotificationState(state, payload) {
        state.notificationData.isNotificationShown = payload.notificationState
        state.notificationData.text = payload.notificationText
        state.notificationData.timeout = payload.timeout
    },

    setIsTokenSentToServer(state, payload){
        state.isTokenSentToServer = payload
    }
}

const actions = {
    setNotification({ commit }, notificationData){
        commit("setNotificationState", notificationData)
    },

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
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
};