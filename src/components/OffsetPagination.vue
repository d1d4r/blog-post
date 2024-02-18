<script setup>
import { ref } from "vue";
import { useOffsetPagination } from "@vueuse/core";

const database = ref([]);

for (let i = 0; i < 80; i++) database.value.push({ id: i, name: `user ${i}` });

function fetch(page, pageSize) {
  return new Promise((resolve) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setTimeout(() => {
      resolve(database.value.slice(start, end));
    }, 100);
  });
}

const data = ref([]);

const page = ref(1);
const pageSize = ref(10);

fetchData({
  currentPage: page.value,
  currentPageSize: pageSize.value,
});

function fetchData({ currentPage, currentPageSize }) {
  fetch(currentPage, currentPageSize).then((responseData) => {
    data.value = responseData;
  });
}

const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: database.value.length,
  page: 1,
  pageSize,
  onPageChange: fetchData,
  onPageSizeChange: fetchData,
});
</script>

<template>
  <!-- <div class="inline-grid items-center grid-cols-2 gap-x-4 gap-y-2">
    <div opacity="50">total:</div>
    <div>{{ database.length }}</div>
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
  </div> -->
  <div class="my-4 join">
    <button
      :disabled="isFirstPage"
      @click="prev"
      class="join-item btn btn-outline"
    >
      prev
    </button>
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
    <button
      :disabled="isLastPage"
      @click="next"
      class="join-item btn btn-outline"
    >
      next
    </button>
  </div>

  <!-- <table>
    <thead>
      <tr>
        <td>id</td>
        <td>name</td>
      </tr>
    </thead>
    <tr v-for="d in data" :key="d.id">
      <td>{{ d.id }}</td>
      <td>{{ d.name }}</td>
    </tr>
  </table> -->
</template>

<style scoped>

</style>
