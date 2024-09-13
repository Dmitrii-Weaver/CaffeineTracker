
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore}  from "firebase/firestore"
import {getStorage} from "firebase/storage"
//import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: import.meta.env.EXPO_PUBLIC_API_KEY ,
  authDomain: import.meta.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.EXPO_PUBLIC_APP_ID,
  measurementId: import.meta.env.EXPO_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

//const analytics = getAnalytics(app);

export {app, auth, firestore, storage}