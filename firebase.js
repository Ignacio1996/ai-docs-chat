// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCE90Ixf7vWJ11QB6wKkOQ_O-jMP7Tw1JE",
  authDomain: "chat-docs-ai.firebaseapp.com",
  projectId: "chat-docs-ai",
  storageBucket: "chat-docs-ai.appspot.com",
  messagingSenderId: "427799098072",
  appId: "1:427799098072:web:20c47f0dc7a469b0e39dad",
  measurementId: "G-YDFG64HM1Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and export
const auth = getAuth(app);
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
