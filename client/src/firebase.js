// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realstate-3f23a.firebaseapp.com",
  projectId: "realstate-3f23a",
  storageBucket: "realstate-3f23a.appspot.com",
  messagingSenderId: "826593101215",
  appId: "1:826593101215:web:47b327011aa1ba7679e9aa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);