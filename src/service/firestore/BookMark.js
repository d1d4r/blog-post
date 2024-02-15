import { app } from "@/firebase/index.js";
import { collection, getDocs, getFirestore } from "firebase/firestore";
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
}

export default BookMark;
