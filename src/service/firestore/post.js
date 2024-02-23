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

  /////////////////////////////////////

  async paginatePosts(
    db,
    collectionPath,
    currentPage,
    currentPageSize,
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
              db,
              collectionPath,
              currentPage * currentPageSize - 1,
              orderByField
            );

      const postsRef = collection(db, collectionPath);
      const q = query(
        postsRef,
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

        // Extract text after ! symbol
        const exclamationTextMatch = inputString.match(/!\[.+?\]\((.+?)\)/);
        const exclamationText = exclamationTextMatch
          ? exclamationTextMatch[1].trim()
          : "";

        postarr.push({
          title: hashText,
          imageUrl: exclamationText,
          id: doc.id,
          userId : doc.data().userId
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
  async getNthDocBasedOnField(db, collectionPath, index, orderByField) {
    const postRef = collection(db, collectionPath);
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

// Helper function to get total document count
// async getTotalCount(db, collectionPath) {
//   const snapshot = await getDocs(collection(db, collectionPath));
//   return snapshot.size;
// }
// async getAll() {
//   try {
//     const posts = [];

//     const postsRef = collection(this.db, "Posts");
//     const first = query(postsRef, limit(3));
//     const querySnapshot = await getDocs(first);

//     querySnapshot.forEach((doc) => {
//       posts.push({ ...doc.data(), id: doc.id });
//     });

//     return posts;
//   } catch (error) {
//     console.log("🚀 ~ Post ~ getAll ~ error", error);
//     return error;
//   }
// }
// async finalPagination(
//   currentPage,
//   currentPageSize,
//   startDocReference = null
// ) {
//   try {
//     const postRef = collection(this.db, "Posts");
//     const total = (await getCountFromServer(postRef)).data().count;
//     //const last = total / currentPageSize;
//     let q;
//     if (startDocReference) {
//       q = query(
//         postRef,
//         orderBy("title"),
//         startAfter(startDocReference),
//         limit(currentPageSize)
//       );
//     } else {
//       q = query(postRef, orderBy("title"), limit(currentPageSize));
//     }
//     const snapshot = await getDocs(q);
//     const last = snapshot.docs[snapshot.docs.length - 1].id;
//     if (snapshot.empty) {
//       return null; // No documents found
//     }
//     const posts = [];
//     snapshot.forEach((doc) => {
//       posts.push({ ...doc.data(), id: doc.id });
//     });
//     return { posts, total, last };
//   } catch (error) {
//     console.log("🚀 ~ Post ~ finalPagination ~ error", error);
//     return error;
//   }
// }

// async getPaginationOffcet(currentPage, currentPageSize) {
//   try {
//     const posts = [];
//     const postsRef = collection(this.db, "Posts");
//     const total = (await getCountFromServer(postsRef)).data().count;
//     const first = query(postsRef, limit(currentPageSize));
//     const querySnapshot = await getDocs(first);
//     const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1].id;

//     querySnapshot.forEach((doc) => {
//       posts.push({ ...doc.data(), id: doc.id });
//     });
//     return { posts, total, lastDocument };
//   } catch (error) {
//     console.log("🚀 ~ Post ~ getAll ~ error", error);
//     return error;
//   }
// }
// async loadDocuments(lastDocument, currentPageSize) {
//   console.log(
//     "🚀 ~ Post ~ loadDocuments ~ lastDocument, currentPageSiz:",
//     lastDocument,
//     currentPageSize
//   );
//   const after = lastDocument;
//   try {
//     const posts = [];
//     const quer = query(
//       collection(this.db, "Posts"),
//       orderBy("title"),
//       startAfter(after),
//       limit(1)
//     );

//     const snapshot = await getDocs(quer);
//     const lastDocument = snapshot.docs[snapshot.docs.length - 1].id;

//     if (snapshot.empty) {
//       console.log("No documents found");
//       return;
//     }

//     snapshot.forEach((doc) => {
//       posts.push({ ...doc.data(), id: doc.id });
//     });
//     console.log("🚀 ~ Post ~ loadDocuments ~ posts:", posts);
//     return { posts, lastDocument };
//   } catch (error) {
//     console.error("Error fetching documents:", error);
//   }
// }
// async loadMore() {
//   try {
//     const quer = query(
//       collection(this.db, "Posts"),
//       orderBy("title"),
//       startAfter(lastDocument),
//       limit(pageSize)
//     );

//     const snapshot = await getDocs(quer);

//     if (snapshot.empty) {
//       console.log("No more documents to load");
//       return;
//     }

//     lastDocument = snapshot.docs[snapshot.docs.length - 1];

//     documents.value = [
//       ...documents.value,
//       ...snapshot.docs.map((doc) => ({
//         id: doc.id,
//         data: doc.data(),
//       })),
//     ];
//   } catch (error) {
//     console.error("Error loading more documents:", error);
//   }
// }
