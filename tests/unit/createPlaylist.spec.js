import { mount } from "@vue/test-utils";
import Vue from "vue"
import Vuetify from "vuetify";

import CreatePlaylist from "@/components/CreatePlaylist.vue";




describe("CreatePlaylist", () => {
  let wrapper;
  let vuetify;

  beforeEach(()=>{
    vuetify = new Vuetify()
    Vue.use(vuetify);
    wrapper = mount(CreatePlaylist, {
      vuetify
    });
  })

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Contains text feild", () =>{
    const textField=wrapper.find("#playlistName");
    expect(textField.exists()).toBe(true);
  });

  it("Empty playlist name at the begining", ()=>{
    expect(wrapper.vm.name).toBe("");
  });

  it("Contains cancel button" , () => {
    const cancelBtn=wrapper.find("#cancel");
    expect(cancelBtn.text() == "Cancel").toBe(true); 
  });

  it("Contains create button", () => {
    const createBtn=wrapper.find("#create");
    expect(createBtn.text()=="Create").toBe(true);
  });

  it("Contains close icon" , () => {
    const icon=wrapper.find("#closeIcon");
    expect(icon.exists()).toBe(true);
  });

  it("Input the playlist name",async () => {
    const textField=wrapper.find("#playlistName");
    textField.element.value="New Symphonia Playlist";
    textField.trigger("input");
    expect(wrapper.vm.name).toBe("New Symphonia Playlist");
  });

  it("Close the pop up with icon click",async () => {
    wrapper.vm.dialog=true;
    const icon=wrapper.find("#closeIcon");
    icon.trigger("click");
    expect(wrapper.vm.dialog).toBe(false);
  });
});