<template lang="">
  <div>
    <div class="w-full grd h-44">
      <img
        loading="lazy"
        :src="userState.user.photoURL"
        alt=""
        class="object-contain w-full h-full"
      />
    </div>
    <div class="prose">
      <h2>{{ userState.user.displayName }}</h2>
      <p>{{ userState.user.bio }}</p>
    </div>
    <div class="divider divider-neutral">posts</div>

    <div class="grid gap-2 grid-cols-res">
      <CardPost v-for="post in postState.post" :key="post.id" :item="post" />
    </div>
  </div>
</template>
<script setup>
import User from "@/service/firestore/User.js";
import Post from "@/service/firestore/Post.js";
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import CardPost from "@/components/CardPost.vue";
const router = useRoute();
const user = new User();
const post = new Post();

const userState = reactive({
  user: [],
  loading: false,
  error: null,
});

const postState = reactive({
  post: [],
  loading: false,
  error: null,
});

const fetchUserPosts = async () => {
  const response = await post.getByUser(router.params.id);
  postState.post = response;
  console.log("🚀 ~ fetchUserPosts ~ postState.post:", postState.post);
};

const fetchUser = async () => {
  const response = await user.getUser(router.params.id);
  userState.user = response;
};
onMounted(() => {
  fetchUser();
  fetchUserPosts();
});


</script>
<style scoped>
.grd {
  background: rgb(0, 0, 0);
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.39539565826330536) 17%,
    rgba(255, 255, 255, 1) 97%
  );
}
</style>
