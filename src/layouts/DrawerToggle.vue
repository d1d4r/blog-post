<template lang="">
  <input
    id="my-drawer"
    type="checkbox"
    :checked="drawerState.open"
    class="drawer-toggle"
    v-model="drawerState.open"
    @change="toggleDrawer"
  />
  <!-- <p @click="increment" class="test">count : {{ count }}</p> -->
  <!-- <p @click="toggleDrawer">open : {{ drawerState.open }}</p> -->
</template>
<script setup>
import { useDrawer } from "@/stores/openDrawer.js";
const { drawerState, toggleDrawer } = useDrawer();


</script>
<style scoped></style>
