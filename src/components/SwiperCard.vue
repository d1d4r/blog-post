<template lang="">
  <Swiper
    :loop="true"
    :slides-per-view="isLargeScreen ? 4 : 1"
    :slides-per-group="2"
    :space-between="50"
    :centered-slides="true"
    :navigation="true"
  >
    <slot></slot>
  </Swiper>
</template>
<script setup>
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
import { register } from "swiper/element/bundle";
import { Swiper } from "swiper/vue";
import { useMediaQuery } from "@vueuse/core";

register();

const isLargeScreen = useMediaQuery("(min-width: 1024px)");

// const onProgress = (e) => {
//   const [swiper, progress] = e.detail;
//   console.log(progress);
// };

// const onSlideChange = (e) => {
//   console.log("slide changed");
// };
</script>
<style>
.swiper {
  @apply w-[90%]  mb-5 mt-5;
}

.swiper-slide {
  @apply w-1/5;
}
</style>
