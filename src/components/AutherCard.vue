<template lang="">
  <div class="w-fit bg-white border rounded-none card shadow-gl">
    <div class="flex-row gap-4 p-5 card-body">
      <div class="m-auto avatar">
        <div class="w-24 h-24 rounded-full">
          <img :src="item.photoURL" />
        </div>
      </div>
      <div class="flex flex-col items-start justify-start w-full card-title">
        <h2 class="">{{ item.displayName }}</h2>
        <p class="text-sm text-gray-600">
          {{ item.bio }}
        </p>
        <router-link
          :to="`auhter/${item.uid}`"
          class="rounded-none btn btn-outline"
          >view profile</router-link
        >
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
</script>
<style lang=""></style>
