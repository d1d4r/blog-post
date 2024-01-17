<template lang="">
  <div
    class="card w-72 bg-base-100 border-solid m-auto lg:m-0 border-[1px] border-sky-500 shadow-xl"
  >
    <div class="card-body">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          class="w-10 h-10 rounded-full border-2 border-white shadow-xl"
        />
      </figure>
      <h2 class="card-title p-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate,
        totam.
      </h2>
      <h2 class="pl-2 text-sm">2h ago</h2>
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-actions justify-end p-3">
        <div class="badge badge-outline">Fashion</div>
        <div class="badge badge-outline">Products</div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
figure {
  @apply justify-start p-2;
}
.card-body {
  @apply p-1;
}
</style>
