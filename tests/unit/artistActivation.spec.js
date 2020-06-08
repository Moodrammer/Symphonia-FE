import { shallowMount } from "@vue/test-utils";
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios';

jest.mock('axios');

import ArtistActivation from '../../src/views/ArtistActivation'

describe("ArtistActivation", () => {
    let wrapper;
    let vuetify;
    let mockState = true;
    const data = {
        data: {
            token: "1",
            user: {
              name: "user",
              email: "a@a.com",
              _Id: "1",
              type: "user",
              imageUrl: "1"
            }
        }
    }
    
    beforeEach(() => {
        axios.patch.mockImplementationOnce(() => Promise.resolve(data));
        vuetify = new Vuetify();
        Vue.use(Vuetify);
        const $router = []
        const $route = {
            params: {
                activationToken: '1'
            }
        }

        wrapper = shallowMount(ArtistActivation, {
            vuetify,
            stubs:["pulse-loader"],
            mocks: {$router, $route}
        })
    })
    //-------------------------------------------------------------
    //                        Redering
    //-------------------------------------------------------------

    it("renders", () => {
        expect(wrapper.exists()).toBe(true)
    })

    //-------------------------------------------------------------
    //                     Testing functionality
    //-------------------------------------------------------------
    it("navigates to artist page", () => {
        wrapper.vm.navigateToArtistprofile();
        expect(wrapper.vm.$router[0]).toBe("/webhome/home")
    })

    it("sets isActivationfailed to true on fail status", async () => {
        const error = {
            response: {
                data: {
                    status: "fail"
                }
            }
        }
        const $route = {
            params: {
                activationToken: '1'
            }
        }
        axios.patch.mockImplementationOnce(() => Promise.reject(error))
        wrapper = shallowMount(ArtistActivation, {
            vuetify,
            stubs:["pulse-loader"],
            mocks: {$route}
        })
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.isActivationfailed).toBe(true)
    })

    it("sets isServerError to true on error status", async () => {
        const error = {
            response: {
                data: {
                    status: "error"
                }
            }
        }
        const $route = {
            params: {
                activationToken: '1'
            }
        }
        axios.patch.mockImplementationOnce(() => Promise.reject(error))
        wrapper = shallowMount(ArtistActivation, {
            vuetify,
            stubs:["pulse-loader"],
            mocks: {$route}
        })
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.isServerError).toBe(true)
    })
})