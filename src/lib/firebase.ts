// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByFUcuwoDNuJIQPy3qcLMSq-jFL1dynvE",
  authDomain: "opsiys-4f865.firebaseapp.com",
  projectId: "opsiys-4f865",
  storageBucket: "opsiys-4f865.firebasestorage.app",
  messagingSenderId: "323987088285",
  appId: "1:323987088285:web:ae7b213598d16161720574",
  measurementId: "G-DF0G2JZWPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);