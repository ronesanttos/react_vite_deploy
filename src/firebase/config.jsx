import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAbiXMGxPvhDmlxIdAuJPwmDWZq0ZOtxVU",
  authDomain: "mini-blog-6894d.firebaseapp.com",
  projectId: "mini-blog-6894d",
  storageBucket: "mini-blog-6894d.appspot.com",
  messagingSenderId: "51315029268",
  appId: "1:51315029268:web:6a64f65e013a822f87fe01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}