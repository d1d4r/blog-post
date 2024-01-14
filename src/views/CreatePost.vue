<template lang="">
  <div class="text-sm breadcrumbs">
    <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li>Create Post</li>
    </ul>
  </div>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input type="text" class="form-control" id="title" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">Content</label>
      <textarea class="form-control" id="content" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>
<script setup></script>
<style lang=""></style>
