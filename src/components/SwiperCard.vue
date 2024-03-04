<template>
  <Swiper
    class="w-[90%] mb-5 mt-5"
    :slides-per-view="isLargeScreen ? 2 : 1"
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
</script>
<style></style>
