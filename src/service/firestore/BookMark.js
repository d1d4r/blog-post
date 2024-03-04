import { app } from "@/firebase/index.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
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
    console.log("🚀 ~ BookMark ~ bookmarks ~ bookmarks:", bookmarks);
    return bookmarks;
  };

  fetchBookMarkById = async (bookmarkid, userid) => {
    const bookmarkdoc = doc(this.db, `Users/${userid}/Bookmarks/${bookmarkid}`);
    const bookmark = await getDoc(bookmarkdoc);

    if (bookmark.exists()) {
      return true;
    } else {
      return false;
    }
  };

  addBookMark = async (uid, bookmark) => {
    try {
      const { data, id } = bookmark;

      if (!uid) {
        throw Error("plase log");
      }
      const bookmarkdoc = doc(this.db, `Users/${uid}/Bookmarks`, id);
      await setDoc(bookmarkdoc, data);
    } catch (error) {
      console.log("🚀error:", error.message);
      throw error;
    }
  };

  deleteBookMark = async (uid, id) => {
    await deleteDoc(doc(this.db, `Users/${uid}/Bookmarks`, id));
  };

  async paginateBookMarks(
    db,
    uid,
    currentPage,
    currentPageSize,
    orderByField = "content"
  ) {
    const collectionPath = `Users/${uid}/Bookmarks`;
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

      const bookmarksRef = collection(this.db, collectionPath);

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
      // const bookmarks = snapshot.docs.map((doc) => ({
      //   ...doc.data(),
      //   id: doc.id,
      // }));
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
          title: hashText ? hashText : "default",
          imageUrl: exclamationText
            ? exclamationText
            : "https://www.invoicera.com/wp-content/uploads/2023/11/default-image.jpg",
          id: doc.id,
          userId: doc.data().userId,
        });
      });
      //const total = await this.getTotalCount(db, collectionPath);
      const total = (await getCountFromServer(bookmarksRef)).data().count;
      const last = snapshot.docs[snapshot.docs.length - 1].id;
      //const nextPageToken = currentPage * currentPageSize < total ? last : null;

      return { postarr, total, last };
    } catch (error) {
      console.error("Error paginating posts:", error);
      return null; // Or handle errors more gracefully
    }
  }

  // Helper function to get the Nth document based on a field
  async getNthDocBasedOnField(db, collectionPath, index, orderByField) {
    const usersRef = collection(this.db, collectionPath);
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
