<template lang="">
  <div class="min-h-screen mt-24">
    <div
      v-if="state.bookmarks.length === 0"
      class="flex items-center justify-center h-full text-5xl"
    >
      nothing here
    </div>
    <div v-else-if="state.loading" class="grid gap-2 grid-cols-res h-96">
      <SkeletonCardPost v-for="item in 4" :key="item.id" />
    </div>
    <div v-else>
      <div class="grid gap-2 justify-items-center grid-cols-res">
        <CardPost v-for="item in state.bookmarks" :key="item.id" :item="item" />
      </div>
    </div>

    <UseOffsetPagination>
      <div
        class="flex items-center justify-center gap-2 mt-10"
        :class="{ hidden: state.loading }"
      >
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
          @click="
            () => {
              itemTop();
              currentPage = item;
            }
          "
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
  </div>
</template>
<script setup>
import BookMark from "@/service/firestore/BookMark.js";
import CardPost from "@/components/CardPost.vue";
import SkeletonCardPost from "@/components/SkeletonCardPost.vue";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";
import { reactive, computed } from "vue";
import { UseOffsetPagination } from "@vueuse/components";
import { app } from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { useOffsetPagination } from "@vueuse/core";
import User from "@/service/firestore/User";

const { user } = useAuthenticationStore();
const users = new User();

const db = getFirestore(app);
const bookMark = new BookMark();

const state = reactive({
  bookmarks: [],
  total: null,
  page: 1,
  pageSize: 4,
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
  window.scrollTo(0, 0);
};

const d = () => {
  bookMark.fetchBookMarks(user.uid);
};

const fetchPost = async ({ currentPage, currentPageSize }) => {
  try {
    state.loading = true;
    const { postarr, total } = await bookMark.paginateBookMarks(
      db,
      user.uid,
      currentPage,
      currentPageSize
    );
    //console.log("🚀 ~ fetchPost ~ bookmarks:", bookmarks)
    const posts = [];
    for (let post = 0; post < postarr.length; post++) {
      //console.log(postarr[post].userId)
      const { displayName, photoURL } = await users.getUser(
        postarr[post].userId
      );
      posts.push({
        displayName,
        photoURL,
        ...postarr[post],
      });
    }

    state.total = total;
    state.bookmarks = posts;

    //state.lastDoc = last;

    return postarr;
  } catch (error) {
    console.log("🚀 ~ fetchPost ~ error:", error);
  } finally {
    state.loading = false;
  }
};

fetchPost({ currentPage: state.page, currentPageSize: state.pageSize });
//d()
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
@/service/firestore/BookMark.js
