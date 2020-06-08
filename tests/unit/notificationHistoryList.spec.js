import { shallowMount } from "@vue/test-utils";
import Vue from "vue"
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import NotificationHistorylist from '../../src/components/Notifications/NotificationHistorylist'

describe("NotificationHistorylist", () => {
    let wrapper;
    let store;
    let vuetify;
    
    beforeEach(() => {
        vuetify = new Vuetify();
        Vue.use(Vuetify);
        Vue.use(Vuex);
        
        store = new Vuex.Store({
            modules: {
            notification: {
                namespaced: true,
                state: {
                    historyList: [],
                    noNotificationHistory: false
                },
                mutations: {
                    setnoNotificationHistory: jest.fn()
                },
                actions: {
                    getNotificationHistoryList: jest.fn()
                }
            }
        }
    })

        wrapper = shallowMount(NotificationHistorylist, {
            vuetify,
            store
        })
    })
  //--------------------------------------------------------
  //                     Rendering
  //--------------------------------------------------------
    it("renders", () => {
        expect(wrapper.exists()).toBe(true);
    })

    it("is a vue instance", () => {
        expect(wrapper.isVueInstance()).toBe(true);
    })
  //--------------------------------------------------------
  //                   Testing Functionality
  //--------------------------------------------------------
    it("gets notification history list when created", () => {
        expect("getNotificationHistoryList").toBeCalled
    })

    it("sets noNotificationHistory to true if the historyList is not empty", () => {
        store.state.notification.historyList.push("a notification");
        expect("setnoNotificationHistory").toBeCalled
    })
})