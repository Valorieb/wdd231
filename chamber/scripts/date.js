let footer = document.getElementById("footer-content");
let updated = document.getElementById("lastModified");

const today = new Date();
const year = today.getFullYear();
const modified = new Date(document.lastModified);
const formatted = modified.toLocaleString();


footer.innerHTML = `WDD 231 Class Project <br>⭐ Valorie Broderick ⭐<br>©️ ${year} Night Vale Chamber of Commerce <br>`;
updated.innerHTML = `Last Update: ${formatted}`;