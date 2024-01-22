<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li>Create Post</li>
    </ul>
  </div>
  <!-- <form @submit="handleFileSubmit">
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
  </form> -->
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
</template>

<script setup>
import { reactive } from "vue";
import { app } from "../firebase";
import Post from "@/service/firestore/post";
import UploadPostImage from "@/service/storage/uploadPostImage";
import { useRouter } from "vue-router";

const router = useRouter();
const post = new Post(app);
const uploadPostImage = new UploadPostImage(app);

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
});

const fileData = reactive({
  file: null,
  progress: 0,
});

const handleFileSubmit = async (e) => {
  e.preventDefault();
  const { downloadURL } = await uploadPostImage.upload(fileData.file);
  formData.imageUrl = downloadURL;
};

const handleFileChange = async (e) => {
  fileData.file = e.target.files[0];
  const { progress, downloadURL } = await uploadPostImage.upload(fileData.file);
  fileData.progress = progress;
  formData.imageUrl = downloadURL;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData);
  //const postId = await post.create(formData);
  //router.push(`/my-feed/blogpost/${postId}`);
};
</script>

<style></style>
