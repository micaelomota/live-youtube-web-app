// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDAJ8g-StTPg7YsSEOjYHBFNfG95J7wVqY",
  authDomain: "live-micael-01.firebaseapp.com",
  projectId: "live-micael-01",
  storageBucket: "live-micael-01.appspot.com",
  messagingSenderId: "238858151488",
  appId: "1:238858151488:web:7983bd229797773f1521a5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

auth.useDeviceLanguage();