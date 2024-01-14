import { createRouter, createWebHistory } from "vue-router";
import ProfileView from "@/views/ProfileView.vue";
import HowTo from "@/views/HowTo.vue";
import MyFeedView from "@/views/MyFeedView.vue";
import BookMarks from "@/views/BookMarks.vue";
import RootView from "@/views/RootView.vue";
import NotFound from "@/views/NotFound.vue";
//import LayoutWrapper from "@/layouts/LayoutWrapper.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: RootView,
    },

    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
    },
    {
      path: "/my-feed",
      name: "My feed",
      component: MyFeedView,
    },
    {
      path: "/how-to",
      name: "HOWTO",
      component: HowTo,
    },
    {
      path: "/bookmarks",
      name: "bookmarks",
      component: BookMarks,
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
