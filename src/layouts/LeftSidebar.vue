<template lang="">
  <!-- <div class="drawer-content">
    <label for="my-drawer-4" class="drawer-button btn btn-primary"
      >Open drawer</label
    >
  </div> -->
  <div class="drawer sm:drawer-open">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content m-5">
      <!-- <MainContent /> -->
      <slot></slot>
    </div>

    <div class="drawer-side">
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <label for="my-drawer-4" class="drawer-button sm:hidden">
          <div tabindex="0" class="btn btn-ghost btn-circle">
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

        <router-link
          v-for="route in routes"
          :key="route.name"
          :to="`${route.path}`"
          class="p-3 hover:bg-base-300 rounded-md text-[15px]"
        >
          <li>{{ route.name }}</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const routes = ref([
  {
    name: "Profile",
    path: "/Profile",
  },
  {
    name: "My feed",
    path: "/my-feed",
  },
  {
    name: "HOWTO",
    path: "/how-to",
  },
  {
    name: "bookmarks",
    path: "/bookmarks",
  },
]);
</script>
<style lang=""></style>
