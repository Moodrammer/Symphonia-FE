import { mount } from "@vue/test-utils";
import CardGrid from "@/components/general/CardGrid.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

describe("CardGrid.vue", () => {
  let wrapper;
  beforeEach(() => {
    const vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    wrapper = mount(CardGrid, {
      vuetify,
      router,
      propsData: {
        contextMenu: { event: -1, id: -1, type: -1 },
        cardItems: {
          items: [
            {
              name: "1",
              image:
                "https://www.bigstockphoto.com/images/homepage/module-6.jpg",
              describtion: "1",
              id: 1,
              type: "album"
            }
          ]
        },
        cardStyle: "artist",
        name: "albums"
      }
    });
  });

  /////////////////////////////////////////////////////////
  /////////////     RENDERING TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("card renders", () => {
    expect(wrapper.find(".card").exists()).toBe(true);
  });

  /////////////////////////////////////////////////////////
  /////////////     FUNCTIONS TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("menuClick function", async () => {
    wrapper.vm.menuClick(1, 2, 3);
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.props().contextMenu.event).toBe(1);
      expect(wrapper.props().contextMenu.id).toBe(2);
      expect(wrapper.props().contextMenu.type).toBe(3);
    });
  });

  it("card clicked", async () => {
    let beforePush = wrapper.vm.$router.currentRoute.fullPath;
    wrapper.vm.cardClicked(1, 1, false);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$router.currentRoute.fullPath).toBe("/webhome/1/1");
    wrapper.vm.$router.push(beforePush);
  });

  it("card button clicked", async () => {
    wrapper.vm.cardClicked(1, 1, true);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$router.currentRoute.fullPath).toBe("/webhome/1/1");
  });

  it("Route to genre", () => {
    wrapper.vm.cardClicked(1, "gerne", true);
    expect(wrapper.vm.$router.currentRoute.fullPath).toBe("/genre/1");
  });

  it("showMore clicked", async () => {
    wrapper.setData({ showMoreBtn: false });
    wrapper.vm.showMore();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showMoreBtn).toBe(true);
  });

  it("showLess clicked", async () => {
    wrapper.setData({ showMoreBtn: true });
    wrapper.vm.showMore();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showMoreBtn).toBe(false);
  });
});
