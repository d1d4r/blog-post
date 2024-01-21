<template lang="">
  <div class="text-sm breadcrumbs">
    <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li>Create Post</li>
    </ul>
  </div>
  <form @submit="handleFileSubmit">
    <label class="w-full max-w-xs space-x-1">
      <div class="label">
        <span class="label-text">Pick a file</span>
      </div>
      <input
        required
        type="file"
        accept="image/png, image/jpeg"
        class="w-full max-w-xs file-input file-input-bordered"
        @change="handleFileChange"
      />
      <button class="btn btn-primary">Upload</button>
    </label>
  </form>
  <form @submit="handleSubmit">
    <label class="w-full form-control max-w-xs">
      <div class="label">
        <span class="label-text">Title</span>
      </div>
      <input
        required
        type="text"
        placeholder="Type here"
        class="w-full max-w-xs input input-bordered"
        v-model="formData.title"
      />
    </label>

    <label class="w-full max-w-xs form-control">
      <div class="label">
        <span class="label-text">Pick the category</span>
      </div>
      <select
        class="select select-bordered"
        v-model="formData.tags"
        multiple
        required
      >
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
        <span class="label-text">Your Content</span>
      </div>
      <textarea
        required
        class="h-24 textarea textarea-bordered"
        placeholder="content..."
        v-model="formData.content"
      ></textarea>
    </label>

    <div class="space-x-2">
      <button type="submit" class="mt-3 btn btn-primary">Submit</button>
      <button type="reset" class="mt-3 btn btn-secondary">cancel</button>
    </div>
  </form>
</template>
<script setup>
import { reactive, ref } from "vue";
import { app } from "../firebase";
import Post from "@/service/firestore/post";
import UploadPostImage from "@/service/storage/uploadPostImage";
import { useRouter } from "vue-router";

const router = useRouter();
const post = new Post(app);
const uploadPostImage = new UploadPostImage(app);

const formData = reactive({
  title: "",
  tags: [],
  content: "",
});

const fileData = reactive({
  file: null,
});

const postId = ref(null);

const handleFileSubmit = async (e) => {
  e.preventDefault();
  const { progress, downloadURL } = await uploadPostImage.upload(fileData.file);
  console.log("🚀 ~ handleFileSubmit ~ downloadURL:", downloadURL);
  console.log("🚀 ~ handleFileSubmit ~ progress:", progress);
  console.log("🚀 ~ handleFileSubmit ~ fileData.file:", fileData.file);
};

const handleFileChange = (e) => {
  fileData.file = e.target.files[0];
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("🚀 ~ handleSubmit ~ formData.file:", formData);
  postId.value = post.create(formData);
  //router.push(`/profile/${postId.value}`);
};
</script>
<style lang=""></style>
