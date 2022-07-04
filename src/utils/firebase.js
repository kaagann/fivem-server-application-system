// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDljZP5ySVZXYE8urM1JlnxzPVXX_Y2vo",
  authDomain: "kaganwebdb.firebaseapp.com",
  projectId: "kaganwebdb",
  storageBucket: "kaganwebdb.appspot.com",
  messagingSenderId: "111834877745",
  appId: "1:111834877745:web:b9ba1ef8f083dbd39e2a10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export default app;