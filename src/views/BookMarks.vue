<template lang="">
  <div
    v-if="checkEmpty"
    class="flex items-center justify-center h-full text-5xl"
  >
    nothing here
  </div>
  <div v-else>
    <div class="flex flex-wrap justify-center">
      <div
        v-for="bookmark in bookmarkState.bookMarks"
        :key="bookmark.id"
        class="m-5"
      >
        <div class="flex flex-col items-center">
          <div class="w-64 h-96">
            <img
              :src="bookmark.image"
              alt="image"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="mt-5">
            <h1 class="text-2xl font-bold">{{ bookmark.title }}</h1>
            <p class="text-sm">{{ bookmark.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BookMark from "@/service/firestore/BookMark.js";
import { onMounted, computed, reactive } from "vue";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";

const { user } = useAuthenticationStore();

const bookMark = new BookMark();

const bookmarkState = reactive({
  bookMarks: [],
  loading: false,
  error: null,
});

const checkEmpty = computed(() => {
  return bookmarkState.bookMarks.length === 0;
});

onMounted(() => {
  bookMark.fetchBookMarks(user.uid);
});
</script>

<style lang=""></style>
@/service/firestore/BookMark.js
