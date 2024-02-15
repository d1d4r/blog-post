<template lang="">
  <div >
   
    <div class="dropdown dropdown-end" v-if="isAuthenticated">
      <div tabindex="0" role="button" class="ring btn btn-ghost btn-circle">
        <div class="avatar">
          <div class="rounded-full">
            <img src="../assets/img/no-profile-picture-icon.webp" />
          </div>
        </div>
      </div>
      <ul
        tabindex="0"
        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <!-- <li>
          <span class="btn" @click="getCurrentUser">show user</span>
        </li> -->
        <li><router-link to="/main/profile">profile</router-link></li>
        <li @click="handleSignOut" class="btn btn-ghost">sign out</li>
      </ul>
    </div>
    <div class="dropdown dropdown-end" v-else>
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost btn-circle bg-base-300"
      >
        <div class="rounded-full">U</div>
      </div>
      <ul
        tabindex="0"
        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li><router-link to="/signIn">signIn</router-link></li>
        <li><router-link to="/signup">signup</router-link></li>
        <li @click="getCurrentUser()" class="btn">current user</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";
import { useRouter } from "vue-router";
import { computed } from "vue";
//const { getCurrentUser, signOut, isAuthenticated } = useAuthenticationStore();
const authStore = useAuthenticationStore();

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});

const router = useRouter();

const handleSignOut = () => {
  authStore.signOut();
  router.push("/");
};
</script>
<style lang=""></style>
