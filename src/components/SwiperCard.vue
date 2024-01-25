<template lang="">
  <Swiper
    :slides-per-view="3"
    :space-between="spaceBetween"
    :centered-slides="true"
    class="bg-white w-[90%] h-[90%] p-10 m-10"
    :virtual="true"
    :navigation="true"
    :loop="true"
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
const spaceBetween = 10;
const onProgress = (e) => {
  const [swiper, progress] = e.detail;
  console.log(progress);
};

const onSlideChange = (e) => {
  console.log("slide changed");
};
</script>
<style></style>
