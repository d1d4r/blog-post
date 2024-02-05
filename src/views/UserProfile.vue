<template lang="">
  <div>this is user profile page</div>
</template>
<script setup>
import User from "@/service/firestore/User.js";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
const router = useRoute();
const user = new User();

const fetchUser = async () => {
  const response = await user.getUser(router.params.id);
  console.log(response);
};
onMounted(() => {
  fetchUser();
});
</script>
<style lang=""></style>
