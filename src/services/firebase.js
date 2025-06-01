import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyATOhaziKMx89c0Jq26ZOl3-0mmzCJe25g",
  authDomain: "tilingo-c59b2.firebaseapp.com",
  projectId: "tilingo-c59b2",
  storageBucket: "tilingo-c59b2.firebasestorage.app",
  messagingSenderId: "709419501334",
  appId: "1:709419501334:web:ec1eb45fa7e5a0b6fef237",
  measurementId: "G-4CD531J1ES"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};