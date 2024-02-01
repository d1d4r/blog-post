import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/index.js";

class Authentication {
  constructor() {
    this.auth = auth;
    //console.log("🚀 ~ Authentication ~ constructor ~ this.auth:", this.auth._errorFactory);
  }
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.log("🚀 ~ Authentication ~ signup ~ error:", error);
      throw error;
    }
  }
  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  monitorSateChange = () => {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("🚀 ~ Authentication ~ user", user);
        return true;
      } else {
        console.log("🚀 ~ Authentication ~ user", user);
        return false;
      }
    });
  };

  async getCurrentUser() {
    try {
      const user = this.auth.currentUser;
      if (user !== null) {
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;

        return {
          email,
          photoURL,
          emailVerified,
          uid,
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAuth() {
    return this.auth;
  }

  signOut() {
    this.auth.signOut();
  }
}

export default Authentication;
