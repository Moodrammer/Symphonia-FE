import { shallowMount, mount } from "@vue/test-utils";
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
          ],
          menuList: [
            { title: "Start Radio" },
            { title: "Remove from your Library" },
            { title: "Add to Playlist" },
            { title: "Copy Album link" }
          ],
          showMenu: false,
          hoveredCardIndex: null
        },
        cardStyle: null,
        name: "albums"
      }
    });
    // console.log(wrapper.html())
  });

  /////////////////////////////////////////////////////////
  /////////////       RENDERING     ///////////////////////
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
  /////////////         Card  Functions      //////////////
  /////////////////////////////////////////////////////////

  // it("card hover", async () => {
  //   wrapper.vm.cardHover(0, 1);
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.vm.lastHoveredCard).toBe(1);
  // });

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
    expect(wrapper.vm.$router.currentRoute.fullPath).toBe("/");
    expect(wrapper.vm.playBTNFlag).toBe(true);
  });

  it("return from card button clicked", async () => {
    wrapper.setData({ playBTNFlag: "true" });
    wrapper.vm.cardClicked(1, 1, false);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.playBTNFlag).toBe(false);
  });

  /////////////////////////////////////////////////////////
  ///////////// Context menu  Functions ///////////////////
  /////////////////////////////////////////////////////////

  // it("context menu clicked not copy option", async () => {
  //   let option = "not copy";
  //   wrapper.vm.contextMenuClick({ title: option }, false);
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.emitted().order[0][0]).toBe("not copy");
  // });

  /*it("context menu clicked copy option", async() =>{
    let option = "copy";
    wrapper.setData({ lastHoveredCard: 1 })
    wrapper.vm.contextMenuClick({title: option, id: 1}, true);
    await wrapper.vm.$nextTick()
    console.log(wrapper.emitted().order)
    expect(
        wrapper.emitted().order[0][0]
    ).toBe('copy')
 });*/

  /////////////////////////////////////////////////////////
  /////////////  Buttons Functions      ///////////////////
  /////////////////////////////////////////////////////////

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
