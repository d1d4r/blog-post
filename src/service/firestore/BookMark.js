import { app } from "@/firebase/index.js";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
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
}

export default BookMark;
