// ===============================
// 🔥 Firebase Imports
// ===============================
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// ===============================
// 💫 Loader أثناء تحميل البيانات
// ===============================
function showLoader(message = "Loading...") {
  const container = document.createElement("div");
  container.id = "loader";
  container.innerHTML = `<div class="spinner"></div><p>${message}</p>`;
  Object.assign(container.style, {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    zIndex: 9999
  });
  document.body.appendChild(container);
}

function hideLoader() {
  document.getElementById("loader")?.remove();
}

// ===============================
// 🧩 Load Projects from Firestore
// ===============================
async function loadProjects() {
  const projectContainer = document.querySelector(".project-grid");
  if (!projectContainer) return;

  showLoader("Loading projects...");

  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    projectContainer.innerHTML = "";

    if (querySnapshot.empty) {
      projectContainer.innerHTML = "<p>No projects found.</p>";
      hideLoader();
      return;
    }

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const title = data.title || "Untitled Project";
      const desc = data.description || "";

      const card = document.createElement("div");
      card.classList.add("project-card");
      card.innerHTML = `
        <button class="project-btn" data-title="${title}" data-desc="${desc}">
          ${title}
        </button>
      `;
      projectContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    projectContainer.innerHTML = "<p>⚠️ Failed to load projects.</p>";
  } finally {
    hideLoader();
  }
}

// ===============================
// 🧠 Load About Section
// ===============================
async function loadAbout() {
  try {
    const aboutRef = doc(db, "portfolio", "about");
    const aboutSnap = await getDoc(aboutRef);

    if (aboutSnap.exists()) {
      const data = aboutSnap.data();
      const aboutCard = document.querySelector(".about-card p");
      if (aboutCard) aboutCard.textContent = data.desc || aboutCard.textContent;
    }
  } catch (err) {
    console.error("Error loading about:", err);
  }
}

// ===============================
// 🔗 Load Contact Links
// ===============================
async function loadContacts() {
  try {
    const contactRef = doc(db, "portfolio", "contact");
    const contactSnap = await getDoc(contactRef);

    if (contactSnap.exists()) {
      const data = contactSnap.data();
      const links = document.querySelectorAll(".quick-links a");
      links.forEach(link => {
        if (link.textContent.includes("Gmail") && data.gmail)
          link.href = `mailto:${data.gmail}`;
        if (link.textContent.includes("Instagram") && data.insta)
          link.href = data.insta;
        if (link.textContent.includes("GitHub") && data.github)
          link.href = data.github;
      });
    }
  } catch (err) {
    console.error("Error loading contact links:", err);
  }
}

// ===============================
// 📨 Contact Form (demo)
// ===============================
function handleSend(e) {
  e.preventDefault();
  const msg = document.getElementById("formMsg");
  msg.style.display = "block";
  setTimeout(() => (msg.style.display = "none"), 2000);
}

// ===============================
// 🔐 Admin Login Popup Logic
// ===============================
const adminBtn = document.getElementById("adminBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const submitPassword = document.getElementById("submitPassword");

if (adminBtn && popup && closePopup && submitPassword) {
  adminBtn.addEventListener("click", () => (popup.style.display = "flex"));
  closePopup.addEventListener("click", () => (popup.style.display = "none"));

  submitPassword.addEventListener("click", () => {
    const inputPassword = document
      .getElementById("adminPassword")
      ?.value.trim();
    const adminPassword = "omar2025";

    if (inputPassword === adminPassword) {
      popup.style.display = "none";
      window.location.href = "dashboard.html";
    } else {
      alert("❌ Wrong password!");
    }
  });

  document.getElementById("adminPassword")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitPassword.click();
  });
}

// ===============================
// ⚙️ Init
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
  await loadProjects();
  await loadAbout();
  await loadContacts();
});

// ===============================
// ✨ Small CSS for loader
// ===============================
const loaderStyle = document.createElement("style");
loaderStyle.textContent = `
.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255,255,255,0.2);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;
document.head.appendChild(loaderStyle);
