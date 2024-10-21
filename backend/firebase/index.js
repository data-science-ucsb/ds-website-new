// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiNBZunqp2OxTjiXy-iE5xq7ZlzrufkSs",
  authDomain: "ds-website-c6dbd.firebaseapp.com",
  projectId: "ds-website-c6dbd",
  storageBucket: "ds-website-c6dbd.appspot.com",
  messagingSenderId: "250702397395",
  appId: "1:250702397395:web:153c175a133e467d16f926",
  measurementId: "G-FBM16PT392"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = firebase.auth();
const database = firebase.database();