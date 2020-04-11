//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
//Importing the component to be tested
import PremiumAds from "@/components/User Settings/PremiumAds.vue";

describe("PremiumAds", () => {
    let wrapper;
    let vuetify;
    beforeEach(() => {
        const router = new VueRouter();
        vuetify = new Vuetify();
        Vue.use(Vuetify);
        Vue.use(VueRouter);
        //using mount not shallowMount to render the true html behind vuetify's components which are child components
        //in order to find the elements by their ids
        wrapper = mount(PremiumAds, {
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
    it("call the method", () => {
        expect(wrapper.vm.direct()).toEqual(wrapper.find("button").trigger("click"));
    });
});