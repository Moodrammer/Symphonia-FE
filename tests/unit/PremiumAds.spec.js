//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
//Importing the component to be tested
import PremiumAds from "@/components/User Settings/PremiumAds.vue";

describe("PremiumAds", () => {
  let wrapper;
  let vuetify;
  let store;
  let state;
  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    state = {
      user: {
        userType: "user"
      }
    };
    store = new Vuex.Store({
      state
    });
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = mount(PremiumAds, {
      store,
      router,
      vuetify,
      data() {
        return {};
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
  //check the function routes to primium link
  it("call the method", async () => {
    wrapper.vm.direct();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$router.currentRoute.fullPath).toBe(
      "/premium/?checkout=false"
    );
  });
  //check if the function called
  it("press the button", async () => {
    let button = wrapper.find("button");
    button.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$router.currentRoute.fullPath).toBe(
      "/premium/?checkout=false"
    );
  });
});
