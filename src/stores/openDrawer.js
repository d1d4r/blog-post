import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useDrawer = defineStore("drawer", () => {
  const drawerState = reactive({
    open: false,
  });

  const toggleDrawer = () => {
    drawerState.open = !drawerState.open;
  };

  return { toggleDrawer, drawerState };
});
