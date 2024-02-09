<template>
  <!-- <RootView /> -->
  <!-- <LayoutWrapper /> -->
  <!-- <SplashScreen v-if="showSplash" /> -->
  <!-- <TopNavigation /> -->
  <router-view></router-view>
  
  <ModalPopup />
</template>
<script setup>
import TopNavigation from "./layouts/TopNavigation.vue";
import ModalPopup from "./components/ModalPopup.vue";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";
import { onBeforeMount } from "vue";

const { tryLoadingUser } = useAuthenticationStore();

onBeforeMount(() => {
  tryLoadingUser();
});

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
