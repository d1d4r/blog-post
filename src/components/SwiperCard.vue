<template lang="">
  
    <Swiper
      :slides-per-view="5"
      :space-between="spaceBetween"
      :centered-slides="true"
      class="border-white border-[0.01px] w-[90%] m-10"
      :navigation="true"
      @swiperprogress="onProgress"
      @swiperslidechange="onSlideChange"
    >
       <router-link to="/main/my-feed" >see more</router-link>
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
<style></style>
