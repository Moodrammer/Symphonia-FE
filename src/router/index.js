import Vue from "vue";
import VueRouter from "vue-router";
import WebPlayerHome from "../views/WebPlayerHome";
import Homepage from "../views/Home.vue";
import Library from "../components/WebplayerContent/Library.vue";
import Playlists from "../components/collection/Playlists.vue";
import ALbums from "../components/collection/Albums.vue";
import Artists from "../components/collection/Artists.vue";
import UserSettings from "../views/UserSettings.vue";
import Search from "../components/WebplayerContent/Search.vue";
import HomeContent from "../components/WebplayerContent/HomeContentRouter.vue";
import Tracks from "../views/LikedSongs.vue";
import HomepagePremium from "../views/PremiumOffer.vue";
import PlaylistView from "../components/general/PlaylistView.vue";
import PassReset from "../components/PasswordMangement/PassReset.vue";
import PassChange from "../components/PasswordMangement/PassChange.vue";
import ArtistUI from "../components/ArtistInterface/ArtistInterface.vue";
import Overview from "../components/ArtistInterface/Overview";
import RelatedArtists from "../components/ArtistInterface/RelatedArtists";
import Queue from "../views/TheQueue.vue";
import GenreView from "../components/general/GenreView.vue";
import AlbumView from "../components/general/AlbumView.vue";
import UserUI from "../components/UserUI.vue";
import ArtistActivation from "../views/ArtistActivation.vue";
import SymphoniaArtist from "../components/ArtistDashboard/Dashboard.vue";
import SymphoniaArtistMain from "../components/ArtistDashboard/Main.vue";
import SymphoniaArtistAlbums from "../components/ArtistDashboard/Albums.vue";
import SymphoniaArtistSingles from "../components/ArtistDashboard/Singles.vue";
// import soundGrapher from "../components/TheSoundPlayer/TheSoundGrapher.vue";
import notfound from "../views/TheNotFoundPage.vue";

import isLoggedIn from "@/mixins/userService/isLoggedIn";

Vue.use(VueRouter);

const routes = [
  {
    path: "/SymphoniaArtist/:id",
    name: "SymphoniaArtist",
    component: SymphoniaArtist,
    redirect: "/SymphoniaArtist/:id/main",
    children: [
      {
        name: "main",
        path: "main",
        component: SymphoniaArtistMain,
        meta: {
          allowAnonymous: false
        }
      },
      {
        name: "albums",
        path: "albums",
        component: SymphoniaArtistAlbums,
        meta: {
          allowAnonymous: false
        }
      },
      {
        name: "singles",
        path: "singles",
        component: SymphoniaArtistSingles,
        meta: {
          allowAnonymous: false
        }
      }
    ]
  },
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
        },
        children:[
          {
            name: "search",
            path: "/",
            component: Search,
            meta: {
              allowAnonymous: true
            }
          }
        ]
      },
      {
        name: "searchItem",
        path: "search/:name",
        component: () => import("../components/Search/SearchResult.vue"),
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
    component: () => import("../views/SignUp.vue"),
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/account/",
    component: UserSettings,
    children: [
      {
        name: "overview",
        path: "",
        component: () => import("../components/User Settings/Overview.vue"),
        meta: {
          allowAnonymous: false
        }
      },
      {
        name: "EditProfile",
        path: "edit",
        component: () => import("../components/User Settings/EditProfile.vue"),
        meta: {
          allowAnonymous: false
        }
      },
      {
        name: "RecoverPlaylists",
        path: "recover-playlists",
        component: () =>
          import("../components/User Settings/RecoverPlaylist.vue"),
        meta: {
          allowAnonymous: false
        }
      },
      {
        name: "Notifications",
        path: "notifications",
        component: () => import("../components/User Settings/Notification.vue"),
        meta: {
          allowAnonymous: false
        }
      },
      {
        name: "ChangePassword",
        path: "changePassword",
        component: () =>
          import("../components/User Settings/ChangePassword.vue"),
        meta: {
          allowAnonymous: false
        }
      }
    ]
  },

  {
    path: "/password-reset",
    name: "forgetpassword",
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
    path: "/artist-activation/:activationToken",
    name: "artistActivation",
    component: ArtistActivation,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/about",
    name: "aboutUs",
    component: () => import("../views/About.vue"),
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "*",
    name: "notfound",
    component: notfound,
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
  if (to.name == "login" && isLoggedIn.methods.isLoggedIn()) {
    next({
      path: "/webhome/home"
    });
  } else if (to.name == "signup" && isLoggedIn.methods.isLoggedIn()) {
    next({
      path: "/"
    });
  } else if (!to.meta.allowAnonymous && !isLoggedIn.methods.isLoggedIn()) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

export default router;
