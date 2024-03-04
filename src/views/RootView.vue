<template lang="">
  <div
    class="min-h-screen hero"
    style="
      background-image: url(https://miro.medium.com/v2/resize:fit:2000/0*dgJcrlUAb1F2_-jJ);
    "
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="text-center border backdrop-blur-sm hero-content">
      <div class="max-w-md ">
        <div class="text-white ">
          <h1 class="text-white text-clamp font-Playfairdisplay ">Hello there</h1>
          <p class="font-Playfairdisplay">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <router-link to="/my-feed" class="w-2/5 btn"
            >strat reading & writing</router-link
          >
        </div>
      </div>
    </div>
  </div>

  <SwiperCard v-if="!state.loading">
    <div class="flex justify-between pb-3">
      <h1 class="text-3xl font-bold text-center">Feeds</h1>
      <router-link to="/my-feed" class="text-xl underline">
        see more
      </router-link>
    </div>

    <swiper-slide :key="item.id" v-for="item in state.posts">
      <CardPost :item="item" />
    </swiper-slide>
  </SwiperCard>

  <SwiperCard v-else>
    <div class="flex justify-between pb-3">
      <h1 class="text-3xl font-bold text-center">Feeds</h1>
      <router-link to="/my-feed" class="text-xl underline">
        see more
      </router-link>
    </div>
    <swiper-slide :key="item.id" v-for="item in 4">
      <SkeletonCardPost />
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
import Post from "@/service/firestore/Post.js";
import { reactive } from "vue";
import User from "@/service/firestore/User";
import SkeletonCardPost from "@/components/SkeletonCardPost.vue";

const post = new Post();
const user = new User();

const state = reactive({
  posts: [],
  headers: [],
  loading: false,
  error: null,
});

const fetchPost = async () => {
  try {
    state.loading = true;
    const { postarr } = await post.paginatePosts( "Posts", 1, 4);

    const posts = [];
    for (let post = 0; post < postarr.length; post++) {
      const { displayName, photoURL } = await user.getUser(
        postarr[post].userId
      );
      posts.push({
        displayName,
        photoURL,
        ...postarr[post],
      });
    }

    state.posts = posts;
    //state.lastDoc = last;

    return posts;
  } catch (error) {
    console.log("🚀 ~ fetchPost ~ error:", error);
  } finally {
    state.loading = false;
  }
};

fetchPost();
</script>
<style scoped>
.swiper {
  display: flex;
  flex-direction: column-reverse;
}
.swiper-slide {
  flex-shrink: inherit;
}
.swiper-button-prev {
  color: black;
}
</style>

