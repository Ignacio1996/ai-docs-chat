// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2n-dDq5qRbZ0Tr6BtfpjjSoHWnLXU7MQ",
  authDomain: "ai-chat-docs-ultimate.firebaseapp.com",
  projectId: "ai-chat-docs-ultimate",
  storageBucket: "ai-chat-docs-ultimate.appspot.com",
  messagingSenderId: "710008551029",
  appId: "1:710008551029:web:cc408748dc66692602ea3c",
  measurementId: "G-XW7HMNHY79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}

const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Firebase Authentication and export
const auth = getAuth(app);
export {
  db,
  storage,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
