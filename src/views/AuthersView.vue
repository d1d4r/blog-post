<template lang="">
  <div class="grid gap-5 grid-cols-res2">
    <AutherCard v-for="user in usersState.users" :key="user.uid" :item="user" />
  </div>
</template>
<script setup>
import User from "@/service/firestore/User.js";
import AutherCard from "@/components/AutherCard.vue";
import { reactive, onMounted } from "vue";
const users = new User();

const usersState = reactive({
  users: [],
  loading: false,
  error: null,
});

const fetchUsers = async () => {
  const response = await users.getAllUsers();
  usersState.users = response;
};

onMounted(() => {
  fetchUsers();
});
</script>
<style lang=""></style>
