<template lang="">
  <div class="navbar bg-base-100">
    <div class="flex-1 hidden md:block">
      <router-link class="text-xl btn btn-ghost" to="/">K-Blog</router-link>
    </div>
    <div class="navbar-start">
      <div id="tel" class="block">
        <div class="drawer-content">
          <label for="my-drawer" class="drawer-button sm:hidden">
            <div
              tabindex="0"
              class="btn btn-ghost btn-circle hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
          </label>
        </div>
      </div>
    </div>
    <router-link class="btn" to="/main/create"
      >create post <span>+</span></router-link
    >

    <ProfileImage />
    <!-- <ThemeDropdwon /> -->
  </div>
</template>
<script setup>
import ProfileImage from "@/components/ProfileImage.vue";
import ThemeDropdwon from "@/components/ThemeDropdwon.vue";
//import { app } from "@/firebase/index.js";
import Authentication from "@/service/auth/authentication";
import { onMounted } from "vue";
import { useDrawer } from "@/stores/openDrawer";

const { toggleDrawer } = useDrawer();

// const authentication = new Authentication();

// onMounted(async () => {
//   const uc = await authentication.getAuth();
//   console.log("🚀 ~ onMounted ~ uc:", uc);
// });
</script>
<style>
.btn {
  @apply mr-2;
}
</style>
