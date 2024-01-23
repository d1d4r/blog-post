import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

class Authentication {
  constructor(app) {
    this.auth = getAuth(app);
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
      console.log("🚀 ~ Authentication ~ signup ~ error:", error)
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

  async getCurrentUser() {
    try {
      const user = this.auth.currentUser;
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAuth() {
    return this.auth;
  }
}

export default Authentication;
