import { app } from "@/firebase/index.js";
import {
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
class BookMark {
  constructor() {
    this.db = getFirestore(app);
  }

  fetchBookMarks = async (uid) => {
    const querySnapshot = await getDocs(
      collection(this.db, `Users/${uid}/Bookmarks`)
    );
    const bookmarks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return bookmarks;
  };

  addBookMark = async (uid, bookmark) => {
    const docRef = await addDoc(
      collection(this.db, `Users/${uid}/Bookmarks`),
      bookmark
    );
    return docRef.id;
  };

  async paginateBookMarks(
    db,
    collectionPath ,
    currentPage,
    currentPageSize,
    orderByField = "title"
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

      const bookmarksRef = collection(db, collectionPath);
      const q = query(
        bookmarksRef,
        orderBy(orderByField),
        startAt(startAtDoc),
        limit(currentPageSize)
      );

      const snapshot = await getDocs(q);

      // Handle no documents found gracefully
      if (snapshot.empty) {
        return { bookmarks: [], total: 0, last: null };
      }

      // Extract and format data, calculate nextPageToken
      const bookmarks = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //const total = await this.getTotalCount(db, collectionPath);
      const total = (await getCountFromServer(bookmarksRef)).data().count;
      const last = snapshot.docs[snapshot.docs.length - 1].id;
      //const nextPageToken = currentPage * currentPageSize < total ? last : null;

      return { bookmarks, total, last };
    } catch (error) {
      console.error("Error paginating posts:", error);
      return null; // Or handle errors more gracefully
    }
  }

  // Helper function to get the Nth document based on a field
  async getNthDocBasedOnField(db, collectionPath, index, orderByField) {
    const usersRef = collection(db, collectionPath);
    const q = query(usersRef, orderBy(orderByField), limit(index + 1));
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

export default BookMark;
