<template>
  <div class="text-sm breadcrumbs">
    <!-- <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li>Create Post</li>
    </ul> -->
  </div>
  <div class="flex flex-col items-center justify-center">
    <h1 class="mb-5 text-2xl font-bold">Create Post</h1>
    <md-editor
      language="en-US"
      v-model="markdown.content"
      
      @onUploadImg="onUploadImg"
      @onSave="onSave"
      class="min-h-screen"
    />
    <!-- <form @submit="handleSubmit">
      <label class="w-full max-w-xs form-control" for="title">
        <div class="label">
          <span class="label-text">Title</span>
        </div>
        <input
          name="title"
          id="title"
          required
          type="text"
          placeholder="Type here"
          class="w-full max-w-xs input input-bordered"
          v-model="formData.title"
        />
      </label>
      <label class="w-full max-w-xs form-control" for="tags">
        <div class="label">
          <span class="label-text">Pick the tags</span>
        </div>
        <select
          name="tags"
          id="tags"
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
      <label class="w-full max-w-xs space-x-1" for="file">
        <div class="label">
          <span class="label-text">Pick a file</span>
        </div>
        <input
          name="file"
          id="file"
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
      <label class="form-control" for="content">
        <div class="label">
          <span class="label-text">Your Content</span>
        </div>
        <textarea
          name="content"
          id="content"
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
    </form> -->
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Post from "@/service/firestore/Post";
import UploadPostImage from "@/service/storage/uploadPostImage";
import { useRouter } from "vue-router";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore.js";
import { MdEditor, config } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import "md-editor-v3/lib/preview.css";
import EN_US from "@/english.js";
import { Timestamp } from "firebase/firestore";

config({
  editorConfig: {
    languageUserDefined: {
      "en-US": EN_US,
    },
  },
});

const { user } = useAuthenticationStore();

const router = useRouter();
const post = new Post();
const uploadPostImage = new UploadPostImage();

const markdown = reactive({
  content: "",
  userId: user.uid,
  createAt : new Date()
});

const onChange = () => {
  console.log(markdown.content);
};

const onUploadImg = async (file) => {
  const [type] = file;

  const { progress, downloadURL } = await uploadPostImage.upload(type);
  // file: file[0],
  //   path: `post/${user.uid}/${name}`,
  fileData.progress = progress;
  formData.imageUrl = downloadURL;
  markdown.content += `![${file[0].name}](${downloadURL})`;
};

const onSave = async () => {
  console.log(markdown.content);
  //e.preventDefault();
  const postId = await post.create(markdown);
  router.push(`/main/blogpost/${postId}`);
};

///////////////////////////////////////
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
  console.log(fileData.file);
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
