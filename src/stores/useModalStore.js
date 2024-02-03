import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false);

  const openModal = () => {
    const modal = document.getElementById("my_modal_3");
    modal.setAttribute("open", true);
  };

  return {
    isOpen,
    openModal,
  };
});
