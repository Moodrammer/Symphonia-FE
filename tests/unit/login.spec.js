//Importing plugins and helpers
import { mount } from "@vue/test-utils";
import Vue from "vue"
import Vuetify from "vuetify";
import VueRouter from "vue-router";
//Importing the component to be tested
import login from "@/views/Login.vue"

//const localVue = createLocalVue();

describe("login" , () => {
    let wrapper;
    let vuetify
    
    beforeEach(() => {
        const router = new VueRouter()
        vuetify = new Vuetify()
        Vue.use(Vuetify)
        Vue.use(VueRouter)
        //using mount not shallowMount to render the true html behind vuetify's components which are child components 
        //in order to find the elements by their ids
        wrapper = mount(login , {
            router, 
            vuetify,
         })
        //console.log(wrapper)
    })

    //rendering tests

    it("renders", () => {
        expect(wrapper.exists()).toBe(true);
    })

    //check if it is a vue instance
    it("renders a vue instance", () => {
        expect(wrapper.isVueInstance()).toBe(true);
      });

     //check if it contains a text field
    //  it("Contains text field", () => {
    //     expect(wrapper.html()).toContain("<v-text-field");
    //   });
      
     //check if it contains a login button
     it("renders the Log in button text correctly", () => {
         const btn_wrp = wrapper.find("#login-button")
         expect(btn_wrp.text() == "LOG IN").toBe(true)
     })

     //check if the continue with facebook button renders correctly
     it("renders the continue with Facebook button text correctly", () => {
         //find the facebook button through it id 
         const fb_btn_wrp = wrapper.find("#fb-login")
         //assert that it renders correctly
         expect(fb_btn_wrp.text()).toBe("CONTINUE WITH FACEBOOK")
     })

     //check if the continue with google button renders correctly
     it("renders the continue with Google button text correctly", () => {
        //find the facebook button through it id 
        const ggl_btn_wrp = wrapper.find("#ggl-login")
        //assert that it renders correctly
        expect(ggl_btn_wrp.text()).toBe("CONTINUE WITH GOOGLE")
    })

     //check if the alert appears on wrong submission
     it("shows an alert when the errorState is set to true",async () => {
        //set the errorState to true
        wrapper.vm.errorState = true;
        //wait for the next tick to ensure Dom Update
        await wrapper.vm.$nextTick()
        //assert if the alert appears exists returns true if the wrapper returned by find is not empty
        expect(wrapper.find(".v-alert__content").exists()).toBe(true)
     })

     //assert that the alert doesn't appear if the errorState is set to false
     it("hides the alert when the errorState is set to false",async () => {
        //set the errorState to true
        wrapper.vm.errorState = false;
        //wait for the next tick to ensure Dom Update
        await wrapper.vm.$nextTick()
        //assert if the alert appears
        expect(wrapper.find(".v-alert__content").exists()).toBe(false)
     })
     //--------------------------------------------------------------------------------------------
     //Userinput tests   
     
     //check if the data changes when an input is added to the user email text field
     it("stores user email data in the component local state", async () => {
         const email_wrp = wrapper.find("#login-username");
         //simulate entering the data by the user
         email_wrp.element.value = "m@gmail.com"
         email_wrp.trigger("input")
         //check if the local state is updated due to binding using v-model
         expect(wrapper.vm.formData.email).toBe("m@gmail.com");
    })
     
    //check if validation error message appears on wrong input to email address 
    it("causes a validation error on invalid email input", async () => {
        //find the email text field input element by id
        const email_wrp = wrapper.find("#login-username");
        //simulate entering an invalid email by the user
        email_wrp.element.value = "mahmoud"
        email_wrp.trigger("input")
        //await the next tick as vue batches the changes to the dom to prevent unnecessary re-renders
        await wrapper.vm.$nextTick()
        //assert that the validation message renders on wrong input
        expect(wrapper.find(".v-messages__wrapper").text()).toBe("E-mail must be valid")
    })
    
    //check if the data changes when an input is added to password text field
    it("stores user password data in the component local state", async () => {
        const pass_wrp = wrapper.find("#login-password");
        //simulate entering the data by the user
        pass_wrp.element.value = "12345678"
        pass_wrp.trigger("input")
        //check if the local state is updated due to binding using v-model
        expect(wrapper.vm.formData.password).toBe("12345678");
   })

   //check if the data in the model changes on using the checkbox
   it("changes the value of rememberme to true on checking the checkbox" , () => {
       const rm_wrp = wrapper.find("#rm-chkbx")
       //simulate checking the box by the user
       //rm_wrp.element.checked = false
       rm_wrp.trigger("change")
       //check if the data in the local state changed
       expect(wrapper.vm.formData.rememberMe).toBe(true)
   })
    
   //check if validation error message appears on empty input 

//    //form submission tests
//    it("submits the form and stores the data in the localStorage" , () => {
//        const email_wrp = wrapper.find("#login-username");
//         //simulate entering the data by the user
//         email_wrp.element.value = "Bob@gmail.com"
//         email_wrp.trigger("input")
//        const pass_wrp = wrapper.find("#login-password");
//         //simulate entering the data by the user
//         pass_wrp.element.value = "12345678"
//         pass_wrp.trigger("input")
//         //simulate clicking the login key
//         const btn_wrp = wrapper.find("#login-button")
//         btn_wrp.trigger("click")

//         //expect the userToken to be stored in the sessionStorage
//         expect(actions.loginuser).toHaveBeenCalled()
//  })

   //routing tests (check only the route without routing as the interaction between components doesn't lie under unit testing)
})