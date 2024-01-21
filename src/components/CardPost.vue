<template lang="">
  <div
    class="card w-72 bg-base-100 border-solid m-auto lg:m-0 border-[1px] border-sky-500 shadow-xl"
  >
    <div class="card-body">
      <figure>
        <img
          :src="props.item.imageUrl"
          alt="Shoes"
          class="w-10 h-10 rounded-full border-2 border-white shadow-xl"
        />
      </figure>

      <router-link
        :to="`/my-feed/blogpost/${props.item.id}`"
        class="hover:underline"
      >
        <h2 class="card-title p-2">{{ props.item.title }}</h2>
      </router-link>
      <h2 class="pl-2 text-sm">{{ props.item.date }}</h2>
      <figure>
        <img
          loading="lazy"
          :src="props.item.imageUrl"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-actions justify-end p-3">
        <div
          class="badge badge-outline"
          v-for="tag in props.item.tags"
          :key="tag"
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
  item: {
    type: Object,
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
