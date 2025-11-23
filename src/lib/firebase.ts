// Firebase 설정 및 초기화
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyAcGkU1cNmgqj6NIwHNvaJX-IV8rX6M3Sw",
  authDomain: "higher-lower-company.firebaseapp.com",
  projectId: "higher-lower-company",
  storageBucket: "higher-lower-company.firebasestorage.app",
  messagingSenderId: "776018441956",
  appId: "1:776018441956:web:eab76785decf1750145ef1",
  measurementId: "G-V8K0SKBJME"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Analytics 초기화 (브라우저 환경에서만)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Auth 초기화
export const auth = getAuth(app);

// Firestore 초기화
export const db = getFirestore(app);

export { app, analytics };
