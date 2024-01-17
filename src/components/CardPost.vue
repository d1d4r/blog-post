<template lang="">
  <div
    class="card w-72 bg-base-100 border-solid m-auto lg:m-0 border-[1px] border-sky-500 shadow-xl"
  >
    <div class="card-body">
      <figure>
        <img
          :src="props.blogPostItems.image"
          alt="Shoes"
          class="w-10 h-10 rounded-full border-2 border-white shadow-xl"
        />
      </figure>
      <router-link to="my-feed/1" class="hover:underline">
        <h2 class="card-title p-2">{{ props.blogPostItems.title }}</h2>
      </router-link>
      <h2 class="pl-2 text-sm">{{ props.blogPostItems.date }}</h2>
      <figure>
        <img :src="props.blogPostItems.image" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-actions justify-end p-3">
        <div
          class="badge badge-outline"
          :v-for="tag in props.blogPostItems[0].tags"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  blogPostItems: {
    type: Array,
    required: true,
  },
});
</script>
<style scoped>
figure {
  @apply justify-start p-2;
}
.card-body {
  @apply p-1;
}
</style>
