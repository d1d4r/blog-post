<template lang="">
  <button
    class="btn btn-square btn-outline"
    v-if="isSaved"
    @click="deleteBookMark"
  >
    <BookmarkSlashIcon class="size-10" />
  </button>
  <button class="btn btn-square btn-outline" @click="addBookMark" v-else>
    <BookmarkIcon class="size-10" />
  </button>
</template>
<script setup>
import BookMark from "@/service/firestore/BookMark";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/vue/16/solid";
import { ref } from "vue";
const emit = defineEmits(["bookmark-added"]);
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  id: {
    type: String,
  },
});
//console.log("🚀 ~ id:", props.id);

const { user } = useAuthenticationStore();
const bookmark = new BookMark();
const error = ref(null);

const isSaved = ref(false);
const addBookMark = async () => {
  try {
    await bookmark.addBookMark(user.uid, {
      data: props.data,
      id: props.id,
    });
  } catch (err) {
    //console.log("🚀  error:", err.message);
    //alert(error.message)
    //error.value = err;
    emit("bookmark-added", { err });
  }
};
const deleteBookMark = async () => {
  await bookmark.deleteBookMark(user.uid, props.id);
};
const fetchSavedData = async () => {
  const save = await bookmark.fetchBookMarkById(props.id, user.uid);
  isSaved.value = save;
};
fetchSavedData();
</script>
<style lang=""></style>
