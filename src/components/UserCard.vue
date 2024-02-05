<template lang="">
  <div class="card shadow-gl w-full bg-white border rounded-none">
    <div class="card-body flex-row gap-4 p-5">
      <div class="avatar m-auto">
        <div class="w-24 h-24 rounded-full">
          <img :src="item.photoURL" />
        </div>
      </div>
      <div class="card-title flex flex-col w-full justify-start items-start">
        <h2 class="">{{ item.displayName }}</h2>
        <p class="text-sm text-gray-600">
          {{ item.bio }}
        </p>
        <router-link
          :to="`users/${item.uid}`"
          class="btn btn-outline rounded-none"
          >view profile</router-link
        >
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
<style lang=""></style>
