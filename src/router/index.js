import Vue from "vue";
import VueRouter from "vue-router";
import WebPlayerHome from "../views/WebPlayerHome";
import Homepage from "../views/Home.vue";
import User_Settings from "../views/User_Settings.vue";
// eslint-disable-next-line no-unused-vars
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Homepage
    },
    {
        path: "/webhome",
        name: "WebHome",
        component: WebPlayerHome
    },
    {
        path: "/signup",
        name: "signup",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/SignUp.vue")
    },
    {
        path: "/login",
        name: "login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Login.vue")
    },
    {
        path: "/account/",
        name: "Acccount Setting",
        component: User_Settings,
        children: [{
                path: "",
                component: () =>
                    import ("../components/User Settings/overview.vue")
            },
            {
                path: "edit",
                component: () =>
                    import ("../components/User Settings/editProfile.vue")
            },
            {
                path: "recover-playlists",
                component: () =>
                    import ("../components/User Settings/recoverPlaylist.vue")
            },
            {
                path: "notifications",
                component: () =>
                    import ("../components/User Settings/notification.vue")
            }
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;