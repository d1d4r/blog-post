<template>
  <!-- <RootView /> -->
  <!-- <LayoutWrapper /> -->
  <!-- <SplashScreen v-if="showSplash" /> -->
  <!-- <TopNavigation /> -->
  <router-view></router-view>
  <footer
    class="p-10 text-center text-white border-t-2 border-base-200 bg-base-500"
  >
    <p>© 2021 - All rights reserved</p>
  </footer>
</template>
<script setup>
import TopNavigation from "./layouts/TopNavigation.vue";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";


// import { onMounted, ref } from "vue";
// import SplashScreen from "./components/SplashScreen.vue";

// const showSplash = ref(true);

// onMounted(() => {
//   setTimeout(() => {
//     showSplash.value = false;
//   }, 2000);
// });

</script>

<style scoped></style>
