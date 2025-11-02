import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

// عناصر الواجهة
const sectionSelect = document.getElementById("sectionSelect");
const inputArea = document.getElementById("inputArea");
const saveBtn = document.getElementById("saveBtn");
const projectsTable = document.getElementById("projectsList");
const projectRows = document.getElementById("projectRows");

// تحميل القسم الافتراضي
window.addEventListener("DOMContentLoaded", () => renderSection());
sectionSelect.addEventListener("change", renderSection);

// 🧩 عرض الحقول حسب القسم المختار
async function renderSection() {
  const selected = sectionSelect.value;
  inputArea.innerHTML = "";
  projectsTable.style.display = "none";

  if (selected === "about") {
    inputArea.innerHTML = `
      <label>Title</label>
      <input type="text" id="about-title" placeholder="e.g. Omar Hazem">

      <label>Description</label>
      <textarea id="about-desc" placeholder="Short bio..."></textarea>
    `;
  } else if (selected === "projects") {
    inputArea.innerHTML = `
      <label>Project Title</label>
      <input type="text" id="project-title" placeholder="Project name">

      <label>Description</label>
      <textarea id="project-desc" placeholder="What this project is about..."></textarea>

      <label>Image URL</label>
      <input type="text" id="project-img" placeholder="Paste image URL">

      <button id="addProject" class="btn-primary" style="width:100%;margin-top:1rem;">
        ➕ Add Project
      </button>
    `;
    projectsTable.style.display = "block";
    await loadProjects();
  } else if (selected === "contact") {
    inputArea.innerHTML = `
      <label>Gmail</label>
      <input type="text" id="gmail-link" placeholder="yourmail@gmail.com">

      <label>GitHub</label>
      <input type="text" id="github-link" placeholder="https://github.com/...">

      <label>Instagram</label>
      <input type="text" id="insta-link" placeholder="https://instagram.com/...">
    `;
  }

  attachButtons();
}

// 🧠 توصيل الأزرار بعد إنشاء العناصر ديناميكياً
function attachButtons() {
  const addBtn = document.getElementById("addProject");
  if (addBtn) {
    addBtn.addEventListener("click", addProject);
  }
  saveBtn.onclick = saveSection;
}

// 💾 حفظ البيانات حسب القسم
async function saveSection() {
  const selected = sectionSelect.value;
  try {
    if (selected === "about") {
      const title = document.getElementById("about-title").value.trim();
      const desc = document.getElementById("about-desc").value.trim();
      await setDoc(doc(db, "portfolio", "about"), { title, desc });
      alert("✅ About section updated!");
    } else if (selected === "contact") {
      const gmail = document.getElementById("gmail-link").value.trim();
      const github = document.getElementById("github-link").value.trim();
      const insta = document.getElementById("insta-link").value.trim();
      await setDoc(doc(db, "portfolio", "contact"), { gmail, github, insta });
      alert("✅ Contact links updated!");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Error while saving. Check console for details.");
  }
}

// ➕ إضافة مشروع جديد
async function addProject() {
  const title = document.getElementById("project-title").value.trim();
  const description = document.getElementById("project-desc").value.trim();
  const image = document.getElementById("project-img").value.trim();

  if (!title || !description) {
    alert("⚠️ Please fill in all fields before adding a project.");
    return;
  }

  try {
    await addDoc(collection(db, "projects"), { title, description, image });
    alert("✅ New project added!");
    await loadProjects();
    document.getElementById("project-title").value = "";
    document.getElementById("project-desc").value = "";
    document.getElementById("project-img").value = "";
  } catch (err) {
    console.error(err);
    alert("❌ Failed to add project.");
  }
}

// 📥 تحميل المشاريع من Firestore
async function loadProjects() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  projectRows.innerHTML = "";

  if (querySnapshot.empty) {
    projectRows.innerHTML = `<tr><td colspan="3">No projects yet.</td></tr>`;
    return;
  }

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const id = docSnap.id;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${data.title || "Untitled"}</td>
      <td>${data.description || "-"}</td>
      <td>
        <a href="${data.image || "#"}" target="_blank" style="color:#ffb400;">View</a> |
        <button class="edit-btn" data-id="${id}" style="color:#0af;">Edit</button> |
        <button class="delete-btn" data-id="${id}" style="color:#f55;">Delete</button>
      </td>
    `;
    projectRows.appendChild(tr);
  });

  // ربط أزرار الحذف والتعديل
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      if (confirm("🗑 Are you sure you want to delete this project?")) {
        await deleteDoc(doc(db, "projects", id));
        await loadProjects();
      }
    });
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      const newTitle = prompt("📝 New project title:");
      const newDesc = prompt("📝 New description:");
      if (newTitle) {
        await updateDoc(doc(db, "projects", id), {
          title: newTitle,
          description: newDesc || ""
        });
        await loadProjects();
      }
    });
  });
}
