<template lang="">
  <div class="grid min-h-screen grid-cols-1 grid-rows-1 mt-24 sm:grid-cols-3">
    <div class="h-full">
      <div class="text-center">
        <img
          :src="userInfoSatate.userInfo?.photoURL"
          alt=""
          class="object-cover w-32 h-32 m-auto rounded-full"
        />
        <div class="prose">
          <h3>{{ userInfoSatate.userInfo?.displayName }}</h3>
          <h4>{{ userInfoSatate.userInfo?.email }}</h4>
          <p>{{ userInfoSatate.userInfo?.bio }}</p>
        </div>
      </div>
    </div>
    <div class="col-span-2">
      <form>
        <label class="w-full max-w-xs form-control">
          <div class="label">
            <span class="label-text">Change Profile Photo</span>
          </div>
          <input
            type="file"
            class="w-full max-w-xs file-input file-input-bordered"
          />
        </label>
        <label class="w-full max-w-xs form-control">
          <div class="label">
            <span class="label-text">Name</span>
          </div>
          <input
            :defaultValue="userInfoSatate.userInfo?.displayName"
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
            :defaultValue="userInfoSatate.userInfo?.email"
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
            :defaultValue="userInfoSatate.userInfo?.bio"
            class="h-24 textarea textarea-bordered"
            placeholder="Bio"
          ></textarea>
        </label>
        <div class="">
          <button class="mt-2 btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";
import { onMounted, reactive } from "vue";
const { getUserInfo, user } = useAuthenticationStore();

const userInfoSatate = reactive({
  userInfo: null,
  loading: false,
  error: null,
});

const fetch = async () => {
  const userInfo = await getUserInfo(user.uid);
  userInfoSatate.userInfo = userInfo;
};


onMounted(() => {
  fetch();
});
</script>
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
