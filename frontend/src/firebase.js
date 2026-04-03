import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRe8ATYZuJp1dr0xNh74cfKwf6Hug82_s",
  authDomain: "toolify-20e64.firebaseapp.com",
  projectId: "toolify-20e64",
  storageBucket: "toolify-20e64.firebasestorage.app",
  messagingSenderId: "432427530623",
  appId: "1:432427530623:web:d3a149968c81b7b8a6024a",
  measurementId: "G-17XSWQES7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
