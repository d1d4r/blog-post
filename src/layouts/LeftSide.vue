<template lang="">
  <div class="p-0 border-r border-r-base-300 drawer-side" >
    <label
      for="my-drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>
    <ul class="w-64 min-h-full p-4 menu bg-base-200 text-base-content">
      <label
        for="my-drawer"
        class="flex flex-row justify-between drawer-button "
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
      <li v-for="route in routes" :key="route.name" @click="toggleDrawer">
        <router-link :to="`${route.path}`"> {{ route.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useDrawer } from "@/stores/openDrawer.js";

let { toggleDrawer } = useDrawer();

const routes = ref([
  {
    name: "auhters",
    path: "/main/auhters",
  },
  {
    name: "feed",
    path: "/main/my-feed",
  },
  {
    name: "HOWTO ",
    path: "/main/how-to",
  },
  {
    name: "bookmarks ",
    path: "/main/bookmarks",
  },
]);
</script>
<style scoped>
.active {
  @apply bg-base-100;
}
</style>
