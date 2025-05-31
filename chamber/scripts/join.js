const now = new Date();
const timestamp = now.toISOString();

document.getElementById("form_loaded_time").value = timestamp;
document.getElementById("display_time").textContent = now.toLocaleString();

const memberLvlCards = document.getElementById("membership-lvl-cards");

const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const role = document.getElementById("role");
const email = document.getElementById("email");
const cell = document.getElementById("cell");
const org = document.getElementById("organization");

const roleError = document.getElementById("roleError");
const roleRegex = /^[A-Za-z]{7,}$/;
const form = document.getElementById("join-form");

const allCards = document.createElement("ul");

const goldCard = document.createElement("li");
const silverCard = document.createElement("li");
const bronzeCard = document.createElement("li");
const NPCard = document.createElement("li");

const cards = [goldCard, silverCard, bronzeCard, NPCard];
cards.forEach((card) => card.classList.add("lvl-card"));

const modalContents = [
  "Gold modal content",
  "Silver modal content",
  "Bronze modal content",
  "Non profit modal content",
];

const modal = document.createElement("dialog");
const modalText = document.createElement("p");
const closeButton = document.createElement("button");

document.body.appendChild(modal);

modal.append(modalText, closeButton);

closeButton.textContent = "X";
closeButton.classList.add("close-btn");

closeButton.addEventListener("click", () => {
  modal.close();
});

goldCard.innerHTML = "Gold Membership 🥇";
silverCard.innerHTML = "Silver Membership 🥈";
bronzeCard.innerHTML = "Bronze Membership 🥉";
NPCard.innerHTML = "Non Profit Membership 💝";

cards.forEach((card, index) => {
  const button = document.createElement("button");
  button.classList = "membershipBttn";
  button.textContent = "Learn more";

  button.addEventListener("click", () => {
    modalText.textContent = modalContents[index];
    modal.showModal();
  });
  card.appendChild(button);
});

allCards.append(goldCard, silverCard, bronzeCard, NPCard);
memberLvlCards.appendChild(allCards);

role.addEventListener("input", () => {
  const value = role.value.trim();
  roleError.textContent = "";

  if (!roleRegex.test(value)) {
    roleError.textContent = "Role must be at least 7 letters";
  }
});

form.addEventListener("submit", function (e) {
  const roleValue = role.value.trim();
  const fnameValue = fname.value.trim();
  const lnameValue = lname.value.trim();
  const emailValue = email.value.trim();
  const cellValue = cell.value.trim();
  const orgValue = org.value.trim();

  roleError.textContent = "";
  if (!roleRegex.test(roleValue)) {
    e.preventDefault();
    roleError.textContent = "Role must be at least 7 letters";
    return;
  }
  localStorage.setItem("submittedRole", roleValue);
  localStorage.setItem("submittedFname", fnameValue);
  localStorage.setItem("submittedLname", lnameValue);
  localStorage.setItem("submittedEmail", emailValue);
  localStorage.setItem("submittedCell", cellValue);
  localStorage.setItem("submittedOrg", orgValue);
});
