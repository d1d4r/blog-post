// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "blog-post-a86fb.firebaseapp.com",
  projectId: "blog-post-a86fb",
  storageBucket: "blog-post-a86fb.appspot.com",
  messagingSenderId: "475306273876",
  appId: "1:475306273876:web:9b1db186f446ef3934d1c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
