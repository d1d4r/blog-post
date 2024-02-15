<template lang="">
  <div class="flex flex-col items-center justify-center">
    <div class="prose">
      <BookMarkButton />
      <h1 class="text-center">{{ state.postItem.title }}</h1>
      <figure>
        <img :src="state.postItem.imageUrl" alt="" />
        <!-- <figcaption>Photo by John Doe</figcaption> -->
      </figure>
      <p class="leading-loose tracking-wide hyphens-auto">
        {{ state.postItem.content }}
      </p>
    </div>
  </div>
</template>
<script setup>
//import { app } from "@/firebase/index.js";
import Post from "@/service/firestore/post.js";
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import BookMarkButton from "@/components/BookMarkButton.vue";
const route = useRoute();
const post = new Post();

const state = reactive({
  postItem: [],
  headers: [],
  loading: false,
  error: null,
});

onMounted(async () => {
  const postItem = await post.get(route.params.id);
  state.postItem = postItem;
});
</script>
<style lang=""></style>
@/service/firestore/Post.js
