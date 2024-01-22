<template lang="">
  <div>this is register</div>
</template>
<script setup>
import { onMounted, onActivated } from "vue";

onActivated(() => {
  console.log("🚀 ~ onCreated ~ onCreated");
});

onMounted(() => {
  console.log("🚀 ~ onMounted ~ onMounted");
});
</script>
<style lang=""></style>
