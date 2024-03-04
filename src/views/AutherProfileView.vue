<template lang="">
  <div class="min-h-screen px-5 mt-24">
    <div class="w-full grd h-44">
      <img
        loading="lazy"
        :src="state.user.photoURL"
        alt=""
        class="object-contain w-full h-full"
      />
    </div>
    <div class="prose">
      <h2>{{ state.user.displayName }}</h2>
      <p>{{ state.user.bio }}</p>
    </div>
    <div class="divider divider-neutral">posts</div>

    <div class="grid gap-2 justify-items-center grid-cols-res">
      <CardPost v-for="post in state.posts" :key="post.id" :item="post" />
    </div>
  </div>
</template>
<script setup>
import User from "@/service/firestore/User.js";
import Post from "@/service/firestore/Post.js";
import { useRoute } from "vue-router";
import { useOffsetPagination } from "@vueuse/core";
import { reactive, computed } from "vue";
import CardPost from "@/components/CardPost.vue";

const router = useRoute();
const user = new User();
const post = new Post();
const { id: userId } = router.params;

const state = reactive({
  posts: [],
  user: {},
  total: null,
  page: 1,
  pageSize: 5,
  lastDoc: null,
  loading: false,
});

const fetchPost = async ({ currentPage, currentPageSize }) => {
  try {
    state.loading = true;
    const { total, postarr } = await post.paginatePosts(
      "Posts",
      currentPage,
      currentPageSize,
      userId
    );

    const posts = [];
    for (let post = 0; post < postarr.length; post++) {
   
      const { displayName, photoURL, bio } = await user.getUser(
        postarr[post].userId
      );
      state.user = { displayName, photoURL, bio };
      posts.push({
        displayName,
        photoURL,
        ...postarr[post],
      });
    }

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
<style scoped>

</style>
