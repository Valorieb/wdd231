const url =
  "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";

const cards = document.querySelector("#cards");

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets);
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement("section");
    const fullName = document.createElement("h2");
    const portrait = document.createElement("img");
    const dob = document.createElement("p");
    const pob = document.createElement("p");

    card.classList.add("card");

    fullName.innerText = `${prophet.name} ${prophet.lastname}`;
    dob.innerText = `Date of Birth: ${prophet.birthdate}`;
    pob.innerText = `Place of Birth: ${prophet.birthplace}`;
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `Portrait of ${fullName}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "300");
    portrait.setAttribute("height", "400");

    card.append(fullName, dob, pob, portrait);
    cards.appendChild(card);
  });
};

getProphetData();
