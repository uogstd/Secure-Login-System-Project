// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "login-system-project-72305.firebaseapp.com",
  projectId: "login-system-project-72305",
  storageBucket: "login-system-project-72305.firebasestorage.app",
  messagingSenderId: "807356705169",
  appId: "1:807356705169:web:8e1f1f845decb00405d230",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
