<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">

  <div class="h-full drawer" >
    <DrawerToggle />
    <MainContent />
    <LeftSide />
  </div>
</template>
<script setup>
import LeftSide from "./LeftSide.vue";
import MainContent from "./MainContent.vue";
//import TopNavigation from "./TopNavigation.vue";
import DrawerToggle from "./DrawerToggle.vue";
//import { useDrawer } from "@/stores/openDrawer.js";

//const state = useDrawer();
</script>
<style lang=""></style>
