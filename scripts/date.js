let footer = document.getElementById("footer-content");
let updated = document.getElementById("lastModified");

const today = new Date();
const year = today.getFullYear();
const modified = new Date(document.lastModified);

footer.innerHTML = `©️ ${year} ⭐ Valorie Broderick ⭐ USA <br>`;
updated.innerHTML = `Last Update: ${modified}`;