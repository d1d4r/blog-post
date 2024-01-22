<template lang="">
  <div class="border-b border-b-base-300 navbar bg-base-100">
    <div class="flex-1 hidden md:block">
      <a class="btn btn-ghost text-xl">K-Blog</a>
    </div>
    <div class="navbar-start">
      <div id="tel" class="block">
        <div class="drawer-content">
          <label for="my-drawer-4" class="drawer-button sm:hidden">
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
    <ProfileImage />
  </div>
</template>
<script setup>
import ProfileImage from "@/components/ProfileImage.vue";
</script>
<style lang=""></style>
