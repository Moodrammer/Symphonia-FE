import { shallowMount } from "@vue/test-utils";
import dashboard from "@/components/ArtistDashboard/Dashboard.vue";
import main from "@/components/ArtistDashboard/Main.vue";
import albums from "@/components/ArtistDashboard/Albums.vue";
import singles from "@/components/ArtistDashboard/Singles.vue";
import drawer from "@/components/ArtistDashboard/Drawer.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";

describe("Dashboard.vue", () => {
  let wrapper, store;
  let router = {
    $route: {
      name: "SymphoniaArtist/:id",
      params: {
        id: "artist"
      }
    },
    $router:{
      push: jest.fn()
    }
  };
  
  beforeEach(() => {
    const vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(dashboard, {
      vuetify,
      store,
      stubs: ["router-view"],
      mocks: router

    });
  });

  /////////////////////////////////////////////////////////
  /////////////     RENDERING TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("Creation condition", () => {
    Storage.prototype.getItem = jest.fn(() => "artist");
    expect(wrapper.exists()).toBe(true);
    });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  
});

describe("Main.vue", () => {
  let wrapper, vuetify, store;

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(main, {
      vuetify,
      store,
      router
    });
  });

  /////////////////////////////////////////////////////////
  /////////////     Functions TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("goToArtist", () => {
    Storage.prototype.getItem = jest.fn(() => "artist");
    let beforePush = wrapper.vm.$router.currentRoute.fullPath;
    wrapper.vm.goToArtist();
    expect(wrapper.vm.$router.currentRoute.fullPath).toBe(
      "/webhome/artist/artist"
    );
    wrapper.vm.$router.push(beforePush);
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
});

describe("Drawer.vue", () => {
  let wrapper, vuetify, store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(drawer, {
      vuetify,
      store
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
});

describe("Albums.vue", () => {
  let wrapper, vuetify, store;
  const app = document.createElement("div");
  app.setAttribute("data-app", true);
  document.body.append(app);

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(albums, {
      vuetify,
      store,
      router,
      stubs: {
        "v-form": {
          render: () => {},
          methods: {
            validate: () => true
          }
        }
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

  /////////////////////////////////////////////////////////
  /////////////     FUNCTIONS TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("goToAlbum", () => {
    const albumID = "e2wqrfds9fiw9fds9if3";
    let beforePush = wrapper.vm.$router.currentRoute.fullPath;
    wrapper.vm.goToAlbum(albumID);
    expect(wrapper.vm.$router.currentRoute.fullPath).toBe(
      `/webhome/album/${albumID}`
    );
    wrapper.vm.$router.push(beforePush);
  });

  it("reset function", () => {
    wrapper.vm.reset();
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dialog.addSong).toBe(false);
      expect(wrapper.vm.dialog.addAlbum).toBe(false);
      expect(wrapper.vm.dialog.rename).toBe(false);
      expect(wrapper.vm.dialog.remove).toBe(false);
    });
  });

  it("addAlbum function", async () => {
    wrapper.vm.addAlbum();
    await wrapper.vm.$nextTick();
    expect("reset").toBeCalled;
  });

  it("addSong function", async () => {
    wrapper.vm.addSong();
    await wrapper.vm.$nextTick();
    expect("reset").toBeCalled;
  });

  it("startLoading", async () => {
    wrapper.vm.startLoading = false;
    await wrapper.vm.$nextTick();
    expect("startLoading").toBeCalled;
  });

  it("deleteAlbum", async () => {
    wrapper.vm.setOperationData(null, null, null, null);
    wrapper.vm.remove();
    await wrapper.vm.$nextTick();
    expect("deleteAlbum").toBeCalled;
  });

  it("deleteTrack", async () => {
    wrapper.vm.setOperationData(null, null, null, 1);
    wrapper.vm.remove();
    await wrapper.vm.$nextTick();
    expect("deleteTrack").toBeCalled;
  });

  it("renameAlbum", async () => {
    wrapper.vm.setOperationData(null, null, null, null);
    wrapper.vm.rename();
    await wrapper.vm.$nextTick();
    expect("renameAlbum").toBeCalled;
  });

  it("renameTrack", async () => {
    wrapper.vm.setOperationData(null, null, null, 1);
    wrapper.vm.rename();
    await wrapper.vm.$nextTick();
    expect("renameTrack").toBeCalled;
  });

  it("setOperationData Function", () => {
    wrapper.vm.setOperationData("remove", null, null, 1);
    expect(wrapper.vm.dialog.remove).toBe(true);
    wrapper.vm.setOperationData("rename", null, null, 1);
    expect(wrapper.vm.dialog.rename).toBe(true);
    wrapper.vm.setOperationData("addSong", null, null, 1);
    expect(wrapper.vm.dialog.addSong).toBe(true);
  });
});

describe("Singles.vue", () => {
  let wrapper, vuetify, store;
  const app = document.createElement("div");
  app.setAttribute("data-app", true);
  document.body.append(app);

  beforeEach(() => {
    vuetify = new Vuetify();
    const router = new VueRouter();
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    store = new Vuex.Store(storeMock);

    wrapper = shallowMount(singles, {
      vuetify,
      store,
      router,
      stubs: {
        "v-form": {
          render: () => {},
          methods: {
            validate: () => true
          }
        }
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

  /////////////////////////////////////////////////////////
  /////////////     FUNCTIONS TESTS     ///////////////////
  /////////////////////////////////////////////////////////

  it("goToSingle", () => {
    const singleID = "dsae3e9ii9s90e32f903";
    let beforePush = wrapper.vm.$router.currentRoute.fullPath;
    wrapper.vm.goToSingle(singleID);
    expect(wrapper.vm.$router.currentRoute.fullPath).toBe(
      `/webhome/album/${singleID}`
    );
    wrapper.vm.$router.push(beforePush);
  });

  it("reset function", () => {
    wrapper.vm.reset();
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dialog.addSong).toBe(false);
      expect(wrapper.vm.dialog.addAlbum).toBe(false);
      expect(wrapper.vm.dialog.rename).toBe(false);
      expect(wrapper.vm.dialog.remove).toBe(false);
    });
  });

  it("addAlbum function", async () => {
    wrapper.vm.addAlbum();
    await wrapper.vm.$nextTick();
    expect("reset").toBeCalled;
  });

  it("addSong function", async () => {
    wrapper.vm.addSong();
    await wrapper.vm.$nextTick();
    expect("reset").toBeCalled;
  });

  it("startLoading", async () => {
    wrapper.vm.startLoading = false;
    await wrapper.vm.$nextTick();
    expect("startLoading").toBeCalled;
  });

  it("deleteAlbum", async () => {
    wrapper.vm.setOperationData(null, null, null, null);
    wrapper.vm.remove();
    await wrapper.vm.$nextTick();
    expect("deleteAlbum").toBeCalled;
  });

  it("deleteTrack", async () => {
    wrapper.vm.setOperationData(null, null, null, 1);
    wrapper.vm.remove();
    await wrapper.vm.$nextTick();
    expect("deleteTrack").toBeCalled;
  });

  it("renameAlbum", async () => {
    wrapper.vm.setOperationData(null, null, null, null);
    wrapper.vm.rename();
    await wrapper.vm.$nextTick();
    expect("renameAlbum").toBeCalled;
  });

  it("renameTrack", async () => {
    wrapper.vm.setOperationData(null, null, null, 1);
    wrapper.vm.rename();
    await wrapper.vm.$nextTick();
    expect("renameTrack").toBeCalled;
  });

  it("setOperationData Function", () => {
    wrapper.vm.setOperationData("remove", null, null, 1);
    expect(wrapper.vm.dialog.remove).toBe(true);
    wrapper.vm.setOperationData("rename", null, null, 1);
    expect(wrapper.vm.dialog.rename).toBe(true);
    wrapper.vm.setOperationData("addSong", null, null, 1);
    expect(wrapper.vm.dialog.addSong).toBe(true);
  });

  it("latest album null", async () => {
    store.state.artist.latestAlbum = null;
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dialog.addSong).toBe(false);
    });
  });

  it("changing latest album", async () => {
    store.state.artist.latestAlbum = 1;
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.operation.albumID).toBe(1);
      expect(wrapper.vm.dialog.addAlbum).toBe(false);
      expect(wrapper.vm.dialog.addSong).toBe(true);
    });
  });
});

const storeMock = {
  modules: {
    artist: {
      namespaced: true,
      state: {
        latestAlbum: 3
      },

      actions: {
        addNewAlbum: jest.fn(),
        addTrackToAlbum: jest.fn(),
        getArtistAlbums: jest.fn(),
        getSimplifiedCategories: jest.fn(),
        renameAlbum: jest.fn(),
        renameTrack: jest.fn(),
        deleteAlbum: jest.fn(),
        deleteTrack: jest.fn()
      },
      getters: {
        allArtistSingles: jest.fn(),
        latestAlbumIDGetter: jest.fn(state => state.latestAlbum),
        allArtistAlbums: jest.fn(),
        uploadingDone: jest.fn()
      }
    }
  }
};
