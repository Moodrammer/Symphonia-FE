import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from 'vuex'

import CreatePlaylist from "@/components/CreatePlaylist.vue";

describe("CreatePlaylist", () => {
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        playlist: {
          namespaced: true,

          actions: {
            createPlaylist: jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(CreatePlaylist, {
      vuetify,
      store
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
  it("Contains text feild", () => {
    const textField = wrapper.find("#playlistName");
    expect(textField.exists()).toBe(true);
  });

  it("Empty playlist name at the begining", () => {
    expect(wrapper.vm.name).toBe("");
  });

  it("Contains cancel button", () => {
    const cancelBtn = wrapper.find("#cancel");
    expect(cancelBtn.text() == "Cancel").toBe(true);
  });

  it("Contains create button", () => {
    const createBtn = wrapper.find("#create");
    expect(createBtn.text() == "Create").toBe(true);
  });
  
  it("Contains close icon", () => {
    const icon = wrapper.find("#closeIcon");
    expect(icon.exists()).toBe(true);
  });
//-------------------------------------------------------------
//           Simulating input the playlist's name
//-------------------------------------------------------------
  it("Input the playlist name", async () => {
    const textField = wrapper.find("#playlistName");
    textField.element.value = "New Symphonia Playlist";
    textField.trigger("input");
    expect(wrapper.vm.name).toBe("New Symphonia Playlist");
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
  //                  Playlist Creation
  //------------------------------------------------------

  //Test playlist creation with a specific name
  it("Create a playlist with name", () => {
    wrapper.vm.dialog = true;
    const btn = wrapper.find("#create");
    wrapper.vm.name="NewPlaylist";
    btn.vm.$emit("click");
    expect("createPlaylist").toHaveBeenCalled;
  });

  //Test playlist creation without enter a playlist's name
  it("Create a playlist without name", () => {
    const btn = wrapper.find("#create");
    wrapper.vm.name="";
    btn.vm.$emit("click");
    expect("createPlaylist").toHaveBeenCalled;
  });
});
