<template lang="">
  <!-- You can open the modal using ID.showModal() method -->
  <!-- You can open the modal using ID.showModal() method -->

  <Teleport to="#modalPortal">
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="absolute border border-white btn btn-sm btn-circle btn-ghost right-2 top-2"
          >
            Esc
          </button>
        </form>
        <div class="prose">
          <h3 class="text-lg font-bold">log account to show bookmarks</h3>
          <router-link to="/register" class="btn"
            ><span>log account</span></router-link
          >
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </Teleport>
</template>
<script setup>
import { onMounted } from "vue";
const showModal = () => {
  const modal = document.getElementById("my_modal_3");
  modal.setAttribute("open", true);
};
onMounted(() => {
  showModal();
});
</script>
<style lang=""></style>
