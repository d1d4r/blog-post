<template lang="">
  <div class="min-h-screen">
    <div v-if="!state.loading" class="flex flex-col">
      <div class="grid gap-2 justify-items-center grid-cols-res">
        <CardPost v-for="item in state.posts" :key="item.id" :item="item" />
      </div>
    </div>
    <div v-else class="grid gap-2 grid-cols-res h-96">
      <SkeletonCardPost v-for="item in 4" :key="item.id" />
    </div>
  </div>
  <UseOffsetPagination>
    <div class="flex items-center justify-center gap-2">
      <button
        :disabled="isFirstPage"
        @click="prevTop"
        class="join-item btn btn-outline"
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
        @click="nextTop"
        class="join-item btn btn-outline"
      >
        next
      </button>
    </div>
  </UseOffsetPagination>
</template>

<script setup>
import CardPost from "@/components/CardPost.vue";
import SkeletonCardPost from "@/components/SkeletonCardPost.vue";
import { useOffsetPagination } from "@vueuse/core";
import { reactive, computed } from "vue";
import { UseOffsetPagination } from "@vueuse/components";
import Post from "@/service/firestore/Post";
import { app } from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore";

const { getUserInfo } = useAuthenticationStore();
const post = new Post();

const db = getFirestore(app);

const state = reactive({
  posts: [],
  total: null,
  page: 1,
  pageSize: 5,
  lastDoc: null,
  loading: false,
});

const nextTop = () => {
  next();
  window.scrollTo(0, 0);
};
const prevTop = () => {
  prev();
  window.scrollTo(0, 0);
};
const itemTop = () => {
  //this.currentPage = currentPage;
  //currentPage = item;
  window.scrollTo(0, 0);
};

const fetchPost = async ({ currentPage, currentPageSize }) => {
  try {
    state.loading = true;
    const { total, postarr } = await post.paginatePosts(
      db,
      "Posts",
      currentPage,
      currentPageSize
    );
    //const em = getUserInfo(postarr)

    const posts = [];
    // postarr.forEach(async (post) => {
    //   const { displayName, photoURL } = await getUserInfo(post.userId);

    //   posts.push({
    //     displayName,
    //     photoURL,
    //     ...post,
    //   });
    // });
    for (let post = 0; post < postarr.length; post++) {
      //console.log(postarr[post].userId)
      const { displayName, photoURL } = await getUserInfo(postarr[post].userId);
      posts.push({
        displayName,
        photoURL,
        ...postarr[post],
      });
    }
    console.log("🚀 posts", posts);
    console.log("🚀 postarr:", postarr);
    state.total = total;
    state.posts = posts;
    //state.lastDoc = last;

    return posts;
  } catch (error) {
    console.log("🚀 ~ fetchPost ~ error:", error);
  } finally {
    state.loading = false;
  }
};

fetchPost({ currentPage: state.page, currentPageSize: state.pageSize });

const t = computed(() => {
  return state.total;
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
  total: t,
  page: state.page,
  pageSize: state.pageSize,
  onPageChange: fetchPost,
  onPageSizeChange: fetchPost,
});
</script>
<style lang=""></style>
@/service/firestore/Post.js
