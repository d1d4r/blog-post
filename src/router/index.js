import { createRouter, createWebHistory } from "vue-router";
import ProfileView from "@/views/ProfileView.vue";
import HowTo from "@/views/HowTo.vue";
import MyFeedView from "@/views/MyFeedView.vue";
import BookMarks from "@/views/BookMarks.vue";
import NotFound from "@/views/NotFound.vue";
import CreatePost from "@/views/CreatePost.vue";
import BlogPost from "@/views/BlogPost.vue";
import RegisterUser from "@/views/RegisterUser.vue";
//import LogingUser from "@/views/LogingUser.vue";
//import LayoutWrapper from "@/layouts/LayoutWrapper.vue";
import RootView from "@/views/RootView.vue";
import Layout from "@/layouts/Layout.vue";
import MainContent from "@/layouts/MainContent.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: RootView,
    },
    {
      path: "/main",
      name: "main",
      component: Layout,
      children: [
        {
          path: "my-feed",
          components: {
            default: MyFeedView,
            MainContent,
          },
        },
        {
          path: "profile",
          components: {
            ProfileView,
          },
          children: [
            {
              path: "create",
              components: {
                CreatePost,
              },
            },
          ],
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: RegisterUser,
    },

    // {
    //   path: "/profile/create",
    //   name: "create",
    //   component: CreatePost,
    // },

    // {
    //   path: "/my-feed/blogpost/:id",
    //   name: "blogpost",
    //   component: BlogPost,
    // },
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "not-found",
    //   component: NotFound,
    // },
    // {
    //   path: "/how-to",
    //   name: "HOWTO",
    //   component: HowTo,
    // },
    // {
    //   path: "/bookmarks",
    //   name: "bookmarks",
    //   component: BookMarks,
    // },

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
