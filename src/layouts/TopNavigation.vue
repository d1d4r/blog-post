<template>
  <div class="fixed z-10 bg-white navbar">
    <div class="navbar-start">
      <div id="tel" class="block">
        <div>
          <label class="drawer-button" aria-label="open sidebar">
            <div
              tabindex="0"
              @click="toggleDrawer"
              class="btn btn-ghost btn-circle hover:bg-base-100 active:bg-base-300 focus:outline-none focus:ring focus:ring-violet-300"
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
    <div class="navbar-center">
      <router-link class="text-xl btn btn-ghost" to="/">K-Blog</router-link>
    </div>
    <div class="gap-4 navbar-end">
      <div class="flex">
        <div class="hidden sm:block">
          <router-link class="btn" to="/create">create post </router-link>
        </div>
        <router-link class="text-xl btn sm:hidden" to="/create">+ </router-link>
      </div>
      <!-- <div class="form-control">
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search"
          class="w-24 input input-bordered md:w-auto"
        />
      </div> -->
      <ProfileImage />
    </div>
  </div>
</template>
<script setup>
import ProfileImage from "@/components/ProfileImage.vue";
import { useDrawer } from "@/stores/openDrawer";
const { toggleDrawer } = useDrawer();
</script>
<style scoped></style>
