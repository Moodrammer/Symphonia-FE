import axios from "axios";
import { Promise } from "core-js";

const state = {
    //User info
    //The user token used to authorize the user throught out the application
    userToken: "",
    //The user Id is used to identify the user in the application
    userId: "",
    //The username of the current user
    username: "",
    //The email of the current user
    userEmail: "",
    //The user's date of Birth
    userDOB: "",
    //If the user selects to remeber him
    RememberMe: false,
    //The country of the current user
    userCountry: "",
    //The gender of the current user
    userGender: ""
};

const mutations = {
    //Setting the user Data after a login session
    //with the response body data
    setUserData(state, payload) {
        state.userToken = payload.token;
        state.userId = payload.user._id;
        state.username = payload.user.name;
        state.userEmail = payload.user.email;
    },
    //To set the user's date of birth
    setuserDOB(state, payload) {
        state.userDOB = payload;
    },
    //Set remember me to true so that not to delete the user token
    setRememberMe(state) {
        state.RememberMe = false;
    },
    //Set country of the user
    setCountry(state, payload) {
        state.userCountry = payload;
    },
    //Set gender of the user
    setGender(state, payload) {
        state.userGender = payload;
    }
};

const actions = {
    //an action to take user data on registering
    registerUser({ state }, payload) {
        return new Promise((resolve, reject) => {
            //send a post request with the user data to the database
            axios
                .post("/v1/users/signup", {
                    name: payload.username,
                    email: payload.email,
                    emailconfirm: payload.emailToMatch,
                    password: payload.password,
                    DateOfBirth: state.userDOB,
                    gender: payload.gender,
                    type: payload.type
                })
                .then(response => {
                    //console.log(response.data)
                    //if a response returned
                    //Store the current user token in the local storage
                    //Maybe later I might need to parse the returned response to JSON before dealing with it
                    localStorage.setItem("userToken", response.data.token);
                    //Store the frequently needed user data in the localStorage
                    localStorage.setItem("username", response.data.user.name);
                    localStorage.setItem("email", response.data.user.email);
                    localStorage.setItem("userID", response.data.user._id);
                    localStorage.setItem("type", response.data.user.type);

                    //Resolve to direct the user to the application
                    resolve(true);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    },
    //-----------------------------------------------------------------------------------------------------
    //this action takes the user data on login
    loginuser({ commit }, payload) {
        //console.log(payload)
        return new Promise((resolve, reject) => {
            axios
                .post("/v1/users/login", payload)
                .then(response => {
                    //console.log(response)
                    //if the status code shows a successful request
                    if (response.status == 200) {
                        //parse the recieved response as a JSON object
                        //let resData = JSON.parse(response.data)
                        //console.log(response.data)
                        //store the user data in the store
                        commit("setUserData", response.data);
                        //since the local storage only stores strings we should convert the returned object first
                        // let userData = JSON.stringify(response.data)
                        //REMEMBER ME LOGIC
                        //If the user choses to remember him store his data in the local storage
                        if (payload.rm == true) {
                            localStorage.setItem("userToken", response.data.token);
                            //store the frequently used user data
                            localStorage.setItem("username", response.data.user.name);
                            localStorage.setItem("email", response.data.user.email);
                            localStorage.setItem("userID", response.data.user._id);
                            localStorage.setItem("type", response.data.user.type);
                        }
                        //If the user choses not to remember him store his data in the session Storage
                        else {
                            sessionStorage.setItem("userToken", response.data.token);
                            //store the frequently used user data
                            sessionStorage.setItem("username", response.data.user.name);
                            sessionStorage.setItem("email", response.data.user.email);
                            sessionStorage.setItem("userID", response.data.user._id);
                            sessionStorage.setItem("type", response.data.user.type);
                        }
                        resolve(true);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    async userData({ commit, state }, payload) {
        console.log("Inside the userData in user next the payload");
        console.log(payload);
        await axios
            .get("/v1/users/" + payload)
            .then(response => {
                console.log("Here the response data");
                console.log(response.data);
                let user = {
                    token: state.userToken,
                    user: {
                        _id: response.data.id,
                        name: response.data.name,
                        email: response.data.email
                    }
                };
                commit("setUserData", user);
                commit("setCountry", response.data.country);
                commit("setGender", response.data.gender);
                commit("setuserDOB", response.data.DateOfBirth);
                console.log(this.state);
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export default {
    state,
    mutations,
    actions
};