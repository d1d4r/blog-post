<template lang="">
  
  <div class="flex-none gap-2">
    <div class="form-control">
      <input
        type="text"
        placeholder="Search"
        class="input input-bordered w-24 md:w-auto"
      />
    </div>
    <div class="dropdown dropdown-end" v-if="isAuth">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <ul
        tabindex="0"
        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
    <div class="dropdown dropdown-end" v-else>
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <ul
        tabindex="0"
        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li><router-link to="/loging">Loging</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { useAuthentication } from "@/stores/authenticationStore.js";

const { isAuth } = useAuthentication();
console.log("🚀 ~ isAuth:", isAuth);

import { onMounted, onActivated } from "vue";

onActivated(() => {
  console.log("🚀 ~ onCreated ~ onCreated");
});

onMounted(() => {
  console.log("🚀 ~ onMounted ~ onMounted");
});
</script>
<style lang=""></style>
