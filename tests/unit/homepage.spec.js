import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";

import HomepageView from "@/views/Home.vue";
import HomepageContent from "@/components/Homepage/TheHomepageContent.vue";
import HomepageFooter from "@/components/Homepage/TheHomepageFooter.vue";
import HomepageLoginContent from "@/components/Homepage/TheHomepageLoginContent.vue";
import HomepageNavBar from "@/components/Homepage/TheHomepageNavigationBar.vue";
import HomepagePremiumContent from "@/components/Homepage/TheHomepagePremiumContent.vue"

describe("Homepage view", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);

    Vue.use(Vuex);
    store = new Vuex.Store({
      modules: {
        homepage: {
          namespaced: true,
          state: {
            instance: {
              $forceUpdate: () => {}
            }
          },
          mutations: {
            setInstance: (state, instance) => { state.instance = instance }
          }
        }
      }
    })

    wrapper = shallowMount(HomepageView, {
      vuetify,
      store
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});

describe("Homepage Content", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);

    wrapper = shallowMount(HomepageContent, {
      vuetify,
      router,
      mocks: {
        $vuetify: { 
          breakpoint: {
            sm: true
          }
        }
      }
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});

describe("Homepage Footer", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);

    wrapper = shallowMount(HomepageFooter, {
      vuetify,
      router,
      mocks: {
        $vuetify: { 
          breakpoint: {
            sm: true
          }
        }
      }
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});

describe("Homepage Login Content", () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);

    wrapper = shallowMount(HomepageLoginContent, {
      vuetify,
      router,
      mocks: {
        $vuetify: { 
          breakpoint: {
            sm: true
          }
        }
      }
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});

describe("Homepage Navigation Bar", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);

    Vue.use(Vuex);
    store = new Vuex.Store({
      modules: {
        homepage: {
          namespaced: true,
          state: {
            instance: {
              $forceUpdate: () => {}
            }
          },
        }
      }
    })

    wrapper = shallowMount(HomepageNavBar, {
      vuetify,
      router,
      store,
      mocks: {
        $vuetify: { 
          breakpoint: {
            sm: true
          }
        }
      }
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("force the homepage to update its contet", () => {
    wrapper.vm.logOutAndRerender()
    expect(wrapper.vm.$forceUpdate).toBeCalled
    expect(wrapper.vm.homepageViewInstance.$forceUpdate).toBeCalled
  })
});
