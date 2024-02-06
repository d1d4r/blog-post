<template lang="">
  <div>
    <form>
      <label class="w-full max-w-xs form-control">
        <div class="label">
          <span class="label-text">Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="w-full max-w-xs input input-bordered"
        />
      </label>
      <label class="max-w-xs form-control">
        <div class="label">
          <span class="label-text">Email</span>
        </div>
        <input
          type="email"
          placeholder="you@example.com"
          class="w-full input input-bordered"
        />
      </label>
      <label class="form-control">
        <div class="label">
          <span class="label-text">Your bio</span>
        </div>
        <textarea
          class="h-24 textarea textarea-bordered"
          placeholder="Bio"
        ></textarea>
      </label>
    </form>
  </div>
</template>
<script setup></script>
<style lang=""></style>

<!-- 
<div  class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <div class="shadow-lg card" v-for="item in 20" :key="item">
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
          <div class="font-bold text-gray-700">John Doe</div>
          <div class="text-sm text-gray-600">
            5 minutes ago
          </div>

        </div>
        <div class="flex-shrink-0">
          <button class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 stroke-current"
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
