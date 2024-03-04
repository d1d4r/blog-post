import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import User from "@/service/firestore/User.js";
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
    localStorage.setItem("uid", newUser.uid);
  };

  const tryLoadingUser = () => {
    const accessToken = localStorage.getItem("accessToken");
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

  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, { displayName: displayName }).catch(
        (err) => console.log(err)
      );

      const newUser = new User();
      await newUser.createUser({
        displayName,
        uid: userCredential.user.uid,
        bio: null,
        photoURL: null,
      });

      setUser(userCredential.user);

      //return userCredential;
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
        const displayName = user.displayName;
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
          displayName,
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const currentUser = () => {
    const user = auth.currentUser;

    if (user) {
      return user;
    } else {
      return null;
    }
  };

  const getUserInfo = async (uid) => {
    try {
      if (!uid) {
        throw new Error("User ID is required to get user info");
      }
      const user = new User();
      const userInfo = await user.getUser(uid);
      const currentUser = auth.currentUser;
      return {
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        emailVerified: currentUser.emailVerified,
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        ...userInfo,
      };
    } catch (error) {
      console.log("🚀 ~ Authentication ~ getUserInfo ~ error", error);
      throw error;
    }
  };

  const updateProfileInfo = async (displayName, photoURL, email, bio) => {
    try {
      const user = new User();
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
        email,
      });
      await user.updateUser(user.uid, { displayName, photoURL, bio });
    } catch (error) {
      console.log("🚀 ~ Authentication ~ updatePprofile ~ error", error);
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
    getUserInfo,
    setUser,
    signIn,
    signup,
    signOut,
    currentUser,
    getCurrentUser,
    monitorSateChange,
  };
});
