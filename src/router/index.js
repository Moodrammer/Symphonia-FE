import Vue from "vue";
import VueRouter from "vue-router";
// eslint-disable-next-line no-unused-vars
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    // {
    //   path: "/",
    //   name: "Home",
    //   component: Home
    // },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/",
        name: "Account overview",
        component: () =>
            import ("../components/User Settings/overview.vue")
    },
    {
        path: "/edit",
        name: "Edit Profile",
        component: () =>
            import ("../components/User Settings/editProfile.vue")
    },
    {
        path: "/recover-playlists",
        name: "Recover playlists",
        component: () =>
            import ("../components/User Settings/recoverPlaylist.vue")
    },
    {
        path: "/notifications",
        name: "Notifications setting",
        component: () =>
            import ("../components/User Settings/notification.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;