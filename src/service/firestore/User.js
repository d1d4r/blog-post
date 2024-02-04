import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "@/firebase/index.js";
export default class User {
  constructor() {
    this.db = getFirestore(app);
  }

  createUser = async (data) => {
    try {
      const user = await addDoc(collection(this.db, "Users"), {
        data
      });
      return user.id;
    } catch (error) {
      console.log("🚀 ~ User ~ createUser ~ error", error);
      return error;
    }
  };
}
