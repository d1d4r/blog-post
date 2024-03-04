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

  getCountFromServer,
} from "firebase/firestore";
import { app } from "@/firebase/index.js";
class Post {
  constructor() {
    this.db = getFirestore(app);
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

  /////////////////////////////////////

  async paginatePosts(
    collectionPath,
    currentPage,
    currentPageSize,
    userId = null,
    orderByField = "content"
  ) {
    try {
      // Validate currentPage and currentPageSize
      if (currentPage < 1 || currentPageSize < 1) {
        throw new Error(
          "Invalid currentPage or currentPageSize. Both must be positive integers."
        );
      }

      // Calculate startAt document based on currentPage and pageSize
      const startAtDoc =
        currentPage === 1
          ? null
          : await this.getNthDocBasedOnField(
              collectionPath,
              currentPage * currentPageSize - 1,
              orderByField
            );

      const postsRef = collection(this.db, collectionPath);
      //const includeWhereClause = false
      const q = query(
        postsRef,
        userId ? where("userId", "==", userId) : null,
        orderBy(orderByField),
        startAt(startAtDoc),

        limit(currentPageSize)
      );

      const snapshot = await getDocs(q);

      // Handle no documents found gracefully
      if (snapshot.empty) {
        return { posts: [], total: 0, last: null };
      }

      // Extract and format data, calculate nextPageToken
      const posts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const postarr = [];
      snapshot.docs.forEach((doc) => {
        const inputString = doc.data().content;
        const hashTextMatch = inputString.match(/#(.+?)\n/);
        const hashText = hashTextMatch ? hashTextMatch[1].trim() : "";
        //console.log("🚀 ~ Post ~ snapshot.docs.forEach ~ hashText:", hashText);

        // Extract text after ! symbol
        const exclamationTextMatch = inputString.match(/!\[.+?\]\((.+?)\)/);
        const exclamationText = exclamationTextMatch
          ? exclamationTextMatch[1].trim()
          : "";

        postarr.push({
          title: hashText ? hashText : "default",
          imageUrl: exclamationText
            ? exclamationText
            : "https://www.invoicera.com/wp-content/uploads/2023/11/default-image.jpg",
          id: doc.id,
          userId: doc.data().userId,
        });
      });
      //const total = await this.getTotalCount(db, collectionPath);
      const total = (await getCountFromServer(postsRef)).data().count;
      const last = snapshot.docs[snapshot.docs.length - 1].id;
      //const nextPageToken = currentPage * currentPageSize < total ? last : null;

      return { posts, postarr, total, last };
    } catch (error) {
      console.error("Error paginating posts:", error);
      return null; // Or handle errors more gracefully
    }
  }

  // Helper function to get the Nth document based on a field
  async getNthDocBasedOnField(collectionPath, index, orderByField) {
    const postRef = collection(this.db, collectionPath);
    const q = query(postRef, orderBy(orderByField), limit(index + 1));
    // const query = collection(db, collectionPath)
    //   .orderBy(orderByField)
    //   .limit(index + 1);

    const snapshot = await getDocs(q);

    if (snapshot.size <= index) {
      return null; // Handle case where there are less than index documents
    }

    return snapshot.docs[index];
  }
}

export default Post;
