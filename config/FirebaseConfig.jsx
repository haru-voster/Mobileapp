// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCNsiVVJTw58re278oWuaUBX4atO8C_FCA",
//   authDomain: "emedi-f9e8f.firebaseapp.com",
//   projectId: "emedi-f9e8f",
//   //databaseURL:'https://emedi-f9e8f-default-rtdb.firebaseio.com',
//   storageBucket: "emedi-f9e8f.firebasestorage.app",
//   messagingSenderId: "148579892435",
//   appId: "1:148579892435:web:c2fac9480a1ec3e58a6826",
//   measurementId: "G-BDQKXW4BQV"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // export const auth=getAuth(app)

// export const auth = initializeAuth(app,{
//   persistence:getReactNativePersistence(ReactNativeAsyncStorage)
// });

// export const db=getFirestore(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXczUMciW63QJ-VvuZjD-ak070NYN19Uc",
  authDomain: "medi-d24af.firebaseapp.com",
  projectId: "medi-d24af",
  storageBucket: "medi-d24af.firebasestorage.app",
  messagingSenderId: "788447838442",
  appId: "1:788447838442:web:2c9c9c638d7e66a137d793",
  measurementId: "G-YYJLL5YDP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);