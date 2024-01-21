import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

class UploadPostImage {
  constructor(app) {
    this.storage = getStorage(app);
  }

  async upload(file) {
    const storageRef = ref(this.storage, `posts/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
        console.log("File available at", downloadURL);
      }
    );
  }
}

export default UploadPostImage;
