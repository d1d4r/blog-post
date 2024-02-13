<template lang="">
  <input id="my-drawer" type="checkbox" :checked="drawerState.open" class="drawer-toggle" />
  <p @click="increment" class="test">count : {{ count }}</p>
  <!-- <p @click="toggleDrawer">open : {{ drawerState.open }}</p> -->
</template>
<script setup>
import {ref} from "vue";
import { useDrawer } from "@/stores/openDrawer.js";
let { drawerState, toggleDrawer } = useDrawer();
const count = ref(0);

const increment = () => {
  count.value++;
};

</script>
<style scoped></style>
