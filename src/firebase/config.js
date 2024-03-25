// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtk8lCESykAIHfONGgBBXP-E1QwBU6jiM",
  authDomain: "travelbuddy-d57d5.firebaseapp.com",
  projectId: "travelbuddy-d57d5",
  storageBucket: "travelbuddy-d57d5.appspot.com",
  messagingSenderId: "195045745350",
  appId: "1:195045745350:web:8072cd9cc4de28064d6dc7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
