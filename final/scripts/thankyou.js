const params = new URLSearchParams(window.location.search);
const fname = params.get("fname");
const lname = params.get("lname");
const email = params.get("email");

document.getElementById("first-name").innerHTML = `First name: ${fname}<br>`;
document.getElementById("last-name").innerHTML = `Last name: ${lname}<br>`;
document.getElementById("email").innerHTML = `Email: ${email}<br>`;
