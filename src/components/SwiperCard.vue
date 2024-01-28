<template lang="">
  <Swiper
    :loop="true"
    :slides-per-view="4"
    :space-between="spaceBetween"
    :centered-slides="true"
    :navigation="true"
    @swiperprogress="onProgress"
    @swiperslidechange="onSlideChange"
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
import { Swiper, SwiperSlide } from "swiper/vue";

register();
const spaceBetween = 50;
const onProgress = (e) => {
  const [swiper, progress] = e.detail;
  console.log(progress);
};

const onSlideChange = (e) => {
  console.log("slide changed");
};
</script>
<style>
.swiper {
  @apply w-[90%]  mb-5 mt-5;
}

.swiper-slide {
  @apply w-1/5;
}
</style>
