// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAgpP3jnbtplxwa5NLkYPIPwiccKl9SVhs",
  authDomain: "omar-portfolio-182e4.firebaseapp.com",
  projectId: "omar-portfolio-182e4",
  storageBucket: "omar-portfolio-182e4.firebasestorage.app",
  messagingSenderId: "367899789259",
  appId: "1:367899789259:web:b7d368d2a4ae671767584e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load projects from Firestore
async function loadProjects() {
  const projectContainer = document.querySelector(".project-grid");
  projectContainer.innerHTML = "<p>Loading projects...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    projectContainer.innerHTML = ""; // Clear loading text

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const card = document.createElement("div");
      card.classList.add("project-card");
      card.innerHTML = `
        <img src="${data.image}" alt="${data.title}" />
        <h3>${data.title}</h3>
        <p>${data.description}</p>
      `;
      projectContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    projectContainer.innerHTML = "<p>⚠️ Failed to load projects.</p>";
  }
}

// Run function on page load
document.addEventListener("DOMContentLoaded", loadProjects);
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// إعداد Firebase

// تحميل المشاريع من Firebase
async function loadProjects() {
  const projectsSection = document.querySelector(".projects-container");
  projectsSection.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    querySnapshot.forEach((doc) => {
      const project = doc.data();
      const projectCard = `
        <div class="project-card">
          <img src="${project.image}" alt="${project.title}">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `;
      projectsSection.innerHTML += projectCard;
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

loadProjects();
