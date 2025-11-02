// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDWKckMinuclZgPsBYRoAnowMnEjRpsxWQ",
  authDomain: "omar-project-eabc2.firebaseapp.com",
  projectId: "omar-project-eabc2",
  storageBucket: "omar-project-eabc2.firebasestorage.app",
  messagingSenderId: "985689835215",
  appId: "1:985689835215:web:9614b862adbe4d276ad9ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
