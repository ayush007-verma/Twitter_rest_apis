import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvrO4J5kZ3kzXmZZwKhS5L3yWycIOKYJo",
  authDomain: "twitter-clone-e3c17.firebaseapp.com",
  projectId: "twitter-clone-e3c17",
  storageBucket: "twitter-clone-e3c17.appspot.com",
  messagingSenderId: "1070618086989",
  appId: "1:1070618086989:web:6fdb81468710a7ae879604"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth }