import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/index.js";

export const useAuthenticationStore = defineStore("authentication", () => {
  const user = reactive({
    uid: null,
    accessToken: null,
  });

  const isAuthenticated = computed(() => {
    return !!user.accessToken;
  });

  const setUser = (newUser) => {
    user.uid = newUser.uid;
    user.accessToken = newUser.accessToken;
    localStorage.setItem("accessToken", newUser.accessToken);
    localStorage.setItem("uid",newUser.uid);
  };

  const tryLoadingUser = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("🚀 ~ tryLoadingUser ~ accessToken:", accessToken)
    const uid = localStorage.getItem("uid");
    if (accessToken && uid) {
      setUser({ accessToken, uid });
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(userCredential.user);

      //return userCredential.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
    //setUser(newUser);
  };

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredential;
    } catch (error) {
      console.log("🚀 ~ Authentication ~ signup ~ error:", error);
      throw error;
    }
    //setUser(newUser);
  };

  const signOut = async () => {
    await auth.signOut();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("uid");
    user.uid = null;
    user.accessToken = null;
    

    //setUser({ uid: null, accessToken: null });
  };

  const getCurrentUser = async () => {
    try {
      const user = auth.currentUser;
      console.log("🚀 ~ getCurrentUser ~ user:", user);
      if (user !== null) {
        //isLogged.value = true;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;
        const accessToken = user.accessToken;

        //console.log("🚀 ~ Authentication ~ getCurrentUser ~ user", user);
        return {
          email,
          photoURL,
          emailVerified,
          accessToken,
          uid,
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const monitorSateChange = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("🚀 ~ Authentication ~ user", user);
        return true;
      } else {
        console.log("🚀 ~ Authentication ~ user", user);
        return false;
      }
    });
  };

  return {
    user,
    isAuthenticated,
    tryLoadingUser,
    setUser,
    signIn,
    signup,
    signOut,
    getCurrentUser,
    monitorSateChange,
  };
});
