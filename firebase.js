// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDlCC9QqrLPG6Nb4pylH75XIYrYio_NiwQ",
  authDomain: "laundry-app-cfd63.firebaseapp.com",
  projectId: "laundry-app-cfd63",
  storageBucket: "laundry-app-cfd63.appspot.com",
  messagingSenderId: "632685383071",
  appId: "1:632685383071:web:5a35a06f3b29277f13c1aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
