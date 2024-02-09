import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
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

  getUser = async (uid) => {
    const docRef = doc(this.db, "Users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  };

  getAllUsers = async () => {
    const users = [];
    const querySnapshot = await getDocs(collection(this.db, "Users"));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  };

  updateUser = async (uid, data) => {
    try {
      if (!uid) {
        throw new Error("User ID is required to update user");
      }
      await setDoc(doc(this.db, "Users", uid), data);
    } catch (error) {
      console.log("🚀 ~ User ~ updateUser ~ error", error);
      return error;
    }
  };
}
