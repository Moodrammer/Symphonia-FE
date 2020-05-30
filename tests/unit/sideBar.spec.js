//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
//Importing the component to be tested
import SideBar from "@/components/User Settings/SideBar.vue";

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
          });
        else if (mockState == "error")
          return Promise.reject({
            status: "error"
          });
        else return Promise.resolve();
      })
    };
    state = {
      user: {
        //User info
        userData: ""
      }
    };
    store = new Vuex.Store({
      state,
      actions
    });
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = mount(SideBar, {
      router,
      vuetify,
      store,
      data() {
        return {
          // The current user's data got from the created request
          image: ""
        };
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
});
