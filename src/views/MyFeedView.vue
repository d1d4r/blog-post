<template lang="">
  <div v-if="!state.loading" class="grid gap 2 grid-cols-res">
    <CardPost v-for="item in state.posts" :key="item.id" :item="item" />
  </div>

  <div v-else class="grid gap-2 grid-cols-res">
    <SkeletonCardPost v-for="item in 200" :key="item.id" />
  </div>
</template>
<script setup>
import CardPost from "@/components/CardPost.vue";
import SkeletonCardPost from "@/components/SkeletonCardPost.vue";
import Post from "@/service/firestore/post.js";
//import { app } from "@/firebase/index.js";
import { reactive, onMounted } from "vue";

const post = new Post();

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
    state.loading = false;
  } catch (error) {
    state.error = error;
  } finally {
    state.loading = false;
  }
});
</script>
<style lang=""></style>
@/service/firestore/Post.js
