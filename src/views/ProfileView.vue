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

