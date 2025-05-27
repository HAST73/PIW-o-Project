// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMhCRVsnUkh0s06ImFN3XOio7FxxuGIQQ",
  authDomain: "piw-o-project-935fa.firebaseapp.com",
  projectId: "piw-o-project-935fa",
  storageBucket: "piw-o-project-935fa.firebasestorage.app",
  messagingSenderId: "97326853211",
  appId: "1:97326853211:web:0619d229af9bec981aa37e",
  measurementId: "G-27B92S0P8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const db = getFirestore(app);