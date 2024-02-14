<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">
  <!-- <TopNavigation /> -->
  <div class="drawer md:drawer-open">
    <DrawerToggle />
    <MainContent />
    <LeftSide />
  </div>
</template>
<script setup>
import LeftSide from "./LeftSide.vue";
import MainContent from "./MainContent.vue";
import TopNavigation from "./TopNavigation.vue";
import DrawerToggle from "./DrawerToggle.vue";
</script>
<style lang=""></style>
