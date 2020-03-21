import { shallowMount } from "@vue/test-utils";
import Vue from 'vue';
import vuetify from "vuetify"

import NavBar from "@/components/WebNavBar.vue"



describe("NavBar", () => {
  let wrapper;

  beforeEach(()=>{
    Vue.use(vuetify);
    wrapper = shallowMount(NavBar);
  })

  it("renders a vue instance", () => {
    expect(shallowMount(NavBar).isVueInstance()).toBe(true);
  });



});
