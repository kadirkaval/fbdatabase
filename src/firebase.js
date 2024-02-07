// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARJtJxvRpRRmbftg8vJ9qHO3V4jG0IwpQ",
  authDomain: "fir-db-113b1.firebaseapp.com",
  databaseURL:
    "https://fir-db-113b1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-db-113b1",
  storageBucket: "fir-db-113b1.appspot.com",
  messagingSenderId: "1080084954323",
  appId: "1:1080084954323:web:3168c24c9e3020f00e2826",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
