import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCaJVmA71XAjQaCjqRcmbD2LNkzPFlgcbo",
  authDomain: "method15.firebaseapp.com",
  projectId: "method15",
  storageBucket: "method15.firebasestorage.app",
  messagingSenderId: "887398606535",
  appId: "1:887398606535:web:7c21fc1eb000ec4b9340e2",
  measurementId: "G-VQX7WQBFTC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};