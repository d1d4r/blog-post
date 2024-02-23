<template>
  <UseOffsetPagination>
    <div class="inline-grid items-center grid-cols-2 gap-x-4 gap-y-2">
      <div opacity="50">total:</div>
      <div>{{ state.total }}</div>
      <div opacity="50">pageCount:</div>
      <div>{{ pageCount }}</div>
      <div opacity="50">currentPageSize:</div>
      <div>{{ currentPageSize }}</div>
      <div opacity="50">currentPage:</div>
      <div>{{ currentPage }}</div>
      <div opacity="50">isFirstPage:</div>
      <div>{{ isFirstPage }}</div>
      <div opacity="50">isLastPage:</div>
      <div>{{ isLastPage }}</div>
    </div>
    <div>
      <button :disabled="isFirstPage" @click="prev">prev</button>
      <button
        type="button"
        class="border border-black disabled:border-base-100 btn btn-md bg-base-100 disabled:bg-black disabled:text-base-100 disabled:cursor-not-allowed"
        v-for="item in pageCount"
        :key="item"
        :disabled="currentPage === item"
        @click="currentPage = item"
      >
        {{ item }}
      </button>
      <button :disabled="isLastPage" @click="next">next</button>
    </div>
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>title</td>
          <td>image</td>
        </tr>
      </thead>

      <tbody v-if="!state.loading">
        <tr v-for="d in state.posts" :key="d.id">
          <td class="p-3 border">{{ d.id }}</td>
          <td class="p-3 border">{{ d.title }}</td>
          <td class="w-8 p-3 border"><img :src="d.imageUrl" /></td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="p-3 border">loading...</td>
          <td class="p-3 border">loading...</td>
          <td class="w-8 p-3 border">
            <div class="rounded-full bg-base-300 size-5 ring"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </UseOffsetPagination>
</template>
<script setup>
import { useOffsetPagination } from "@vueuse/core";
import { reactive, computed } from "vue";
import { UseOffsetPagination } from "@vueuse/components";
import Post from "@/service/firestore/Post";
import { app } from "@/firebase";
import { getFirestore } from "firebase/firestore";

const post = new Post();
const db = getFirestore(app);

const state = reactive({
  posts: [],
  total: null,
  page: 1,
  pageSize: 1,
  lastDoc: null,
  loading: false,
});

const fetchPost = async ({ currentPage, currentPageSize }) => {
  try {
    state.loading = true;
    const { posts, total } = await post.paginatePosts(
      db,
      "Posts",
      currentPage,
      currentPageSize
    );

    state.total = total;
    state.posts = posts;
    //state.lastDoc = last;

    return posts;
  } catch (error) {
    console.log("🚀 ~ fetchPost ~ error:", error);
  } finally {
    state.loading = false;
  }
};

fetchPost({ currentPage: state.page, currentPageSize: state.pageSize });

const t = computed(() => {
  return state.total;
});

const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: t,
  page: state.page,
  pageSize: state.pageSize,
  onPageChange: fetchPost,
  onPageSizeChange: fetchPost,
});
</script>
<style lang=""></style>

<!-- // onMounted(() => { // fetchPost({ currentPage: state.page, currentPageSize:
state.pageSize }); // }); // const database = ref([]); // for (let i = 0; i <
100; i++) { // database.value.push({ // id: i, // title: `Title ${i}`, //
imageUrl: `https://picsum.photos/200/200?random=${i}`, // date: new
Date().toLocaleDateString(), // tags: ["tag1", "tag2"], // }); // } // const
data = ref([]); // const page = ref(3); // const pageSize = ref(25); // function
fetch(currentPage, currentPageSize) { // return new Promise((resolve) => { //
setTimeout(() => { // const start = (currentPage - 1) * currentPageSize; //
const end = start + currentPageSize; // resolve((data.value =
database.value.slice(start, end))); // }, 1000); // }); // } // function
fetchData({ currentPage, currentPageSize }) { // fetch(currentPage,
currentPageSize).then((responseData) => { // data.value = responseData; // });
// } // fetchData({ currentPage: page.value, currentPageSize: pageSize.value }) -->

<!-- // const lastFetch = async (currentPage, currentPageSize, lastDoc) => {
  //   const { posts, total, last } = await post.finalPagination(
  //     currentPage,
  //     currentPageSize,
  //     lastDoc
  //   );
  
  //   state.total = total;
  //   state.posts = posts;
  //   state.lastDoc = last;
  //   return posts;
  // };
  // lastFetch(state.page, state.pageSize, state.lastDoc); -->

<!-- // const loadDocuments = async ({lastDoc, currentPageSize}) => {
//   const { posts, lastDocument } = await post.loadDocuments(
//     lastDoc,
//     currentPageSize
//   );

//   //state.total = total;
//   state.posts = posts;
//   state.lastDoc = lastDocument;
//   return posts;
// }; -->
