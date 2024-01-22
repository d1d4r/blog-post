<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">
  <TopNavigation />
  <div class="drawer md:drawer-open">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <MainConten />
    <LeftSide />
  </div>
</template>
<script setup>
import LeftSide from "./LeftSide.vue";
import MainConten from "./MainConten.vue";
import TopNavigation from "./TopNavigation.vue";
</script>
<style lang=""></style>
