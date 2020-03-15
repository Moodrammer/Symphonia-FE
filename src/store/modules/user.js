import axios from 'axios'


const state = {email: ''}

const mutations = {}

const actions = {
    //this action takes the user data on login
    loginuser({state}, payload){
        //console.log(payload)
        state.email = this.email
        return new Promise((resolve, reject) => {
            axios.post('/v1/users/login', payload)
                .then(({data}) => {
                    console.log(data)
                    resolve(true)
                }).catch(error => {reject(error)
                    //console.log(error)
                })
        })
    }
}




export default {
    state, 
    mutations,
    actions
}