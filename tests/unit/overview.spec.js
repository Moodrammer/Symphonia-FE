//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
//Importing the component to be tested
import overview from "@/components/User Settings/overview.vue";
import bottomContent from "@/components/User Settings/bottomContent.vue";

describe("overview", () => {
    let wrapper;
    let vuetify;
    let store;
    let actions;
    let state;
    let mockState = "";
    beforeEach(() => {
        const router = new VueRouter();
        vuetify = new Vuetify();
        Vue.use(Vuetify);
        Vue.use(VueRouter);
        Vue.use(Vuex);
        actions = {
            userData: jest.fn(() => {
                if (mockState == "fail")
                    return Promise.reject({
                        status: "fail"
                    })
                else if (mockState == "error")
                    return Promise.reject({
                        status: "error"
                    })
                else
                    return Promise.resolve()
            })
        }
        state = {
            user: {
                //User info
                //The username of the current user
                username: "David",
                //The email of the current user
                userEmail: "test@test.com",
                //The user's date of Birth
                userDOB: "1998-12-19",
                //The country of the current user
                userCountry: "EG",
                //The gender of the current user
                userGender: "Male"
            }
        }
        store = new Vuex.Store({
            state,
            actions
        });
        //using mount not shallowMount to render the true html behind vuetify's components which are child components
        //in order to find the elements by their ids
        wrapper = mount(overview, {
            router,
            vuetify,
            store,
            data() {
                return {
                    // The current user's data got from the created request
                    user: {}
                };
            },
            components: {
                // The review section
                bottomContent: bottomContent
            }
        });
    });
    //rendering tests
    it("renders", () => {
        expect(wrapper.exists()).toBe(true);
    });
    //check if it is a vue instance
    it("renders a vue instance", () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });
    //sample of the requested data test
    it("check the store data username recieved", () => {
        let username = wrapper.find("#username");
        expect(username.text()).toBe("David");
    });
});