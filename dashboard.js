import { getFirestore, doc, setDoc, addDoc, collection, getDocs } 
  from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

// 💾 حفظ بيانات "About Me"
document.getElementById("saveAbout").addEventListener("click", async () => {
  const title = document.getElementById("about-title").value;
  const desc = document.getElementById("about-desc").value;

  await setDoc(doc(db, "portfolio", "about"), {
    title,
    desc
  });
  alert("✅ About section updated!");
});

// ➕ إضافة مشروع جديد
document.getElementById("addProject").addEventListener("click", async () => {
  const title = document.getElementById("project-title").value;
  const description = document.getElementById("project-desc").value;
  const image = document.getElementById("project-img").value;

  await addDoc(collection(db, "projects"), {
    title,
    description,
    image
  });

  alert("✅ New project added!");
});

// 💾 حفظ روابط التواصل
document.getElementById("saveContact").addEventListener("click", async () => {
  const gmail = document.getElementById("gmail-link").value;
  const github = document.getElementById("github-link").value;
  const insta = document.getElementById("insta-link").value;

  await setDoc(doc(db, "portfolio", "contact"), {
    gmail,
    github,
    insta
  });

  alert("✅ Contact links updated!");
});


