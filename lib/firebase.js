import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANd-n7Zi80BevIZ23-Cb0eiyrcc3PIOBY",
  authDomain: "bugdetbee.firebaseapp.com",
  projectId: "bugdetbee",
  storageBucket: "bugdetbee.firebasestorage.app",
  messagingSenderId: "983518606327",
  appId: "1:983518606327:web:41d13208db790e970934f2",
  measurementId: "G-5NVLTNEKJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
