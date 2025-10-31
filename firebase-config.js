// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgpP3jnbtplxwa5NLkYPIPwiccKl9SVhs",
  authDomain: "omar-portfolio-182e4.firebaseapp.com",
  projectId: "omar-portfolio-182e4",
  storageBucket: "omar-portfolio-182e4.firebasestorage.app",
  messagingSenderId: "367899789259",
  appId: "1:367899789259:web:b7d368d2a4ae671767584e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
