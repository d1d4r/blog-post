<template lang="">
  <div class="p-0 border-r border-r-base-300 drawer-side">
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
      <label for="my-drawer-4" class="drawer-button sm:hidden">
        <div tabindex="0" class="btn active:bg-black btn-ghost btn-circle">
          <svg
            class="swap-on fill-current w-6 h-6"
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

      <router-link
        v-for="route in routes"
        :key="route.name"
        :to="`${route.path}`"
        class="p-3 hover:bg-base-300 rounded-md text-[15px]"
      >
        <li>{{ route.name }}</li>
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
</template>
<script setup>
import { ref } from "vue";
const isExpanded = ref(false);

const toggle = () => {
  isExpanded.value = !isExpanded.value;
};

const routes = ref([
  {
    name: "Profile ",
    path: "/main/profile",
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
<style lang=""></style>
