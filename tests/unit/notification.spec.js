//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from 'vuex'
//Importing the component to be tested
import notification from "@/components/User Settings/notification.vue";
describe("notification", () => {
  let wrapper;
  let vuetify;
  let store;
  let allowNotifications = false;
  let mutations;
  let actions;
  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuex);
    mutations =  {
      setPushNotificationsPermission: jest.fn()
    }
    actions = {
      getRegistrationToken: jest.fn(),
      unsubscribeUser: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        notification: {
          namespaced: true,
          state: {
            isPushNotificationsAllowed: true
          },
          mutations,
          actions
        }
      }
    })
    //using mount not shallowMount to render the true html behind vuetify's components which are child components
    //in order to find the elements by their ids
    wrapper = mount(notification, {
      vuetify,
      store,
      methods: {
        isNotificationsAllowed(){
          return allowNotifications;
        } 
      }
    });
  });
  //----------------------------------------------------------------------
  //                         rendering tests
  //----------------------------------------------------------------------
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
  //check if it is a vue instance
  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  //----------------------------------------------------------------------
  //                      testing functionality
  //----------------------------------------------------------------------
  it("enables notifications if allowed on creation", () => {
    allowNotifications = true;
    expect(mutations.setPushNotificationsPermission).toBeCalled()
  });

  it("disables notifications if not allowed on creation", () => {
    allowNotifications = false;
    expect(mutations.setPushNotificationsPermission).toBeCalled()
  });

  it("switching on and off the switch", () => {
    const permissionSwitch = wrapper.find("#notification-permission-switch")
    permissionSwitch.trigger("change")
    expect(actions.unsubscribeUser).toBeCalled();
    permissionSwitch.trigger("change")
    expect(actions.getRegistrationToken).toBeCalled();
  });
});
