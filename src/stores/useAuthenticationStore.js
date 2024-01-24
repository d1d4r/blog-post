import { defineStore } from "pinia";
import { ref } from "vue";
export const useAuthenticationStore = defineStore("authentication", () => {
  const isAuth = ref(false);
  const token = ref(null);
  const user = ref(null);

  const setAuth = (auth) => {
    isAuth.value = auth;
  };

  const setToken = (token) => {
    token.value = token;
  };

  const setUser = (user) => {
    user.value = user;
  };

  return {
    isAuth,
    token,
    user,
    setAuth,
    setToken,
    setUser,
  };
});
