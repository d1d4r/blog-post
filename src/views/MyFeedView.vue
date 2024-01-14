<template lang="">
  <div
    class="flex flex-wrap justify-evenly gap-7 "
  >
    <CardPost v-for="item in 200" :key="item.id" />
  </div>
</template>
<script setup>
import CardPost from "@/components/CardPost.vue";

</script>
<style lang=""></style>
<!-- border-solid border-red-200 border-[1px] -->