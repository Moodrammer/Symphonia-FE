import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

//Import the required components
import category from "@/components/general/Category.vue";
import cardGrid from "@/components/general/CardGrid.vue";

describe("Category Component", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    wrapper = shallowMount(category, {
      vuetify
    });
  });

  it("Has Card Grid", () => {
    expect(wrapper.contains(cardGrid)).toBe(true);
  });
});
