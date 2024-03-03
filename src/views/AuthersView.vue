<template lang="">
  <div class="min-h-screen px-5 mt-24">
    <div
      class="flex flex-col gap-4 justify-evenly sm:flex-row"
      v-if="!state.loading"
    >
      <AutherCard v-for="user in state.users" :key="user.uid" :item="user" />
    </div>
    <div class="grid gap-5 justify-items-center grid-cols-res2" v-else>
      <SkeletonCardPost v-for="item in 8" :key="item" />
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
import User from "@/service/firestore/User.js";
import AutherCard from "@/components/AutherCard.vue";
import SkeletonCardPost from "@/components/SkeletonCardPost.vue";
import { reactive, computed } from "vue";
import { UseOffsetPagination } from "@vueuse/components";
import { app } from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { useOffsetPagination } from "@vueuse/core";

const db = getFirestore(app);
const user = new User();

const state = reactive({
  users: [],
  total: null,
  page: 1,
  pageSize: 2,
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
    const { users, total } = await user.paginateUsers(
      db,
      "Users",
      currentPage,
      currentPageSize
    );

    state.total = total;
    state.users = users;
    //state.lastDoc = last;

    return users;
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
