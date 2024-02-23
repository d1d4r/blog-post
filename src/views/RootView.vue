<template lang="">
  <div
    class="min-h-screen hero"
    style="
      background-image: url(https://miro.medium.com/v2/resize:fit:2000/0*dgJcrlUAb1F2_-jJ);
    "
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="text-center backdrop-blur-sm hero-content text-neutral-content">
      <div class="max-w-md">
        <div class="prose text-white">
          <h1 class="text-white font-Playfairdisplay">Hello there</h1>
          <p class="font-Playfairdisplay">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <router-link to="/main/my-feed" class="w-2/5 btn"
            >strat reading & writing</router-link
          >
        </div>
      </div>
    </div>
  </div>

  <div class="">
    <div class="flex justify-between p-5">
      <h1 class="text-3xl font-bold text-center">My Feed</h1>
      <router-link to="/main/my-feed" class="text-xl underline"
        >see more</router-link
      >
    </div>
    <SwiperCard>
      <swiper-slide :key="item.id" v-for="item in state.posts">
        <CardPost :item="item" />
      </swiper-slide>
    </SwiperCard>
  </div>

  <SwiperCard>
    <swiper-slide :key="item.id" v-for="item in state.posts">
      <CardPost :item="item" />
    </swiper-slide>
  </SwiperCard>

  <!-- <div v-else>
    <LoadingOverlay />
  </div> -->
</template>
<script setup>
import SwiperCard from "@/components/SwiperCard.vue";
import CardPost from "@/components/CardPost.vue";
import { SwiperSlide } from "swiper/vue";

import Post from "@/service/firestore/post.js";
import { reactive, onMounted } from "vue";
import { getFirestore } from "firebase/firestore";
import { app } from "@/firebase";

//register();
const db = getFirestore(app);
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
    const { postarr } = await post.paginatePosts(db, "Posts", 1, 4);
    state.posts = postarr;
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
<style></style>
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
@/service/firestore/Post.js
