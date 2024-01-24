<template lang="">
  <!-- You can open the modal using ID.showModal() method -->
  <!-- You can open the modal using ID.showModal() method -->
  <button class="btn" @click="showModal()">open modal</button>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-white"
        >
          Esc
        </button>
      </form>
      <div class="prose">
        <h3 class="font-bold text-lg">log account to show bookmarks</h3>
        <router-link to="/register" class="btn"><span>log account</span></router-link>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
<script setup>
const showModal = () => {
  const modal = document.getElementById("my_modal_3");
  modal.setAttribute("open", true);
};
</script>
<style lang=""></style>
