import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/",
      name: "root",
      component: () => import("@/views/RootView.vue"),
    },
    // {
    //   path: "/main",
    //   name: "main",
    //   component: () => import("@/layouts/Layout.vue"),
    // },

    {
      path: "/my-feed",

      // alias: "/main",
      component: () => import("@/views/MyFeedView.vue"),
    },
    {
      path: "/blogpost/:id",
      component: () => import("@/views/BlogPost.vue"),
    },

    {
      path: "/auhters",
      component: () => import("@/views/AuthersView.vue"),
    },
    {
      path: "/auhter/:id",
      component: () => import("@/views/AutherProfileView.vue"),
    },
    {
      path: "/bookmarks",
      component: () => import("@/views/BookMarks.vue"),

      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("accessToken")) next();
        else next({ name: "signIn" });
      },
    },

    {
      path: "/create",
      component: () => import("@/views/CreatePost.vue"),

      beforeEnter: (to, from, next) => {
 

        if (localStorage.getItem("accessToken")) {
          next();
        } else {
    
          next({ name: "signIn" });
        }
      },
    },
    {
      path: "/profile",
      component: () => import("@/views/ProfileView.vue"),
    },

    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignUp.vue"),
    },
    {
      path: "/signIn",
      name: "signIn",
      component: () => import("@/views/SignIn.vue"),
    },
    {
      path: "/modal",
      name: "modal",
      component: () => import("@/components/ModalPopup.vue"),
    },
  ],
});

router.beforeEach(() => {
  window.scrollTo(0, 0);
});


export default router;
