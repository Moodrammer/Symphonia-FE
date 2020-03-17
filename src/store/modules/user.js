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
    //an action to take user data on registering
    registerUser({state},payload){
        return new Promise((resolve, reject) => {
            state.username = "dummy"
            //send a post request with the user data to the database
            axios.post('/v1/users/signup',{
                name: payload.username,
                email: payload.email,
                emailconfirm: payload.emailToMatch,
                password: payload.password,
                DateOfBirth: '12-12-1980', //hardcoding the date for testing purposes
                gender: payload.gender

            })
            .then((response) => {console.log(response.data)
                //if a response returned
                //Store the current user token in the local storage
                //Maybe later I might need to parse the returned response to JSON before dealing with it 
                localStorage.setItem('userToken' , response.data.token)
                //Resolve to direct the user to the application
                resolve(true)
            })
            .catch((error) => {console.log(error)
                               reject(error)})
        })

    },
    //-----------------------------------------------------------------------------------------------------
    //this action takes the user data on login
    loginuser({commit}, payload){
        //console.log(payload)
        return new Promise((resolve, reject) => {
            axios.post('/v1/users/login', payload)
                .then((response) => {
                    console.log(response)
                    //if the status code shows a successful request
                    if(response.status == 200){
                        //parse the recieved response as a JSON object
                        //let resData = JSON.parse(response.data)
                        //console.log(response.data)
                        //store the user data in the store
                        commit("setUserData", response.data)
                        //since the local storage only stores strings we should convert the returned object first
                        // let userData = JSON.stringify(response.data)
                        window.localStorage.setItem('userToken', response.data.token)
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