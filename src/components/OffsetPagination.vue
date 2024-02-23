<script setup>
import { ref } from "vue";
import { useOffsetPagination } from "@vueuse/core";
import { onMounted, reactive } from "vue";
import Post from "@/service/firestore/Post.js";

// const props = defineProps({
//   currentPage: {
//     type: Number,
//     required: true,
//   },
//   currentPageSize: {
//     type: Number,
//     required: true,
//   },
//   pageCount: {
//     type: Number,
//     required: true,
//   },
//   isFirstPage: {
//     type: Boolean,
//     required: true,
//   },
//   isLastPage: {
//     type: Boolean,
//     required: true,
//   },
//   prev: {
//     type: Function,
//     required: true,
//   },
//   next: {
//     type: Function,
//     required: true,
//   },
// });
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
    const posts = await post.getAll();
    blogPostState.posts = posts;

  } catch (error) {
    console.error(error);
  } finally {
    blogPostState.loading = false;
  }
};

onMounted(() => {
  fetchPosts();
});

const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: blogPostState.posts.length,
  page: 1,
  pageSize: blogPostState.pageSize,
  onPageChange: fetchPosts,
  onPageSizeChange: fetchPosts,
});
</script>

<template>
  <div class="inline-grid items-center grid-cols-2 gap-x-4 gap-y-2">
    <div opacity="50">total:</div>
    <div>{{}}</div>
    <div opacity="50">pageCount:</div>
    <div>{{ pageCount }}</div>
    <div opacity="50">currentPageSize:</div>
    <div>{{ currentPageSize }}</div>
    <div opacity="50">currentPage:</div>
    <div>{{ currentPage }}</div>
    <div opacity="50">isFirstPage:</div>
    <div>{{ isFirstPage }}</div>
    <div opacity="50">isLastPage:</div>
    <div>{{ isLastPage }}</div>
  </div>
  <div class="my-4 join">
    <button
      :disabled="isFirstPage"
      @click="prev"
      class="mr-2 join-item btn btn-outline"
    >
      prev
    </button>
    <button
      type="button"
      class="border border-black disabled:border-base-100 btn btn-md bg-base-100 disabled:bg-black disabled:text-base-100 disabled:cursor-not-allowed"
      v-for="item in pageCount"
      :key="item"
      :disabled="currentPage === item"
      @click="currentPage = item"
    >
      {{ item }}
    </button>
    <button
      :disabled="isLastPage"
      @click="next"
      class="ml-2 join-item btn btn-outline"
    >
      next
    </button>
  </div>

  <table>
    <thead>
      <tr>
        <td>id</td>
        <td>name</td>
      </tr>
    </thead>
    <tr v-for="d in blogPostState.posts" :key="d.id">
      <td class="p-3 border">{{ d.id }}</td>
      <td class="p-3 border">{{ d.title }}</td>
    </tr>
  </table>
</template>

<style scoped></style>
import { collection, getDocs, query, limit, orderBy, startAfter, getFirestore }
from "firebase/firestore"; import { useOffsetPagination } from "@vueuse/core";
import {app} from "@/firebase/index.js"; export default { setup() { const db =
getFirestore(app); const postsCollection = collection(db, "Posts"); // Replace
with your collection name const { currentPage, itemsPerPage, // Use 10 for 10
posts per page data: posts, isLoading, hasMorePosts, next, previous,
isFirstPage, isLastPage, } = useOffsetPagination({ // Customize data fetch logic
async initialQuery() { return await getDocs( query(postsCollection,
orderBy("title"), limit(itemsPerPage)) // Order and limit ); }, async
nextQuery() { const lastDoc = posts[posts.length - 1]; // Use last document as
starting point return await getDocs( query( postsCollection,
orderBy("creationDate"), startAfter(lastDoc), limit(itemsPerPage) ) ); }, });
const loadMorePosts = () => { next(); }; return { posts, isLoading,
hasMorePosts, loadMorePosts }; }, };
