<template lang="">
  <div
    class="w-full m-auto border border-solid shadow-xl card bg-base-100 lg:m-0 group"
  >
    <div class="card-body">
      <figure>
        <img
          :src="props.item.imageUrl"
          alt="Shoes"
          class="w-8 h-8 border-2 border-white rounded-full"
        />
      </figure>

      <router-link :to="`/main/blogpost/${props.item.id}`" class="">
        <h2
          class="p-2 card-title group-hover:underline"
        >
          {{ props.item.title }}
        </h2>
      </router-link>
      <h2 class="pl-2 text-sm">{{ props.item.date }}</h2>
      <figure>
        <img
          loading="lazy"
          :src="props.item.imageUrl"
          alt="Shoes"
          class="object-cover w-full m-auto select-none h-44 rounded-xl"
        />
      </figure>
      <div class="justify-end p-3 card-actions">
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
