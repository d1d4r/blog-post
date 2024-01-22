import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

class AuthenticationService {
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
      const userCredential = await this.auth.createUserWithEmailAndPassword(
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
  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.log(error);
      throw error;
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

export default AuthenticationService;
