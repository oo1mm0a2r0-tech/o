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
// 🖼️ وظيفة فتح النافذة المنبثقة (Modal)
// ===============================
/**
 * تفتح النافذة المنبثقة وتعرض تفاصيل المشروع
 * @param {string} title - عنوان المشروع
 * @param {string} desc - وصف المشروع
 * @param {string} imageUrl - رابط الصورة
 */
function openProjectModal(title, desc, imageUrl) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.src = imageUrl;
    }
    
    document.getElementById('projectModal').classList.add('open');
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
            const imageUrl = data.image || 'https://via.placeholder.com/400x180?text=No+Image'; // رابط بديل في حال عدم وجود صورة

            const card = document.createElement("div");
            card.classList.add("project-card");
            
            // إضافة الصورة المصغرة والعنوان إلى البطاقة
            card.innerHTML = `
                <img src="${imageUrl}" alt="${title}" class="project-thumbnail" loading="lazy">
                <div class="project-title">${title}</div>
            `;
            
            // إضافة خاصية النقر على البطاقة بالكامل
            card.addEventListener('click', () => {
                openProjectModal(title, desc, imageUrl);
            });
            
            projectContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading projects:", error);
        // عند الفشل، نعرض رسالة خطأ واضحة
        projectContainer.innerHTML = `
            <p style="color:#ff0000; font-weight: bold;">
                ⚠️ Failed to load projects. Check Firebase Security Rules and API keys.
            </p>
        `;
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
            // تحديث الروابط في قسم البطل (Hero)
            document.querySelectorAll(".hero .quick-links a").forEach(link => {
                if (link.textContent.includes("Gmail") && data.gmail)
                    link.href = `mailto:${data.gmail}`;
                if (link.textContent.includes("Instagram") && data.insta)
                    link.href = data.insta;
            });

            // تحديث الروابط في قسم التواصل (Contact)
            document.querySelectorAll("#contact a").forEach(link => {
                if (link.textContent.includes("Gmail") && data.gmail)
                    link.href = `mailto:${data.gmail}`;
                if (link.textContent.includes("GitHub") && data.github)
                    link.href = data.github;
                if (link.textContent.includes("Instagram") && data.insta)
                    link.href = data.insta;
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
// ربط دالة إرسال النموذج بالنافذة العامة لتكون متاحة لـ index.html
window.handleSend = handleSend; 


// ===============================
// 🔐 Admin Login Popup Logic
// ===============================
const adminBtn = document.getElementById("adminBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const submitPassword = document.getElementById("submitPassword");

if (adminBtn && popup && closePopup && submitPassword) {
    adminBtn.addEventListener("click", () => (popup.style.display = "flex"));
    
    // إضافة إغلاق النافذة المنبثقة عند النقر خارجها
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });

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