import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5gB-q5KTEjKLLstUK-NcEIeZUffIeX6A",
  authDomain: "cardinus-99061.firebaseapp.com",
  databaseURL: "https://cardinus-99061-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "cardinus-99061",
  storageBucket: "cardinus-99061.appspot.com",
  messagingSenderId: "925612567874",
  appId: "1:925612567874:web:8f31174e10cfceda746cdb",
  measurementId: "G-2MRE96RNFW"
};

// Initialize Firebase


const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore();
const rtdb = getDatabase();
const auth = getAuth(fire);

export {fire, db, auth, rtdb};
