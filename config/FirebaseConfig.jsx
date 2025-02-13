// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNsiVVJTw58re278oWuaUBX4atO8C_FCA",
  authDomain: "emedi-f9e8f.firebaseapp.com",
  projectId: "emedi-f9e8f",
  storageBucket: "emedi-f9e8f.firebasestorage.app",
  messagingSenderId: "148579892435",
  appId: "1:148579892435:web:c2fac9480a1ec3e58a6826",
  measurementId: "G-BDQKXW4BQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)