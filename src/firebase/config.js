import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA72u6Xx9JwlpKLyN7klT0VifRTirXz4d8",
  authDomain: "olx-clone-142c7.firebaseapp.com",
  projectId: "olx-clone-142c7",
  storageBucket: "olx-clone-142c7.appspot.com",
  messagingSenderId: "294755246614",
  appId: "1:294755246614:web:fe668c9dfbdf112c634b37",
  measurementId: "G-46J6GEX0KN"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);  

export default firebase;