<template lang="">
  <div class="z-20 w-full p-0 drawer-side">
    <label
      for="my-drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
      @click="toggleDrawer"
    >
    </label>
    <ul
      class="w-64 min-h-full p-4 bg-white border-r menu text-base-content"
    >
      <label
        for="my-drawer"
        class="flex flex-row justify-between drawer-button"
        @click="toggleDrawer"
      >
        <div class="w-1/2"></div>
        <div tabindex="0" class="btn active:bg-black btn-ghost btn-circle">
          <svg
            class="w-6 h-6 fill-current swap-on"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon
              points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
            />
          </svg>
        </div>
      </label>
      <li v-for="route in routes" :key="route.name" @click="toggleDrawer" class="text-sec">
        <router-link :to="`${route.path}`">
          <template v-if="route.icon === 'BookmarkIcon'">
            <BookmarkIcon class="size-7" />
          </template>
          <template v-else-if="route.icon === 'UserGroupIcon'">
            <UserGroupIcon class="size-7" />
          </template>
          <template v-else-if="route.icon === 'BookOpenIcon'">
            <BookOpenIcon class="size-7" />
          </template>
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useDrawer } from "@/stores/openDrawer.js";
import {
  BeakerIcon,
  BookmarkIcon,
  UserGroupIcon,
  BookOpenIcon,
} from "@heroicons/vue/16/solid";
let { toggleDrawer } = useDrawer();

const routes = ref([
  {
    name: "auhters",
    path: "/auhters",
    icon: "UserGroupIcon",
  },
  {
    name: "feed",
    path: "/my-feed",
    icon: "BookOpenIcon",
  },
  // {
  //   name: "howto ",
  //   path: "/how-to",
  //   icon: BeakerIcon,
  // },
  {
    name: "bookmarks ",
    path: "/bookmarks",
    icon: "BookmarkIcon",
  },
]);
</script>
<style scoped>

</style>
