import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import category from "@/components/general/Category.vue";
import cardGrid from "@/components/general/CardGrid.vue";


//const localVue = createLocalVue();

describe("Category Component", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    wrapper = shallowMount(category, {
      router,
      vuetify
    });
  });

  it("Has Card Grid", () => {
    expect(wrapper.contains(cardGrid)).toBe(true);
  });

});
