<template lang="">
  <div
    v-if="checkEmpty"
    class="flex items-center justify-center h-full text-5xl"
  >
    nothing here
  </div>
  <div v-else>
    <div class="flex flex-wrap justify-center">
      <CardPost
        v-for="item in bookmarkState.bookMarks"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>
<script setup>
import BookMark from "@/service/firestore/BookMark.js";
import { onMounted, computed, reactive } from "vue";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";
import CardPost from "@/components/CardPost.vue";

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

onMounted(async() => {
  const d = await bookMark.fetchBookMarks(user.uid);
  console.log("🚀 ~ onMounted ~ d:", d)
  bookmarkState.bookMarks = d;
});
</script>

<style lang=""></style>
@/service/firestore/BookMark.js
