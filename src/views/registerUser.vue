<template lang="">
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left prose">
        <h1>regesiter now!</h1>
        <p>create your account now and start writing your own blog</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">username</span>
            </label>
            <input
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
              type="password"
              placeholder="password"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
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
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang=""></style>
