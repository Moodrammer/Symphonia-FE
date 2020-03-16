import axios from 'axios'


const state = {
    //User info
    //The user token used to authorize the user throught out the application
    userToken: '',
    //The user Id is used to identify the user in the application
    userId: '',
    //The username of the current user
    username: '',
    //The email of the current user
    userEmail: '' 
}

const mutations = {
    //Setting the user Data after a login session
    //with the response body data
    setUserData(state,payload){
        state.userToken = payload.token;
        state.userId = payload.user._id;
        state.username = payload.user.name;
        state.userEmail = payload.user.email;
    }
}

const actions = {
    //this action takes the user data on login
    loginuser({commit}, payload){
        //console.log(payload)
        return new Promise((resolve, reject) => {
            axios.post('/v1/users/login', payload)
                .then((response) => {
                    console.log(response)
                    //if the status code shows a successful request
                    if(response.status == 200){
                        //store the user data in the store
                        commit("setUserData", response.data)
                        localStorage.setItem('user',response.data.user)
                        resolve(true)
                    }
                }).catch(error => {reject(error)})
        })
    }
}




export default {
    state, 
    mutations,
    actions
}