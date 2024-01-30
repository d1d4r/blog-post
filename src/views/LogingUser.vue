<template lang="">
  <div class="hero min-h-screen bg-base-200 ">
    <div class="hero-content flex-col lg:flex-row-reverse  items-stretch">
      <div class="text-center w-full lg:text-left prose ">
        <h1>Loging</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum earum
          totam quidem minus enim nam? Omnis provident animi atque dolor.
        </p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
        <form @submit="signup" class="card-body">
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
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="toast toast-start" v-if="userData.error">
    <div class="alert alert-warning">
      <span>{{ userData.error }}</span>
    </div>
  </div>
</template>
<script setup>
//import { app } from "@/firebase/index.js";
import Authentication from "@/service/auth/authentication.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";
import { auth } from "@/firebase";

const { isAuth, setAuth } = useAuthenticationStore();
const router = useRouter();

const userData = reactive({
  email: "",
  password: "",
  loading: false,
  error: null,
});

const authentication = new Authentication();

const signup = async (e) => {
  userData.error = null;
  try {
    userData.loading = true;
    e.preventDefault();
    const user = await authentication.login(userData.email, userData.password);
    router.push("/main/my-feed");
    authentication.monitorSateChange();
    setAuth(true);
    console.log("🚀 ~ register ~ user:", user.accessToken);
  } catch (error) {
    userData.error = error.message;
  } finally {
    userData.loading = false;
  }
};
</script>
<style lang=""></style>
