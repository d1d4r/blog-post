<template lang="">
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col w-1/2 gap-5" v-if="state.loading">
      <BookMarkButton :data="state.postItem" :disabled="state.loading" />
      <div class="w-full h-4 skeleton"></div>
      <div class="w-full h-96 skeleton"></div>
      <div class="h-4 skeleton w-28"></div>
      <div class="w-full h-4 skeleton"></div>
      <div class="w-full h-4 skeleton"></div>
    </div>
    <div class="w-full sm:w-1/2" v-else>
      <BookMarkButton :data="state.postItem" />
      <MdPreview
        editorId="id"
        :modelValue="state.postItem.content"
        language="en-US"
      />
      <!-- <h1 class="p-5 text-center">{{ state.postItem.title }}</h1>
      <figure>
        <img
          class="object-cover w-full h-96"
          :src="state.postItem.imageUrl"
          alt=""
        />
        <figcaption>Photo by John Doe</figcaption>
      </figure>

      <p class="leading-loose tracking-wide hyphens-auto">
        {{ state.postItem.content }}
      </p> -->
    </div>
  </div>
</template>
<script setup>
//import { app } from "@/firebase/index.js";
import Post from "@/service/firestore/post.js";
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import BookMarkButton from "@/components/BookMarkButton.vue";
import { useBlogPostStore } from "@/stores/useBlogPostStore";
import { MdPreview, config } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import EN_US from "@/english.js";

config({
  editorConfig: {
    languageUserDefined: {
      "en-US": EN_US,
    },
  },
});
const route = useRoute();
// const stateBlogPost = useBlogPostStore();

// onMounted(() => {
//   stateBlogPost.getById(route.params.id);
// });

const post = new Post();

const state = reactive({
  postItem: [],
  headers: [],
  loading: false,
  error: null,
});

onMounted(async () => {
  state.loading = true;
  const postItem = await post.get(route.params.id);
  state.postItem = postItem;
  state.loading = false;
});
</script>
<style>
#id .md-editor-preview-wrapper {
  padding: 0;
}
</style>
//state.postItem // stateBlogPost.blogPostState.post
