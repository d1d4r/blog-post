import {  doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/firebase/index.js";
export default class User {
  constructor() {
    this.db = getFirestore(app);
  }

  createUser = async (data) => {
    try {
      await setDoc(doc(this.db, "Users", data.uid), data);
    } catch (error) {
      console.log("🚀 ~ User ~ createUser ~ error", error);
      return error;
    }
  };
}
