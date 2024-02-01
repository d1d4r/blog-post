import { defineStore } from "pinia";
import { ref } from "vue";
import Authentication from "@/service/auth/authentication";

const authentication = new Authentication();
export const useAuthenticationStore = defineStore("authentication", () => {
  const user = ref(null);

  const setUser = (newUser) => {
    user.value = newUser;
  };

  const loagin = async (email, password) => {
    const newUser = await authentication.login(email, password);
    console.log("🚀 ~ loagin ~ newUser:", newUser)
    setUser(true);
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (email, password) => {
    const newUser = authentication.signup(email, password);
    setUser(newUser);
  };

  const getCurrentUser = () => {
    const newUser = authentication.getCurrentUser();
    setUser(newUser);
  };

  const monitorSateChange = () => {
    authentication.monitorSateChange();
  };

  return {
    user,
    setUser,
    loagin,
    logout,
    signup,
    getCurrentUser,
    monitorSateChange,
  };
});
