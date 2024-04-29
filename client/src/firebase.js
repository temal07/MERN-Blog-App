// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // use import.meta.env in client side; use process.env in server side
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-16d95.firebaseapp.com",
  projectId: "mern-blog-16d95",
  storageBucket: "mern-blog-16d95.appspot.com",
  messagingSenderId: "324173626132",
  appId: "1:324173626132:web:901e7fc0e4dcd1f977e001"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);