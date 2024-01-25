<template lang="">
  <div
    class="min-h-screen hero"
    style="
      background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);
    "
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="text-center hero-content text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
        <p class="mb-5">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <router-link to="/main/my-feed" class="w-2/5 btn"
          >strat reading & writing</router-link
        >
      </div>
    </div>
  </div>
  
  <div v-if="!state.loading">
    <SwiperCard>
      <swiper-slide :key="item.id" v-for="item in state.posts" >
        <CardPost :item="item" />
      </swiper-slide>
    </SwiperCard>
    <SwiperCard>
      <swiper-slide :key="item.id" v-for="item in state.posts">
        <CardPost :item="item" />
      </swiper-slide>
    </SwiperCard>
  </div>
  <div v-else>
    <div class="flex items-center justify-center">
      <div class="w-64 h-64 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader"></div>
    </div>
  </div>
</template>
<script setup>
import SwiperCard from "@/components/SwiperCard.vue";
import CardPost from "@/components/CardPost.vue";
import { SwiperSlide } from "swiper/vue";

import Post from "@/service/firestore/post.js";
import { reactive, onMounted } from "vue";

//register();

const post = new Post();

const state = reactive({
  posts: [],
  headers: [],
  loading: false,
  error: null,
});

onMounted(async () => {
  try {
    state.loading = true;
    state.posts = await post.getAll();
    //console.log("🚀 ~ onMounted ~  state.posts:", state.posts);
    state.loading = false;
  } catch (error) {
    console.log("🚀 ~ onMounted ~ error:", error);
    state.error = error;
  } finally {
    state.loading = false;
  }
});
</script>
<style >

</style>
<!-- <div class="flex flex-col items-center justify-center py-20">
    <div class="prose text-center">
      <h1>Hello there</h1>
      <p>
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
        id nisi.
      </p>
    </div>
  </div> -->
