import { defineStore } from "pinia";
import { ref } from "vue";
export const useAuthenticationStore = defineStore("authentication", () => {
  const isAuth = ref(false);
  const toggleAuth = () => {
    isAuth.value = !isAuth.value;
    console.log("🚀 ~ toggleAuth ~ isAuth:", isAuth.value);
  };
  return { isAuth, toggleAuth };
});
