import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB25YO8EkSlWAgelZiCLmp9vx09v3anO54",
  authDomain: "discipline-ad506.firebaseapp.com",
  projectId: "discipline-ad506",
  storageBucket: "discipline-ad506.firebasestorage.app",
  messagingSenderId: "184802365726",
  appId: "1:184802365726:web:b95afcbd4b0ca34b7a790f",
  measurementId: "G-H23JYQQWDY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});
