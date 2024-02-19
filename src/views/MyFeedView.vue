<template lang="">
  <div v-if="!blogPostState.loading" class="flex flex-col">
    <div class="grid gap-2 justify-items-center grid-cols-res">
      <CardPost
        v-for="item in blogPostState.posts"
        :key="item.id"
        :item="item"
      />
    </div>
    <div class="p-5 m-auto">
      <OffsetPagination/>
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
import { onMounted, reactive } from "vue";
//import { useBlogPostStore } from "@/stores/useBlogPostStore";
import OffsetPagination from "@/components/OffsetPagination.vue";
import Post from "@/service/firestore/Post.js";
//import { useOffsetPagination } from "@vueuse/core";
//const { blogPostState, fetchPosts } = useBlogPostStore();

const post = new Post();

const blogPostState = reactive({
  posts: [],
  total: 0,
  page: 1,
  pageSize: 1,
  loading: true,
});



const fetchPosts = async () => {
  blogPostState.loading = true;
  try {
    const  posts = await post.getAll();
 
    blogPostState.posts = posts;
    
  } catch (error) {
    console.error(error);
  } finally {
    blogPostState.loading = false;
  }
};
onMounted(async () => {
  fetchPosts(blogPostState.page, blogPostState.pageSize);
});
// const {
//   currentPage,
//   currentPageSize,
//   pageCount,
//   isFirstPage,
//   isLastPage,
//   prev,
//   next,
// } = useOffsetPagination({
//   total: blogPostState.total,
//   page: 1,
//   pageSize: blogPostState.pageSize,
//   onPageChange: fetchPosts,
//   onPageSizeChange: fetchPosts,
// });


</script>
<style lang=""></style>
@/service/firestore/Post.js
