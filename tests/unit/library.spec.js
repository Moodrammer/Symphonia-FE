import { shallowMount } from "@vue/test-utils";
import library from "@/components/WebplayerContent/Library.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

describe("Library.vue", () => {
  let wrapper;
  beforeEach(() => {
    const router = new VueRouter();
    const vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    wrapper = shallowMount(library, { router, vuetify });
  });

  /////////////////////////////////////////////////////////
  /////////////     RENDERING TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("renders", () => expect(wrapper.exists()).toBe(true));

  it("renders vue instance", () => expect(wrapper.isVueInstance()).toBe(true));
});
