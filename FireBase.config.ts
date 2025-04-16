import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBiAxQppDfYxUpWytRjfb_Mo_6fkNKvtb4",
  authDomain: "rota-verde-ea753.firebaseapp.com",
  projectId: "rota-verde-ea753",
  storageBucket: "rota-verde-ea753.firebasestorage.app",
  messagingSenderId: "578295814689",
  appId: "1:578295814689:web:c0de33ea82560918f0e160",
  measurementId: "G-W99FZCEJS3"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);