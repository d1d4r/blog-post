<template lang="">
  <div class="grid">
    <CardPost v-for="item in items" :key="item.id" />
  </div>
</template>
<script setup>
import CardPost from "@/components/CardPost.vue";
const items = [
  {
    id: 1,
    title: "title 1",
    content: "content 1",
  },
  {
    id: 2,
    title: "title 2",
    content: "content 2",
  },
  {
    id: 3,
    title: "title 3",
    content: "content 3",
  },
];
</script>
<style lang=""></style>
