// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7Z124p6yun1SpMKFCELbRGhi-LnFv8bU",
  authDomain: "lex-project-b3c6b.firebaseapp.com",
  projectId: "lex-project-b3c6b",
  storageBucket: "lex-project-b3c6b.firebasestorage.app",
  messagingSenderId: "269291564782",
  appId: "1:269291564782:web:29e42dd9a7e47eb78a8dff",
  measurementId: "G-MHWYQ4WW8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export the Firestore database for use in other files
export { db };
