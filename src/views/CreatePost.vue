<template lang="">
  <div class="text-sm breadcrumbs">
    <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li>Create Post</li>
    </ul>
  </div>
  <form>
    <label class="form-control">
      <div class="label">
        <span class="label-text">Your bio</span>
      </div>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
      />
    </label>
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Pick the category</span>
      </div>
      <select class="select select-bordered" >
        <option disabled selected>Pick one</option>
        <option>Star Wars</option>
        <option>Harry Potter</option>
        <option>Lord of the Rings</option>
        <option>Planet of the Apes</option>
        <option>Star Trek</option>
      </select>
    </label>

    <label class="form-control">
      <div class="label">
        <span class="label-text">Your bio</span>
      </div>
      <textarea
        class="textarea textarea-bordered h-24"
        placeholder="Bio"
      ></textarea>
    </label>

    <button type="submit" class="btn btn-primary mt-3">Submit</button>
  </form>
</template>
<script setup></script>
<style lang=""></style>
