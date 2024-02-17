<template lang="">
  <div v-if="!blogPostState.loading" class="flex flex-col ">
    <div class="grid gap-2 justify-items-center grid-cols-res">
      <CardPost
        v-for="item in blogPostState.posts"
        :key="item.id"
        :item="item"
      />
    </div>
    <div class="p-5 m-auto join">
      <input
        class="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="1"
        checked
      />
      <input
        class="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="2"
      />
      <input
        class="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="3"
      />
      <input
        class="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="4"
      />
    </div>
  </div>

  <div v-else class="grid gap-2 grid-cols-res">
    <SkeletonCardPost v-for="item in 200" :key="item.id" />
  </div>
</template>
<script setup>
import CardPost from "@/components/CardPost.vue";
import SkeletonCardPost from "@/components/SkeletonCardPost.vue";
//import { app } from "@/firebase/index.js";
import { onMounted } from "vue";
import { useBlogPostStore } from "@/stores/useBlogPostStore";

const { blogPostState, fetchPosts } = useBlogPostStore();

onMounted(async () => {
  fetchPosts();
});
</script>
<style lang=""></style>
@/service/firestore/Post.js
