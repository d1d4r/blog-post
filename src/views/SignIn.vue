<template lang="">
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse items-stretch">
      <div class="text-center w-full lg:text-left prose">
        <h1>SignIn</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum earum
          totam quidem minus enim nam? Omnis provident animi atque dolor.
        </p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form @submit.prevent="submit" class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model.trim="userData.email"
              type="email"
              placeholder="email"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              v-model.trim="userData.password"
              type="password"
              placeholder="password"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control mt-6">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="userData.loading"
            >
              signIn
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="toast toast-start" v-if="userData.error">
    <div class="alert alert-warning">
      <span>{{ userData.error }}</span>
      <span class="btn btn-ghost" @click="userData.error = null">X</span>
    </div>
  </div>
</template>
<script setup>
//TODO: add the signup method
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";

const { signIn } = useAuthenticationStore();
const router = useRouter();

const userData = reactive({
  email: "",
  password: "",
  loading: false,
  error: null,
});

const timeoutError = () => {
  setTimeout(() => {
    userData.error = null;
  }, 5000);
};
watch(() => userData.error, timeoutError);

const submit = async () => {
  try {
    userData.error = null;
    userData.loading = true;
    const user = await signIn(userData.email, userData.password);
    console.log("🚀 ~ submit ~ user:", user);
    router.push("/main/my-feed");
  } catch (error) {
    userData.error = error.message;
  } finally {
    userData.loading = false;
  }
};
</script>
<style lang=""></style>
