import { defineStore } from "pinia";
import { ref } from "vue";

export const useDrawer = defineStore("drawer", () => {
  const isOpen = ref(false);
  const toggleDrawer = () => {
    isOpen.value = !isOpen.value;
    console.log("🚀 ~ toggleDrawer ~ toggleDrawer:", isOpen.value);
  };

  return { isOpen, toggleDrawer };
});
