import { db } from "./index.js";

class post {
  constructor(app) {
    this.db = db;
  }

  async getAll() {
    const posts = await this.db.collection("Posts").get();
    return posts.docs.map((post) => post.data());
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
