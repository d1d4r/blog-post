<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li>Create Post</li>
    </ul>
  </div>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold">Create Post</h1>
    <form @submit="handleSubmit">
      <label class="w-full max-w-xs form-control">
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
          <span class="label-text">Pick the tags</span>
        </div>
        <select
          class="select select-bordered"
          v-model="formData.tags"
          multiple
          required
        >
          <option v-for="category in categories" :key="category">
            {{ category }}
          </option>
        </select>
      </label>
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
        <div class="label">
          <span class="label-text"
            >{{
              fileData.progress ? `${fileData.progress} % image uploaded` : ""
            }}
          </span>
        </div>
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
        <button type="reset" class="mt-3 btn btn-secondary">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
//import { app } from "../firebase";
import Post from "@/service/firestore/post";
import UploadPostImage from "@/service/storage/uploadPostImage";
import { useRouter } from "vue-router";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";

const { user } = useAuthenticationStore();

const router = useRouter();
const post = new Post();
const uploadPostImage = new UploadPostImage();

const categories = [
  "web development",
  "frontend development",
  "js",
  "vuejs",
  "firebase",
];

const formData = reactive({
  title: "",
  imageUrl: "",
  tags: [],
  content: "",
  userId: user.uid,
});

const fileData = reactive({
  file: null,
  progress: 0,
});

const handleFileChange = async (e) => {
  fileData.file = e.target.files[0];
  const { progress, downloadURL } = await uploadPostImage.upload(fileData.file);
  fileData.progress = progress;
  formData.imageUrl = downloadURL;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const postId = await post.create(formData);
  router.push(`/my-feed/blogpost/${postId}`);
};
</script>

<style></style>
@/service/firestore/Post
