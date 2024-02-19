import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  limit,
  orderBy,
  startAt,
  endAt,
  startAfter,
} from "firebase/firestore";
import { app } from "@/firebase/index.js";
class Post {
  constructor() {
    this.db = getFirestore(app);
  }

  async getAll() {
    try {
      const posts = [];

      const postsRef = collection(this.db, "Posts");
      const first = query(postsRef, limit(3));
      const querySnapshot = await getDocs(first);

      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });

      return posts;
    } catch (error) {
      console.log("🚀 ~ Post ~ getAll ~ error", error);
      return error;
    }
  }

  async getPaginationOffcet({ currentPage, currentPageSize }) {
    try {
      const posts = [];
      const postsRef = collection(this.db, "Posts");
      const first = query(postsRef, limit(currentPageSize));
      const querySnapshot = await getDocs(first);
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      return posts;
    } catch (error) {
      console.log("🚀 ~ Post ~ getAll ~ error", error);
      return error;
    }
  }
  async loadDocuments(pageSize = 1) {
    let lastDocument = null;
    let documents = [];
    try {
      const quer = query(
        collection(this.db, "Posts"),
        orderBy("title"),
        limit(pageSize)
      );

      const snapshot = await getDocs(quer);

      if (snapshot.empty) {
        console.log("No documents found");
        return;
      }

      lastDocument = snapshot.docs[snapshot.docs.length - 1];
      console.log("🚀 ~ Post ~ loadDocuments ~ lastDocument:", lastDocument);

      documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log("documents", documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
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
  }

  async getByUser(userId) {
    const posts = [];
    const postsref = collection(this.db, "Posts");
    const q = where("userId", "==", userId);
    const querySnapshot = query(postsref, q);

    const filteredData = await getDocs(querySnapshot);
    filteredData.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    return posts;
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
