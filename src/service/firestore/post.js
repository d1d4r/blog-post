import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { app } from "@/firebase/index.js";
class Post {
  constructor() {
    this.db = getFirestore(app);
    //console.log("🚀 ~ Post ~ constructor ~ this.db :", this.db);
  }

  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(this.db, "Posts"));
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return posts;
    } catch (error) {
      console.log("🚀 ~ Post ~ getAll ~ error", error);
      return error
    }
  }

  async get(id) {
    const docRef = doc(this.db, "Posts", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return [];
    }
    // const post = await this.db.collection("Posts").doc(id).get();
    // return post.data();
  }

  async create(data) {
    const post = await addDoc(collection(this.db, "Posts"), data);
    return post.id;
  }

  async update(id, data) {
    await this.db.collection("Posts").doc(id).update(data);
  }

  async delete(id) {
    await this.db.collection("Posts").doc(id).delete();
  }
}

export default Post;
