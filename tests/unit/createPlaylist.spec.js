import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import vuetify from "vuetify";

import CreatePlaylist from "@/components/CreatePlaylist.vue";
jest.useFakeTimers();
describe("CreatePlaylist", () => {
  let wrapper;
  const localVue = createLocalVue();
  beforeEach(() => {
    Vue.use(vuetify);
    wrapper = shallowMount(CreatePlaylist, { localVue });
  });

  it("renders a vue instance", () => {
    expect(shallowMount(CreatePlaylist).isVueInstance()).toBe(true);
  });

  it("Contains text feild", () => {
    expect(wrapper.html()).toContain("<v-text-field");
  });

  it("Empty playlist name at the begining", () => {
    expect(wrapper.vm.name).toBe("");
  });
});
