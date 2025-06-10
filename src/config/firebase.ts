import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnBgTHJpT51NUUhaoxPlnL9vCcl550Dws",
  authDomain: "social-media-123a.firebaseapp.com",
  projectId: "social-media-123a",
  storageBucket: "social-media-123a.firebasestorage.app",
  messagingSenderId: "71793872132",
  appId: "1:71793872132:web:2f1837bd50e3e1adc4d451",
  measurementId: "G-B2PD6P4ZZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;