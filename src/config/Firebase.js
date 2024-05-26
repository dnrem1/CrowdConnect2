
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyAKnzediUMKH4-mx2pqtqz-4fJGejX3ilk",

  authDomain: "emerging-tech-finals.firebaseapp.com",

  projectId: "emerging-tech-finals",

  storageBucket: "emerging-tech-finals.appspot.com",

  messagingSenderId: "1083068487578",

  appId: "1:1083068487578:web:f415f95b999aac1b03cc23",

  measurementId: "G-T9WB3W4HJB"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const  db = getFirestore(app);
