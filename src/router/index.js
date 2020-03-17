import Vue from "vue";
import VueRouter from "vue-router";
import WebPlayerHome from "../views/WebPlayerHome"
import Homepage from "../views/Home.vue";
import Library from "../components/Library.vue";
import Playlists from "../components/collection/Playlists.vue";
import ALbums from "../components/collection/Albums.vue";
import Artists from "../components/collection/Artists.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Homepage
  },
  {
    path:"/webhome",
    name: "WebHome",
    component:WebPlayerHome
  },
{
    path: "/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue")
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/library",
    name: "Library",
    component: Library,
    redirect: "/library/playlists",
    children: [
      {
        name: "Playlists",
        path: "playlists",
        component: Playlists
      },
      {
        name: "Artists",
        path: "artists",
        component: Artists
      },
      {
        name: "Albums",
        path: "albums",
        component: ALbums
      }
    ]
  }

]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
