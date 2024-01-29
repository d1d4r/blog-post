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

      <router-link
        v-for="route in routes"
        :key="route.name"
        :to="`${route.path}`"
        class="p-3 hover:bg-base-300 rounded-md text-[15px]"
      >
        <li>{{ route.name }}</li>
      </router-link>

      <div>
        <label class="btn btn-circle swap swap-rotate">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" @click="toggle" />

          <!-- hamburger icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 swap-off"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>

          <!-- close icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 swap-on"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </label>
      </div>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";
import router from "../router";
const isExpanded = ref(false);

// router.beforeEach((to, from, next) => {
//   if (to.name !== "register" ) next({ name: "register" });
//   else next();
// });

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
<style>
.active {
  @apply bg-base-100;
}
.menu {
  @apply flex-col-reverse justify-end hover:w-20;
}
</style>
