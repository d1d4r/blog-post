<template lang="">
  <!-- <div class="drawer-content">
    <label for="my-drawer-4" class="drawer-button btn btn-primary"
      >Open drawer</label
    >
  </div> -->
  <div class="drawer md:drawer-open">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content m-5">
      <!-- <MainContent /> -->
      <slot></slot>
    </div>

    <div class="drawer-side p-0">
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul
        :class="
          'min-h-full  menu bg-base-200 text-base-content p-4 ' +
          (isExpanded ? 'w-20' : 'w-80')
        "
      >
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
          <li > {{ route.name }}</li>
         
          
          
        </router-link>

        <div>
          <label for="expand" class="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </label>
          <input id="expand" type="checkbox" @click="toggle" class="hidden" />
        </div>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import save from "@/assets/save.svg";
import howto from "@/assets/howto.svg";
import profile from "@/assets/profile.svg";
import post from "@/assets/post.svg";

const isExpanded = ref(false);

const toggle = () => {
  isExpanded.value = !isExpanded.value;
};

const routes = ref([
  {
    name: "Profile ",
    path: "/profile",
    icon: profile,
  },
  {
    name: "feed",
    path: "/my-feed",
    icon: post,
  },
  {
    name: "HOWTO ",
    path: "/how-to",
    icon: howto,
  },
  {
    name: "bookmarks ",
    path: "/bookmarks",
    icon: save,
  },
]);
</script>
<style lang=""></style>
