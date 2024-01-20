<template lang="">
  <!-- <div>{{$route.params.id}}</div> -->

  <div class="prose">
    <h1>{{ state.postItem.title }}</h1>
    <figure>
      <img :src="state.postItem.image" alt="" />
      <figcaption>Photo by John Doe</figcaption>
    </figure>
    <p>
      {{ state.postItem.content }}
    </p>
  </div>
</template>
<script setup>
import { app } from "@/firebase/index.js";
import Post from "@/service/firestore/post.js";
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
const route = useRoute();
const post = new Post(app);

const state = reactive({
  postItem: [],
  headers: [],
  loading: false,
  error: null,
});
post.get(route.params.id).then((res) => {
  console.log("🚀 ~ res:", res);
});

onMounted(async () => {
  const postItem = await post.get(route.params.id);
  state.postItem = postItem;
}),
  console.log("🚀 ~ route:", route.params.id);
</script>
<style lang=""></style>
