<template lang="">
  <!-- <div class="drawer-content">
    <label for="my-drawer-4" class="drawer-button btn btn-primary"
      >Open drawer</label
    >
  </div> -->
  <div class="drawer sm:drawer-open">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content m-5">
      <MainContent />
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

        <li><a>profile</a></li>
        <li><a>My feed</a></li>
        <li><a>HOW TO?</a></li>
        <li><a>bookmarks</a></li>
      </ul>
    </div>
  </div>
</template>
<script setup>
// import { useDrawer } from "@/stores/openDrawer";
import MainContent from "@/layouts/MainContent.vue";

//const { drawer, toggleDrawer } = useDrawer();

// const isDrawerOpen = ref(false);

// const toggle = () => {
//   isDrawerOpen.value = !isDrawerOpen.value;
// };
</script>
<style lang=""></style>
