<template lang="">
  <!--   
    <div class="toast toast-top toast-end">
      <div class="alert alert-success">
        <button @click="postId = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <span>Message sent successfully.</span>
      </div>
    </div> -->

  <router-link class="btn" to="/main/profile/create">create post</router-link>
  <router-view name="CreatePost"></router-view>

</template>
<script setup></script>
<style lang=""></style>

<!-- 
<div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="card shadow-lg" v-for="item in 20" :key="item">
    <div class="card-body">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <div class="avatar">
            <div class="rounded-full w-14 h-14">
              <img src="https://i.pravatar.cc/500?img=32" alt="" />
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="text-gray-700 font-bold">John Doe</div>
          <div class="text-sm text-gray-600">
            5 minutes ago
          </div>

        </div>
        <div class="flex-shrink-0">
          <button class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
          expedita voluptas culpa sapiente alias molestiae. Numquam
          corrupti in laborum sed rerum et corporis.
        </p>
      </div>
    </div>
  </div>
</div> -->