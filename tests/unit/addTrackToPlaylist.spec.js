import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import AddTrack from "@/components/AddTrackToPlaylist.vue";

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
          state:{
            addTrack:true,
            ownedPlaylists: []
          },
          mutations:{
            changeAddTrackModel: jest.fn(),
            createWithTrackModel: jest.fn(),
            changeCreateModel: jest.fn()
          },
          actions: {
            getOwnedPlaylists: jest.fn(),
            addTrackToPlaylist: jest.fn()
          }
        }
      }
    });

    wrapper = shallowMount(AddTrack, {
      vuetify,
      store,
      imageHover: jest.fn(Number)
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
  //        Check Functions Behaviour
  //--------------------------------------------------------
  it("Add track to the choosen playlist", () => {
    wrapper.vm.add();
    expect("addTrackToPlaylist").toBeCalled;
    expect("changeAddTrackModel").toBeCalled;
  });

  it("Set the index of the hovered image", () => {
    wrapper.vm.imageHover(2);
    expect(wrapper.vm.hoverIndex).toBe(2);
  });

  it("Get the owned playlist of the user",()=>{
    wrapper.vm.create();
    expect("createWithTrackModel").toBeCalled;
    expect("changeAddTrackModel").toBeCalled;
  });

  it("Change the popup model at closing",()=>{
    wrapper.vm.close();
    expect("changeAddTrackModel").toBeCalled;
    expect(wrapper.vm.dialog).toBe(false);
  });

});