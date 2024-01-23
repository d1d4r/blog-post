<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">
  <TopNavigation />
 
  <div class="drawer md:drawer-open ">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <MainContent />
    <LeftSide />
  </div>
</template>
<script setup>
import LeftSide from "./LeftSide.vue";
import MainContent from "./MainContent.vue";
import TopNavigation from "./TopNavigation.vue";
</script>
<style lang=""></style>
