import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import vuetify from "vuetify";

import Homepage from "@/views/Home.vue";

jest.useFakeTimers();
describe("CreatePlaylist", () => {
  let wrapper;
  const localVue = createLocalVue();
  beforeEach(() => {
    Vue.use(vuetify);
    wrapper = shallowMount(Homepage, { localVue });
  });

  it("renders a vue instance", () => {
    expect(shallowMount(Homepage).isVueInstance()).toBe(true);
  });
});
