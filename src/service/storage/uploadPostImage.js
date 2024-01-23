import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/firebase/index.js";
class UploadPostImage {
  constructor() {
    this.storage = getStorage(app);
  }
  async upload(file) {
    const storageRef = ref(this.storage, `posts/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    let progress = 0;
    let downloadURL = "";

    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        async () => {
          downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          //console.log("File available at", downloadURL);
          resolve();
        }
      );
    });

    return { progress, downloadURL };
  }
}

export default UploadPostImage;
