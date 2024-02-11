<template lang="">
  <div class="prose">
    <h1>{{ state.postItem.title }}</h1>
    <figure>
      <img :src="state.postItem.imageUrl" alt="" />
      <figcaption>Photo by John Doe</figcaption>
    </figure>
    <p>
      {{ state.postItem.content }}
    </p>
  </div>
</template>
<script setup>
//import { app } from "@/firebase/index.js";
import Post from "@/service/firestore/post.js";
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
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
