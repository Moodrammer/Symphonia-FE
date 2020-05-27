import Vue from "vue";
import VueRouter from "vue-router";
import WebPlayerHome from "../views/WebPlayerHome";
import Homepage from "../views/Home.vue";
import Library from "../components/WebplayerContent/Library.vue";
import Playlists from "../components/collection/Playlists.vue";
import ALbums from "../components/collection/Albums.vue";
import Artists from "../components/collection/Artists.vue";
import User_Settings from "../views/User_Settings.vue";
import Search from "../components/WebplayerContent/Search.vue";
import HomeContent from "../components/WebplayerContent/HomeContentRouter.vue";
import Tracks from "../views/LikedSongs.vue";
import HomepagePremium from "../views/PremiumOffer.vue";
import PlaylistView from "../components/general/PlaylistView.vue";
import PassReset from "../components/PasswordMangement/PassReset.vue";
import PassChange from "../components/PasswordMangement/PassChange.vue";
import ArtistUI from "../components/artistUI/ArtistUI";
import Overview from "../components/artistUI/Overview";
import RelatedArtists from "../components/artistUI/RelatedArtists";
import Queue from "../views/TheQueue.vue";
import GenreView from "../components/general/GenreView.vue";
import Google from "../components/oauth/google.vue";
import AlbumView from "../components/general/AlbumView.vue";
import UserUI from "../components/UserUI.vue";
import Facebook from "../components/oauth/facebook.vue";
import ArtistActivation from "../views/ArtistActivation.vue";

import isLoggedIn from "@/mixins/userService/isLoggedIn";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Homepage,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/webhome",
    name: "WebHome",
    component: WebPlayerHome,
    redirect: "webhome/home",
    children: [
      {
        name: "UserUI",
        path: "user/:id",
        component: UserUI,
        meta: {
          allowAnonymous: false
        }
      },
      {
        name: "ArtistUI",
        path: "artist/:id",
        component: ArtistUI,
        redirect: "artist/:id/overview",
        children: [
          {
            name: "Overview",
            path: "overview",
            component: Overview,
            meta: {
              allowAnonymous: false
            }
          },
          {
            name: "RelatedArtists",
            path: "related-artists",
            component: RelatedArtists,
            meta: {
              allowAnonymous: false
            }    
          }
        ]
      },
      {
        name: "home",
        path: "home",
        component: HomeContent,
        meta: {
          allowAnonymous: true
        }
      },
      {
        name: "search",
        path: "search",
        component: Search,
        meta: {
          allowAnonymous: true
        }
      },
      {
        name: "collection",
        path: "collection",
        component: Library,
        redirect: "collection/playlists",
        children: [
          {
            name: "Playlists",
            path: "playlists",
            component: Playlists,
            meta: {
              allowAnonymous: false
            }
          },
          {
            name: "Artists",
            path: "artists",
            component: Artists,
            meta: {
              allowAnonymous: false
            }
          },
          {
            name: "Albums",
            path: "albums",
            component: ALbums,
            meta: {
              allowAnonymous: false
            }
          },
          {
            name: "tracks",
            path: "tracks",
            component: Tracks,
            meta: {
              allowAnonymous: false
            }
          },
          {
            name: "queue",
            path: "queue",
            component: Queue,
            meta: {
              allowAnonymous: false
            }
          }
        ]
      },
      {
        name: "playlist/:id",
        path: "playlist/:id",
        component: PlaylistView,
        meta: {
          allowAnonymous: true
        }
      },
      {
        name: "album/:id",
        path: "album/:id",
        component: AlbumView,
        meta: {
          allowAnonymous: true
        }
      },
      {
        path: "/genre/:id",
        component: GenreView,
        meta: {
          allowAnonymous: true
        }
      }
    ]
  },
  {
    path: "/premium/",
    name: "HomePremium",
    component: HomepagePremium,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import("../views/SignUp.vue"),
      meta: {
        allowAnonymous: true
      }  
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/Login.vue"),
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/account/",
    name: "Acccount Setting",
    component: User_Settings,
    children: [
      {
        path: "",
        component: () => import("../components/User Settings/overview.vue"),
        meta: {
          allowAnonymous: false
        }
      },
      {
        path: "edit",
        component: () => import("../components/User Settings/editProfile.vue"),
        meta: {
          allowAnonymous: false
        }
      },
      {
        path: "recover-playlists",
        component: () =>
          import("../components/User Settings/recoverPlaylist.vue"),
          meta: {
            allowAnonymous: false
          }
      },
      {
        path: "notifications",
        component: () => import("../components/User Settings/notification.vue"),
        meta: {
          allowAnonymous: false
        }
      },
      {
        path: "changePassword",
        component: () => import("../components/User Settings/changePass.vue"),
        meta: {
          allowAnonymous: false
        }
      }
    ]
  },

  {
    path: "/password-reset",
    name: "forgetpassword",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/ForgetPass.vue"),
    redirect: "/password-reset/reset",
    children: [
      {
        path: "reset",
        name: "reset",
        component: PassReset,
        meta: {
          allowAnonymous: true
        }
      },
      {
        path: "change/:resettoken",
        name: "change",
        component: PassChange,
        meta: {
          allowAnonymous: true
        }
      }
    ]
  },

  {
    path: "/google/:userToken",
    name: "googleroute",
    component: Google,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/facebook/:userToken",
    name: "facebookroute",
    component: Facebook,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/artist-activation/:activationToken",
    name: "artistActivation",
    component: ArtistActivation,
    meta: {
      allowAnonymous: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
    if(to.name == 'login' && isLoggedIn.methods.isLoggedIn()){
      next({
        path:'/webhome/home'
      })
    }
    else if(to.name == 'signup' && isLoggedIn.methods.isLoggedIn()){
      next({
        path:'/'
      })
    }
    else if(!to.meta.allowAnonymous && !(isLoggedIn.methods.isLoggedIn())){
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
    else{
      next()
    }
})

export default router;
