// ====== GET ELEMENTS ======
const adminBtn = document.getElementById("adminBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const submitPassword = document.getElementById("submitPassword");
const adminPassword = document.getElementById("adminPassword");

// ====== OPEN POPUP ======
adminBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

// ====== CLOSE POPUP ======
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  adminPassword.value = "";
});

// ====== CHECK PASSWORD ======
submitPassword.addEventListener("click", () => {
  const password = adminPassword.value.trim();

  // ✅ غيّر الباسورد هنا زي ما تحب
  if (password === "omar2025") {
    alert("✅ Access granted! You can now edit the portfolio.");
    popup.style.display = "none";
    adminPassword.value = "";

    // هنا ممكن تفتح صفحة تعديل لو حبيت مستقبلاً
    window.location.href = "edit.html"; // (اختياري) لو عايز صفحة تعديل
  } else {
    alert("❌ Wrong password. Try again.");
  }
});

// ====== CLOSE POPUP WHEN CLICK OUTSIDE ======
window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
