import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import Authentication from "@/service/auth/authentication";
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

  const isLogged = computed(() => {
    if (user.uid !== null) {
      return true;
    } else {
      return false;
    }
  });

  const setUser = (newUser) => {
    user.uid = newUser.uid;
    user.accessToken = newUser.accessToken;
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
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

  const signOut = () => {
    auth.signOut();
    //setUser({ uid: null, accessToken: null });
  };

  const getCurrentUser = async () => {
    try {
      const user = auth.currentUser;
      if (user !== null) {
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
    isLogged,
    setUser,
    signIn,
    signup,
    signOut,
    getCurrentUser,
    monitorSateChange,
  };
});
