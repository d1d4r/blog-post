<template>

  <TopNavigation />
  <Layout >
    
  </Layout>

</template>
<script setup>
import TopNavigation from "./layouts/TopNavigation.vue";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";
import { onBeforeMount } from "vue";
import Layout from "./layouts/Layout.vue";

const { tryLoadingUser } = useAuthenticationStore();

onBeforeMount(() => {
  tryLoadingUser();
});


</script>

<style scoped></style>
