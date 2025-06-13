let footer = document.getElementById("footer-content");
let updated = document.getElementById("lastModified");

const today = new Date();
const year = today.getFullYear();
const modified = new Date(document.lastModified);
const formatted = modified.toLocaleString();

footer.innerHTML = `WDD 231 Class Project <br>⭐ Valorie Broderick ⭐| ©️ ${year} <br> <a href="attributes.html">Attributions</a> | <a href="https://youtu.be/XEh4wu2-o40">Project Video</a><br>`;
updated.innerHTML = `Last Update: ${formatted}`;
