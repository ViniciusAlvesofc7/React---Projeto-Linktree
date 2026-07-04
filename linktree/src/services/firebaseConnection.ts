import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBovHSfpVxWijwHzdKdF5EZjA5R0kMtLNI",
  authDomain: "reactlinktree-20127.firebaseapp.com",
  projectId: "reactlinktree-20127",
  storageBucket: "reactlinktree-20127.firebasestorage.app",
  messagingSenderId: "947327997971",
  appId: "1:947327997971:web:4fe3d31823d586673047e6",
  measurementId: "G-JV79M4CG7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }