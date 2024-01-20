import { getFirestore, collection, getDocs } from "firebase/firestore";

class Post {
  constructor(app) {
    this.db = getFirestore(app);
    //console.log("🚀 ~ Post ~ constructor ~ this.db :", this.db);
  }

  async getAll() {
    const querySnapshot = await getDocs(collection(this.db, "Posts"));
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
     
      ...doc.data(),
    }));
    //console.log("🚀 ~ Post ~ posts ~ doc.data():", querySnapshot.docs.data);

    return posts;
  }

  async get(id) {
    const post = await this.db.collection("Posts").doc(id).get();
    return post.data();
  }

  async create(data) {
    const post = await this.db.collection("Posts").add(data);
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
