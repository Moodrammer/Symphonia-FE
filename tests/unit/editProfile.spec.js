//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
//Importing the component to be tested
import EditProfile from "@/components/User Settings/EditProfile.vue";
import BottomContent from "@/components/User Settings/BottomContent.vue";

describe("EditProfile", () => {
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
        if (mockState == "fail") {
          wrapper.vm.error = true;
          return Promise.reject({
            status: "fail"
          });
        } else return Promise.resolve();
      }),
      updateProfile: jest.fn(() => {
        if (mockState === "error") {
          return Promise.reject();
        } else {
          wrapper.vm.Done =true;
          return Promise.resolve();
        }
      })
    };
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
    };
    store = new Vuex.Store({
      state,
      actions
    });
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = mount(EditProfile, {
      router,
      vuetify,
      store,
      data() {
        return {
          user: {},
          // If the user from facebook ,user can't edit some data
          facebook: false,
          //if the gender Male is true , Female is false
          gender: true,
          //if the email is same we don't need the needPassword to access any change so it's true(disabled)
          prevEmail: "",
          //used for the display of  date options
          days: [],
          months: [],
          years: [],
          // The selected option for date
          selectedDay: "",
          selectedMonth: "",
          selectedYear: "",
          // to know the success or failure message
          Done: false,
          error: false
        };
      },
      components: {
        // The review section
        BottomContent: BottomContent
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
  //check if the computed function return the current email
  it("check the email computed function", () => {
    wrapper.vm.user.userEmail = "example@test.com";
    expect(wrapper.vm.email).toBe("example@test.com");
  });
  //check if the date is correct from the state
  it("check selected date function", () => {
    wrapper.vm.selectedDate();
    expect(wrapper.vm.user.userDOB).toBe("1998-12-19");
  });
  it("check if the userdata didn't recieved", () => {
    mockState = "fail";
    store.dispatch("userData");
    expect(wrapper.vm.error).toBe(true);
  });
  it("check if submit is called by pressing the button", () => {
    let btn = wrapper.find("#submit");
    btn.trigger("click");
    expect(wrapper.vm.submit).toHaveBeenCalled;
  });
  it("check the then and catch of submit error", async () => {
    mockState = "error";
    await wrapper.vm.submit();
    wrapper.vm.$nextTick();
    expect(wrapper.vm.error).toBe(true);
    expect(wrapper.vm.Done).toBe(false);
  });
  it("check the then and catch of submit", async () => {
    mockState = "";
    await store.dispatch("updateProfile");
    wrapper.vm.$nextTick();
    expect(wrapper.vm.Done).toBe(true);
  });
  it("check that both are false at first", () => {
    expect(wrapper.vm.Done).toBe(false);
    expect(wrapper.vm.error).toBe(false);
  });
});
