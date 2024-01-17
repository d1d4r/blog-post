<template lang="">
  <div class="flex flex-wrap justify-evenly gap-7">
    <CardPost v-for="item in blogPostItems" :key="item.id" :item="item" />
  </div>
</template>
<script setup>
import CardPost from "@/components/CardPost.vue";

const blogPostItems = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2h ago",
    image:
      "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    tags: ["Fashion", "Products"],
  },
  {
    id: 2,

    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "3h ago",
    image:
      "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    tags: ["Fashion", "Products"],
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "4h ago",
    image:
      "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    tags: ["Fashion", "Products"],
  },
];
</script>
<style lang=""></style>
<!-- border-solid border-red-200 border-[1px] -->
