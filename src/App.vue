<template>

  <TopNavigation />
  <Layout >
    
  </Layout>

</template>
<script setup>
import TopNavigation from "./layouts/TopNavigation.vue";
import ModalPopup from "./components/ModalPopup.vue";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";
import { onBeforeMount } from "vue";
import LoadingOverlay from "./components/LoadingOverlay.vue";
import Layout from "./layouts/Layout.vue";

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
