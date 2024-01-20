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
        class="w-full max-w-xs input input-bordered"
      />
    </label>
    <label class="w-full max-w-xs form-control">
      <div class="label">
        <span class="label-text">Pick a file</span>
      </div>
      <input
        type="file"
        accept="image/png, image/jpeg"
        class="w-full max-w-xs file-input file-input-bordered"
      />
    </label>
    <label class="w-full max-w-xs form-control">
      <div class="label">
        <span class="label-text">Pick the category</span>
      </div>
      <select class="select select-bordered">
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
        class="h-24 textarea textarea-bordered"
        placeholder="Bio"
      ></textarea>
    </label>

    <button type="submit" class="mt-3 btn btn-primary">Submit</button>
  </form>
</template>
<script setup></script>
<style lang=""></style>
