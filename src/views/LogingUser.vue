<template lang="">
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left prose">
        <h1>Loging</h1>
        <p>loag account be aware all new</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form @submit="signup" class="card-body">
          <!-- <div class="form-control">
            <label class="label">
              <span class="label-text">username</span>
            </label>
            <input
              type="text"
              placeholder="your name"
              class="input input-bordered"
              required
            />
          </div> -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="userData.email"
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
              v-model="userData.password"
              type="password"
              placeholder="password"
              class="input input-bordered"
              required
            />
          </div>
          <!-- <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              required
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label>
          </div> -->
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
//import { app } from "@/firebase/index.js";
import Authentication from "@/service/auth/authentication.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";

const { isAuth, setAuth } = useAuthenticationStore();
const router = useRouter();

const userData = reactive({
  email: "",
  password: "",
});

const authentication = new Authentication();

const signup = async (e) => {
  try {
    e.preventDefault();
    const user = await authentication.login(userData.email, userData.password);
    router.push("/main/my-feed");
    setAuth(true);
    console.log("🚀 ~ register ~ user:", user.accessToken);
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang=""></style>
