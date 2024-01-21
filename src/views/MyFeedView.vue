<template lang="">
  <div class="flex flex-wrap justify-evenly gap-7" v-if="!state.loading">
    <CardPost v-for="item in state.posts" :key="item.id" :item="item" />
  </div>
  <div class="flex flex-wrap justify-evenly gap-7" v-if="state.loading">
    <SkeletonCardPost v-for="item in 200" :key="item.id" />
  </div>
  <!-- <div class="toast toast-top toast-end">
    <div class="alert alert-success">
      <span>Message sent successfully.</span>
    </div>
  </div> -->
</template>
<script setup>
import CardPost from "@/components/CardPost.vue";
import SkeletonCardPost from "@/components/SkeletonCardPost.vue";
import Post from "@/service/firestore/post.js";
import { app } from "@/firebase/index.js";
import { reactive, onMounted } from "vue";

const post = new Post(app);

const state = reactive({
  posts: [],
  headers: [],
  loading: false,
  error: null,
});

onMounted(async () => {
  try {
    state.loading = true;
    state.posts = await post.getAll();
    console.log("🚀 ~ onMounted ~  state.posts:", state.posts);
    state.loading = false;
  } catch (error) {
    console.log("🚀 ~ onMounted ~ error:", error);
    state.error = error;
  } finally {
    state.loading = false;
  }
});
</script>
<style lang=""></style>
<!-- border-solid border-red-200 border-[1px] -->
<!-- const blogPostItems = [
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
]; -->
