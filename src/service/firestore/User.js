import {
  collection,
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
  updateDoc,
} from "firebase/firestore";
import { app } from "@/firebase/index.js";
export default class User {
  constructor() {
    this.db = getFirestore(app);
  }

  createUser = async (data) => {
    try {
      await setDoc(doc(this.db, "Users", data.uid), data);
    } catch (error) {
      console.log("🚀 ~ User ~ createUser ~ error", error);
      return error;
    }
  };

  updateUser = async (data, uid) => {
    try {
      await updateDoc(doc(this.db, "Users", uid, data));
    } catch (err) {
      console.log(err);
    }
  };

  getUser = async (uid) => {
    const docRef = doc(this.db, "Users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
      
  };

  getAllUsers = async () => {
    const users = [];
    const querySnapshot = await getDocs(collection(this.db, "Users"));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  };


  //////////////////////
  async paginateUsers(
    db,
    collectionPath,
    currentPage,
    currentPageSize,
    orderByField = "displayName"
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

      const usersRef = collection(db, collectionPath);
      const q = query(
        usersRef,
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
      const users = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      //const total = await this.getTotalCount(db, collectionPath);
      const total = (await getCountFromServer(usersRef)).data().count;
      const last = snapshot.docs[snapshot.docs.length - 1].id;
      //const nextPageToken = currentPage * currentPageSize < total ? last : null;

      return { users, total, last };
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
