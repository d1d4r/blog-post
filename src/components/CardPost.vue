<template lang="">
  <div
    class="m-auto border border-solid shadow-xl cursor-pointer w-72 card bg-base-100 lg:m-0 group"
    @click="goToPost(item.id)"
  >
    <div class="card-body">
      <div class="flex items-center">
        <figure>
          <img
            :src="item.photoURL"
            alt="Shoes"
            class="w-8 h-8 border-2 border-white rounded-full"
          />
        </figure>
        <span>{{ item.displayName }}</span>
      </div>

      <router-link :to="`/main/blogpost/${item.id}`" class="">
        <h2 class="pl-2 card-title group-hover:underline line-clamp-1">
          {{ item.title }}
        </h2>
      </router-link>
      <h2 class="pl-2 text-sm">{{ item.date }}</h2>
      <figure>
        <img
          loading="lazy"
          :src="item.imageUrl"
          alt="Shoes"
          class="object-cover w-full m-auto select-none h-44 rounded-xl"
        />
      </figure>
      <div class="justify-end p-3 card-actions">
        <div class="badge badge-outline" v-for="tag in item.tags" :key="tag">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
import { useRouter } from "vue-router";

const route = useRouter();
const goToPost = (id) => {
  route.push(`/main/blogpost/${id}`);
};
</script>
<style scoped>
figure {
  @apply justify-start p-2;
}
.card-body {
  @apply p-1;
}
</style>
