

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFwF67BJFdc60ZYZnSuPDsInOIZ8Q4byU",
  authDomain: "e-commerce-d091a.firebaseapp.com",
  projectId: "e-commerce-d091a",
  storageBucket: "e-commerce-d091a.firebasestorage.app",
  messagingSenderId: "1008086089708",
  appId: "1:1008086089708:web:2c1cb4c40b081fc6754ac9",
  measurementId: "G-YWDF5VZRE6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }