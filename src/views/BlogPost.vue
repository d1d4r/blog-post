<template lang="">
  <div class="flex flex-col items-center justify-center mt-24">
    <div class="flex flex-col w-1/2 gap-5" v-if="state.loading">
      <div class="w-full h-4 skeleton"></div>
      <div class="w-full h-96 skeleton"></div>
      <div class="h-4 skeleton w-28"></div>
      <div class="w-full h-4 skeleton"></div>
      <div class="w-full h-4 skeleton"></div>
    </div>
    <div class="w-full p-5 sm:w-1/2" v-else>
      <BookMarkButton
        :data="state.postItem"
        :id="id"
        @bookmark-added="handleBookmarkAdded"
      />
      <MdPreview
        editorId="id"
        :modelValue="state.postItem.content"
        language="en-US"
      />
    </div>
  </div>
</template>
<script setup>

import Post from "@/service/firestore/Post";
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from "vue";
import BookMarkButton from "@/components/BookMarkButton.vue";
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
const router = useRouter();
const { id } = route.params;

const post = new Post();

const state = reactive({
  postItem: [],
  headers: [],
  loading: false,
  error: null,
});

const error = ref(null);
const handleBookmarkAdded = (event) => {
  if (event.err) {
    router.push({ name: "signIn" });
  }
  //error.value = event.err;
};

const fetchData = async () => {
  state.loading = true;
  const postItem = await post.get(id);
  state.postItem = postItem;
  state.loading = false;
};
fetchData();


</script>
<style>
#id .md-editor-preview-wrapper {
  padding: 0;
}
</style>
