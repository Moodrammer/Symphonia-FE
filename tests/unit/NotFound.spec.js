import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

import notfound from "../../src/views/TheNotFoundPage.vue";

describe("notfound", () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);

    wrapper = shallowMount(notfound, {
      vuetify
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
