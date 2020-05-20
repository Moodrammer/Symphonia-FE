import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";

import DeletePlaylist from "@/components/DeletePlaylist.vue";

describe("DeletePlaylist", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    const router = new VueRouter();
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    Vue.use(VueRouter);

    const $route = {
      name: "home"
    };

    store = new Vuex.Store({
      modules: {
        playlist: {
          namespaced: true,
          state: {
            deletePlaylist: true
          },
          mutations: {
            changeDeleteModel: jest.fn()
          },
          actions: {
            deletePlaylist: jest.fn(),
            getPlaylists:jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(DeletePlaylist, {
      router,
      vuetify,
      store,
      $route
    });
  });

  //--------------------------------------------------------
  //                     Rendering
  //--------------------------------------------------------
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  //--------------------------------------------------------
  //        Check the existance of the components
  //--------------------------------------------------------
  it("Contains cancel button", () => {
    const cancelBtn = wrapper.find("#cancel");
    expect(cancelBtn.text() == "Cancel").toBe(true);
  });

  it("Contains delete button", () => {
    const createBtn = wrapper.find("#deleted");
    expect(createBtn.text() == "Delete").toBe(true);
  });

  it("Contains close icon", () => {
    const icon = wrapper.find("#closeIcon");
    expect(icon.exists()).toBe(true);
  });
  //------------------------------------------------------------
  //     CLose the pop up using close icon or cancel button
  //------------------------------------------------------------
  it("Close the pop up with icon click", async () => {
    wrapper.vm.dialog = true;
    const icon = wrapper.find("#closeIcon");
    icon.vm.$emit("click");
    expect(wrapper.vm.dialog).toBe(false);
  });

  it("Close the pop up with button click", async () => {
    wrapper.vm.dialog = true;
    const btn = wrapper.find("#cancel");
    btn.vm.$emit("click");
    expect(wrapper.vm.dialog).toBe(false);
  });
  //------------------------------------------------------
  //                  Delete Playlist
  //------------------------------------------------------
  //Test playlist deletion
  it("Delete a playlist", () => {
    wrapper.vm.dialog = true;
    const btn = wrapper.find("#deleted");
    btn.vm.$emit("click");
    expect("deletePlaylist").toHaveBeenCalled;
  });
});
