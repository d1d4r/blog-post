<template lang="">
  <div class="min-h-screen hero bg-base-200">
    <div class="flex-col items-stretch hero-content lg:flex-row-reverse">
      <div class="prose text-center lg:text-left">
        <h1>regesiter now!</h1>
        <p>create your account now and start writing your own blog</p>
      </div>
      <div class="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
        <form @submit.prevent="submit" class="card-body">
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
              <span class="label-text">full name</span>
            </label>
            <input
              v-model="userData.displayname"
              type="text"
              placeholder="your name"
              class="input input-bordered"
              required
            />
          </div>
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
            <label class="label">
              <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
            </label>
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
          <div class="mt-6 form-control">
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
//TODO: add fix signup
import { reactive, ref } from "vue";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";
import { useRouter } from "vue-router";

const { signup } = useAuthenticationStore();
const errorMessage = ref(null);

const router = useRouter();

const userData = reactive({
  displayname: "",
  email: "",
  password: "",
});

const submit = async () => {
  errorMessage.value = null;
  try {
    await signup(userData.email, userData.password, userData.displayname);
    router.push("/main/my-feed");
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage.value = "Email already in use";
        break;
      case "auth/invalid-email":
        errorMessage.value = "Invalid email";
        break;
      case "auth/weak-password":
        errorMessage.value = "Weak password";
        break;
      default:
        errorMessage.value = `${error.message}`;
        break;
      case "auth/too-many-requests":
        errorMessage.value = "Too many requests";
        break;
    }
    //errorMessage.value = `${error.message}`;
  }

  userData.password = "";
};
</script>
<style scoped></style>
