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
          <router-link to="/my-feed" class="w-2/5 btn"
            >strat reading & writing</router-link
          >
        </div>
      </div>
    </div>
  </div>

  <SwiperCard >
    <div class="flex justify-between pb-3">
      <h1 class="text-3xl font-bold text-center">Feeds</h1>
      <router-link to="/my-feed" class="text-xl underline">
        see more
      </router-link>
    </div>
    <swiper-slide :key="item.id" v-for="item in state.posts" >
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
import { reactive } from "vue";
import { getFirestore } from "firebase/firestore";
import { app } from "@/firebase";
import User from "@/service/firestore/User";

//register();
const db = getFirestore(app);
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
    const { postarr } = await post.paginatePosts(db, "Posts", 1, 4);

    const posts = [];
    for (let post = 0; post < postarr.length; post++) {
      //console.log(postarr[post].userId)
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
.swiper-slide{
  flex-shrink: inherit;
}
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
@/service/firestore/Post.js
<!-- // onMounted(async () => {
//   try {
//     state.loading = true;
//     const { postarr } = await post.paginatePosts(db, "Posts", 1, 4);
//     state.posts = postarr;
//     //console.log("🚀 ~ onMounted ~  state.posts:", state.posts);
//     state.loading = false;
//   } catch (error) {
//     console.log("🚀 ~ onMounted ~ error:", error);
//     state.error = error;
//   } finally {
//     state.loading = false;
//   }
// }); -->
